<template>
    <div>
        <!--    面包屑导航区-->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>博客发表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row gutter="5">
            <el-col span="6">
                <el-select placeholder="请选择文章类型" v-model="blog.flag">
                    <el-option
                            v-for="item in flags"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col span="18">
                <el-input placeholder="请输入文章标题" v-model="blog.title"></el-input>
            </el-col>
        </el-row>
        <el-row>
            <mavon-editor v-model="blog.content" style="margin: 10px auto;"/>
        </el-row>
        <el-row align="right" type="flex" justify="end">
            <el-col span="2">
                <el-button type="primary" @click="submit">提交</el-button>
            </el-col>
        </el-row>
        <el-dialog class="publish_dialog" title="发布文章" :visible.sync="publishDialogFormVisible">
            <el-form ref="publishFormRef" :model="publishForm" :rules="publishFormRules" class="publish_form">
                <el-form-item label="文章分类">
                    <el-select size="small" v-model="publishForm.type" placeholder="请选择文章分类" style="margin-right: 10px">
                        <el-option v-for="type in typeList" :label="type.name" :value="type.id"></el-option>
                    </el-select>
                    <el-button size="small">+ 新建分类</el-button>
                </el-form-item>
<!--                <el-form-item label="文章分类">-->
<!--                    <el-card shadow="never" v-model="publishForm.tags" placeholder="请选择活动区域">-->
<!--                        <el-option v-for="tag in tagList" :label="tag.name" :value="tag.id"></el-option>-->
<!--                    </el-card>-->
<!--                </el-form-item>-->
                <el-form-item label="文章标签">
                    <el-card shadow="never" style="height: 120px; overflow: auto">
                        <el-checkbox-group v-model="publishForm.tags">
                            <el-checkbox v-for="tag in tagList" :label="tag.name" :name="tag.id"></el-checkbox>
                        </el-checkbox-group>
                        <el-button size="mini">+ 新建标签</el-button>
                    </el-card>
                </el-form-item>
                <el-form-item label="文章类型">
                    <el-select size="small" v-model="blog.flag">
                        <el-option
                                v-for="item in flags"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="文章首图">
                    <el-upload
                            action="https://jsonplaceholder.typicode.com/posts/"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="publishBlog">发布文章</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
export default {
    data() {
        return {
            blog: {
                content: '',
                flag:'',
                title:''
            },
            flags: [
                {value: '原创', label: '原创'},
                {value: '转载', label: '转载'},
                {value: '翻译', label: '翻译'}
            ],
            publishDialogFormVisible:false,
            publishForm:{
                type:'',
                tags:[],
            },
            typeList:[],
            tagList:[],
            publishFormRules:{

            },
            dialogImageUrl: '',
            dialogVisible: false
        }
    },
    methods:{
        // 获取博客类型列表
        async getTypeList() {
            const {data: res} = await this.$blog.get('/admin/getFullTypeList')
            console.log(res)
            this.typeList = res.data
        },
        // 获取博客标签列表
        async getTagList() {
            const {data: res} = await this.$blog.get('/admin/getFullTagList')
            console.log(res)
            this.tagList = res.data
        },
        async submit(){
            await this.getTypeList()
            await this.getTagList()
            this.publishDialogFormVisible = true
        },
        publishBlog(){

        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        }
    }
}
</script>

<style scoped lang="less">
    .el-form /deep/ .el-form-item__content{
        line-height: 23px;
    }
    .el-card /deep/ .el-card__body{
        padding:10px;
    }
</style>