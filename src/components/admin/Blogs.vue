<template>
    <div>
        <!--    面包屑导航区-->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>博客管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-input style="width: 200px;margin-right: 20px" placeholder="标题"></el-input>
            <el-select v-model="value" placeholder="分类" style="margin-right: 20px">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-button>清除</el-button>
            <el-button type="primary">搜索</el-button>
            <el-table :data="blogList" border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="标题" prop="title"></el-table-column>
                <el-table-column label="分类" prop="type.name" width="80px"></el-table-column>
                <el-table-column label="标签" prop="tags" width="200px">
                    <template slot-scope="scope">
                        <el-tag v-for="tag in scope.row.tags">{{tag.name}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="阅读量" prop="views" width="80px"></el-table-column>
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
                                @click="editBlogDialog(scope.row.id)"
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
                    :page-size="queryInfo.pagesize"
                    :current-page="queryInfo.pagenum"
                    layout="total, prev, pager, next, jumper"
                    :total="totalcount">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            queryInfo: {
                query: '',
                pagenum: 1,
                pagesize: 8
            },
            blogList: '',
            totalcount: 0
        }
    },
    created() {
        this.getBlogList()
    },
    methods: {
        // 修改当前页码
        handleCurrentChange(newSize) {
            this.queryInfo.pagenum = newSize
            this.getBlogList()
        },
        // 修改当前页大小
        handleSizeChange(newSize) {
            this.queryInfo.pagesize = newSize
            this.getGoodsList()
        },
        // 获取博客列表
        async getBlogList() {
            const {data: res} = await this.$blog.get('/admin/getBlogList', {
                params: this.queryInfo
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
            if (confirmResult !== 'confirm'){
                return this.$message.info('已取消删除')
            }
            const {data : res } = await this.$blog.get('/admin/blogs/'+id+'/delete')
            if (res.code !== 200 )return this.$message.error('删除博客失败！')
            this.$message.success('删除博客成功！')
            this.getBlogList()
        },
    }
}
</script>

<style scoped lang="less">
    .el-tag {
        margin: 2px;
    }
</style>