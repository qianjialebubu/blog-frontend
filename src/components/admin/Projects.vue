<template>
    <div>
        <!--    面包屑导航区-->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>项目管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card shadow="hover" >
            <el-form label-position="left" label-width="80px" style="text-align: left" ref="publishFormRef"
                     :model="publishForm"
                     class="publish_form">
                <el-form-item label="项目名称" prop="title">
                    <el-input v-model="publishForm.title"></el-input>
                </el-form-item>
                <el-form-item label="项目类型" prop="type">
                    <el-select v-model="publishForm.type">
                        <el-option v-for="item in types"
                                   :value="item.id"
                                   :label="item.name"
                                   :key="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="项目描述" prop="content">
                    <el-input v-model="publishForm.content" type="textarea" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="项目图片">
                    <el-upload
                            ref="upload"
                            action="http://127.0.0.1:8090/upload"
                            list-type="picture-card"
                            :limit="1"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove"
                            :on-success="handleSuccess">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </el-form-item>
                <el-form-item label="技术栈" prop="techs">
                    <el-input v-model="publishForm.techs"></el-input>
                </el-form-item>
                <el-form-item label="项目地址" prop="url">
                    <el-input v-model="publishForm.url" ></el-input>
                </el-form-item>
                <el-form-item style="text-align: center">
                    <el-button type="primary" @click="publishProject">发布</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            project: {
                id: null,
                content: "",
                title: "",
                pic_url: "",
                url: "",
                type:0,
                techs:""
            },
            dialogImageUrl: '',
            publishDialogFormVisible: false,
            publishForm: {},
            dialogVisible:false,
            types:[
                {id: 0,name: '完整项目'},
                {id: 1,name: '小练习'}
            ]
        }
    },
    methods: {
        handleRemove() {
            this.dialogImageUrl = ''
            // console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        async handleSuccess(res) {
            this.dialogImageUrl = res.data
        },
        backPage(){
            this.$refs.upload.clearFiles()
            this.blog.firstPicture = ''
            this.publishDialogFormVisible = false
            this.$refs.publishFormRef.resetFields()
        },
        async publishProject(){
            this.project.pic_url = this.dialogImageUrl
            this.project.title = this.publishForm.title
            this.project.content = this.publishForm.content
            this.project.url = this.publishForm.url
            this.project.techs = this.publishForm.techs
            this.project.type = this.publishForm.type
            const {data: res} = await this.$blog.post('/admin/project', {
                project: this.project
            })
            // console.log(res)
            if (res.code === 200) {
                this.publishDialogFormVisible = false
                return this.$message.success('项目发布成功！')
            } else {
                this.publishDialogFormVisible = false
                return this.$message.error('项目发布失败！')
            }
        }
    }
}
</script>

<style scoped>

</style>