<template>
    <div>
        <el-card shadow="hover" >
            <el-form label-position="left" label-width="80px" style="text-align: left" ref="publishFormRef"
                     :model="publishForm"
                     class="publish_form">
                <el-form-item label="标题" prop="title">
                    <el-input v-model="publishForm.title"></el-input>
                </el-form-item>
                <el-form-item label="内容" prop="content">
                    <el-input v-model="publishForm.content" type="textarea" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="图片">
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
                <el-form-item style="text-align: center">
                    <el-button type="primary" @click="publishAssay">发布</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            essay: {
                id: null,
                content: "",
                title: "",
                image: "",
            },
            dialogImageUrl: '',
            publishDialogFormVisible: false,
            publishForm: {},
            dialogVisible:false

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
        async publishAssay(){
            this.essay.image = this.dialogImageUrl
            this.essay.title = this.publishForm.title
            this.essay.content = this.publishForm.content
            const {data: res} = await this.$blog.post('/admin/essay', {
                essay: this.essay
            })
            // console.log(res)
            if (res.code === 200) {
                this.publishDialogFormVisible = false
                return this.$message.success('发布随笔成功！')
            } else {
                this.publishDialogFormVisible = false
                return this.$message.error('发布随笔失败！')
            }
        }
    }
}
</script>

<style scoped>

</style>