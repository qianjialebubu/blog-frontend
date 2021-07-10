<template>
    <div>
        <!--    面包屑导航区-->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>博客管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card style="text-align: left">
            <div class="el-card__header" style="text-align: left;padding: 0;">
                <h1 style="margin: 0;">博客管理</h1>
            </div>
            <el-input style="width: 200px;margin-right: 20px;margin-top: 10px" placeholder="标题" v-model="queryInfo.title"></el-input>
            <el-select v-model="type" @change="selectType " placeholder="分类" style="margin-right: 20px">
                <el-option
                        v-for="item in typeList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name">
                </el-option>
            </el-select>
            <el-button @click="clearSearh">清除</el-button>
            <el-button type="primary" @click="getBlogList">搜索</el-button>
            <el-table :data="blogList" border stripe @expand-change="getCommentList">
                <el-table-column type="expand">
                    <template slot-scope="scope">
                        <div class="blog-information">
                            <el-row :gutter="20">
                                <el-col class="left-item" :xs="24" :sm="6" :lg="8">
                                    <el-card shadow="never" style="height: 250px">
                                        <div class="firstPicture">
                                            <h1 style="margin: 5px auto">博客首图</h1>
                                            <el-image class="img" :src="scope.row.firstPicture"></el-image>
                                        </div>
                                    </el-card>
                                </el-col>
                                <el-col class="middle-item" :xs="24" :sm="6" :lg="8">
                                    <el-card shadow="never" style="height: 250px">
                                        <h1 style="margin: 5px auto">描述</h1>
                                        <div style="word-break:break-all;">{{scope.row.description}}</div>
                                    </el-card>
                                </el-col>
                                <el-col class="right-item" :xs="24" :sm="12" :lg="8">
                                    <el-card shadow="never" style="height: 250px">
                                        <div style="text-align: center">
                                            <h1 style="margin: 5px auto">评论</h1>
                                            <ul style="padding: 0; max-height: 200px;overflow: auto"
                                                class="comment-list">
                                                <li class="comment" v-for="cmt in commentList">
                                                    <el-avatar :src="cmt.avatar"></el-avatar>
                                                    <div class="content">
                                                        <div style="display: flex;justify-content: space-between;width: 100%">
                                                            <div class="nkname">
                                                                <span class="name">{{cmt.nickname}} </span>
                                                                <span class="date">{{cmt.createTime | dataFormat3}}前</span>
                                                            </div>
                                                            <div class="op">
                                                                <span class="rep"
                                                                      @click="replyCommentById(cmt.id)">回复</span> |
                                                                <span class="del"
                                                                      @click="deleteCommentById(cmt.id)">删除</span>
                                                            </div>
                                                        </div>
                                                        <p class="reply">{{cmt.content}}</p>
                                                    </div>
                                                    <!--                    {{cmt}}-->
                                                </li>
                                            </ul>
                                        </div>
                                    </el-card>
                                </el-col>
                            </el-row>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="标题" prop="title"></el-table-column>
                <el-table-column label="分类" prop="type.name" width="110px">
                    <template slot-scope="scope">
                        <div @click="changeBlogType(scope.row)" class="change-type">{{scope.row.type.name}}
                            <i class="el-icon-edit"></i></div>
                    </template>
                </el-table-column>
                <el-table-column label="标签" prop="tags" width="250px">
                    <template slot-scope="scope">
                        <el-tag  size="medium" v-for="(tag, i) in scope.row.tags" :key="i" closable @close="handleClose(i,scope.row)">{{tag.name}}
                        </el-tag>
                        <el-input size="small" style="width: 100px;"  class="input-new-tag" v-if="scope.row.inputVisible" v-model="scope.row.inputValue" ref="saveTagInput"
                                  @keyup.enter.native="handleInputConfirm(scope.row)" @blur="handleInputConfirm(scope.row)">
                        </el-input>
                        <el-button  v-else size="mini"  class="button-new-tag" @click="showInput(scope.row)">+ New Tag</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="阅读量" prop="views" width="70px"></el-table-column>
                <el-table-column label="更新时间" prop="updateTime" width="150px">
                    <template slot-scope="scope">
                        {{scope.row.updateTime | dataFormat }}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="90px">
                    <template slot-scope="scope">
                        <!--            修改按钮-->
                        <el-button
                                type="primary"
                                icon="el-icon-edit"
                                size="mini"
                                circle
                                @click="editBlogByid(scope.row)"
                        ></el-button>
                        <!--            删除按钮-->
                        <el-button
                                type="danger"
                                icon="el-icon-delete"
                                size="mini"
                                circle
                                @click="removeBlogById(scope.row.id)"
                        ></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :page-size="pagesize"
                    :current-page="pagenum"
                    layout="total, prev, pager, next, jumper"
                    :total="totalcount">
            </el-pagination>
            <el-dialog class="publish_dialog" title="发布文章" :visible.sync="editTypeDialogFormVisible">
                <el-form style="text-align: left" ref="editTypeFormRef" :model="editTypeForm" :rules="editTypeFormRules"
                         class="edit_type_form">
                    <el-form-item label="文章分类" prop="type">
                        <el-select v-model="editTypeForm.typeId" placeholder="请选择文章分类" style="margin-right: 10px">
                            <el-option v-for="type in typeList" :label="type.name" :value="type.id"></el-option>
                        </el-select>
                        <el-button>+ 新建分类</el-button>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="backPage">取消</el-button>
                    <el-button type="primary" @click="changeTypeSubmit">提交修改</el-button>
                </div>
            </el-dialog>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            queryInfo: {
                title: '',
                typeId:null
            },
            pagenum: 1,
            pagesize: 8,
            blogList: [],
            totalcount: 0,
            editing: false,
            commentList: [],
            typeList: [],
            editTypeForm: {},
            editTypeDialogFormVisible: false,
            editTypeFormRules: {
                type: [
                    {required: true, message: '请选择类型', trigger: 'blur'}
                ],
            },
            type:'',
            inputValue:'',
            inputVisible:false,
        }
    },
    created() {
        this.getBlogList()
        this.getFullTypeList()
    },
    methods: {
        // 修改当前页码
        handleCurrentChange(newSize) {
            this.pagenum = newSize
            this.getBlogList()
        },
        // 修改当前页大小
        handleSizeChange(newSize) {
            this.pagesize = newSize
            this.getGoodsList()
        },
        // 获取博客列表
        async getBlogList() {
            const {data: res} = await this.$blog.post('/admin/getBlogList', {
                title: this.queryInfo.title,
                typeId:this.queryInfo.typeId,
                pagenum: this.pagenum,
                pagesize: this.pagesize,
            })
            res.data.content.forEach(item => {
                // 控制文本框的显示与隐藏
                item.inputVisible = false
                // 文本框中输入的值
                item.inputValue = ''
                // 标签值转为字符串
            })
            this.blogList = res.data.content
            this.totalcount = res.data.totalElements
            console.log(this.blogList)
        },
        // 删除博客
        async removeBlogById(id) {
            // 弹出对话框
            const confirmResult = await this.$confirm(
                '此操作将永久删除该博客, 是否继续',
                '提示',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }
            ).catch(err => err)
            if (confirmResult !== 'confirm') {
                return this.$message.info('已取消删除')
            }
            const {data: res} = await this.$blog.get('/admin/blogs/' + id + '/delete')
            if (res.code !== 200) return this.$message.error('删除博客失败！')
            this.$message.success('删除博客成功！')
            this.getBlogList()
        },
        // 编辑博客
        editBlogByid(blog) {
            console.log(blog)
            this.$router.push({
                path: "/admin/blog-input",
                query: {blog: JSON.stringify(blog)}
            })
        },
        // 获取评论列表
        async getCommentList() {
            const {data: res} = await this.$blog.get('/admin/getCommentList')
            console.log('评论' + res)
            this.commentList = res.data
        },
        // 删除评论
        async deleteCommentById(id) {
            const {data: res} = await this.$blog.get('/admin/deleteCommentById', {
                params: id
            })
            if (res.code !== 200) {
                return this.$message.error('删除失败！')
            }
            return this.$message.error('删除成功！')
        },
        // 得到所有的分类
        async getFullTypeList() {
            const {data: res} = await this.$blog.get('/admin/getFullTypeList')
            this.typeList = res.data
        },

        // 修改博客分类
        async changeBlogType(blog) {
            this.editTypeDialogFormVisible = true
            this.editTypeForm.blog = blog
        },
        backPage(){
            this.$refs.editTypeFormRef.resetFields()
            this.editTypeDialogFormVisible = false
        },
        // 提交类型修改
        async changeTypeSubmit(){
            let blog = this.editTypeForm.blog
            blog.type = this.typeList.find(item => item.id === this.editTypeForm.typeId)
            const {data: res} = await this.$blog.post('/admin/types', {
                type:type
            })
            if (res.code === 200) {
                this.editTypeDialogFormVisible = false
                return this.$message.success('修改博客分类成功！')
            } else {
                this.editTypeDialogFormVisible = false
                return this.$message.error('修改博客分类失败！')
            }
        },
        // 点击按钮,展示文本输入框
        showInput(row){
            row.inputVisible = true
            //   让输入框自动获取焦点
            // $nextTick方法的作用：当页面元素被重新渲染之后，才会至指定回调函数中的代码
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus()
            })
        },
        // 文本框失去焦点,或按下了Enter都会触发
        handleInputConfirm(row){
            // 输入的内容为空时，清空
            if (row.inputValue.trim().length === 0) {
                row.inputValue = ''
                row.inputVisible = false
                return
            }

            row.tags.push({name: row.inputValue.trim()})
            row.inputValue = ''
            row.inputVisible = false
            // 提交数据库，保存修改

        },
        // 删除对应的参数可选项
        handleClose (i,row) {
            row.tags.splice(i, 1)
            row.tagIds = row.tags.map(item => {return item.id}).toString().replace(/\[|]/g, '');
            console.log(row)
        },
        // 选择类型
        selectType(){
            this.queryInfo.typeId =  this.typeList.find(item => item.name === this.type).id
        },
        // 清空搜索内容
        clearSearh(){
            this.queryInfo.typeId = null
            this.queryInfo.title = ''
            this.type = ''
            this.getBlogList()
        }
    }
}
</script>

