<template>
    <div>
        <el-card shadow="never">
            <el-button type="primary">新建分类</el-button>
            <el-table :data="typeList" border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="图片" prop="pic_url" width="150px">
                    <template slot-scope="scope">
                        <el-image :src="scope.row.pic_url"></el-image>
                    </template>
                </el-table-column>
                <el-table-column label="分类名称" prop="name"></el-table-column>
                <el-table-column label="博客数量" prop="blogs.length" ></el-table-column>
                <el-table-column label="操作" >
                    <template slot-scope="scope">
                        <!--            修改按钮-->
                        <el-button
                                type="primary"
                                icon="el-icon-edit"
                                size="mini"
                                @click="editBlogDialog(scope.row.id)"
                        >编辑</el-button>
                        <!--            删除按钮-->
                        <el-button
                                type="danger"
                                icon="el-icon-delete"
                                size="mini"
                                @click="removeBlogById(scope.row.id)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            typeList:[]
        }
    },
    created() {
        this.getFullTypeList() ;
    },
    methods: {

        compare(property) {
            return function (a, b) {
                let value1 = a[property].length;
                let value2 = b[property].length;
                return value2 - value1;
            }
        },
        // 得到所有的分类
        async getFullTypeList() {
            const {data: res} = await this.$blog.get('/admin/getFullTypeList')
            this.typeList = res.data.sort(this.compare('blogs'))
        },

        selectCard (id){
            this.selectedCard = id
            // console.log(this.selectedCard)
        },
    },
}
</script>

<style scoped>

</style>