<style scoped lang="less">
    .el-tag {
        margin: 2px;
    }

    .blog-information {
        width: 100%;

        .firstPicture {
            text-align: center;
            /*padding-right: 20px;*/
            /*border-right: 1px dashed #999;*/
            /*box-sizing: border-box;*/

            .img {
                margin: 10px 0;
                width: 90%;
                border-radius: 10px;
            }
        }

        .middle-item {
            /*padding-right: 20px;*/
            /*border-right: 1px dashed #999;*/
            height: 100%;
            /*box-sizing: border-box;*/

            h1 {
                text-align: center;
            }

        }

        .right-item {
            /*margin-left: 20px;*/

            .comment {
                border-bottom: 1px dashed #ccc;
                margin: 10px 0;
                display: flex;
            }

            .el-avatar {
                width: 35px;
                height: 35px;
                border: 2px solid white;
                box-shadow: 0 0 10px 2px rgba(0, 0, 0, .06);
                flex-shrink: 0;
            }

            .content {
                text-align: left;
                font-size: 14px;
                flex-grow: 1;

                .nkname {
                    margin-left: 10px;
                    max-width: 530px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;

                    .rp, .date {
                        color: #999;
                        margin-left: 10px;
                    }

                    .blog {
                        color: #349edf;
                        margin-left: 10px;
                    }
                }

                .reply {
                    margin-left: 10px;
                }

                .op {
                    color: #ddd;
                    font-weight: lighter;

                    .rep {
                        color: #349edf;
                    }

                    .del {
                        color: red;
                    }
                }

                .op:hover {
                    cursor: pointer;
                }
            }
        }
    }

    .change-type {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .change-type:hover {
        cursor: pointer;
        color: #409eff;
    }

</style>