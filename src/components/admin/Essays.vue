<template>
    <div>
        <!--    面包屑导航区-->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>随笔管理</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card shadow="hover">
            <el-tabs v-model="activeName" type="card">
                <el-tab-pane label="新建随笔" name="first">
                    <el-form label-position="left" label-width="80px" style="text-align: left" ref="publishFormRef"
                             :model="publishForm"
                             class="publish_form">
                        <el-form-item label="标题" prop="title">
                            <el-input v-model="publishForm.title"></el-input>
                        </el-form-item>
                        <el-form-item label="色彩" prop="color">
                            <el-color-picker size="small"  show-alpha v-model="publishForm.color"></el-color-picker>
                        </el-form-item>
                        <el-form-item label="内容" prop="content">
                            <mavon-editor v-model="publishForm.content"
                                          ref="md"
                                          @imgAdd="imgAdd"
                                          @imgDel="imgDel"
                                          style="margin: 10px auto;min-height: 70vh"/>
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
                </el-tab-pane>
                <el-tab-pane label="随笔管理" name="second">
                    <el-timeline>
                        <el-timeline-item v-for="esy in essayList" :timestamp="esy.createTime|dataFormat4"
                                          placement="top" >
                            <el-card class="card" shadow="never" @click="showEssay(esy)">
                                {{esy.title !==null&& esy.title !== ''?esy.title:esy.content.slice(0,20)}}
                            </el-card>
                        </el-timeline-item>
                    </el-timeline>
<!--                    <el-dialog :visible.sync="vis">-->
<!--                        <el-form label-position="left" label-width="80px" style="text-align: left"-->
<!--                                 ref="publishFormRef"-->
<!--                                 :model="essay2" class="publish_form">-->
<!--                            <el-form-item label="标题" prop="title">-->
<!--                                <el-input v-model="essay2.title"></el-input>-->
<!--                            </el-form-item>-->
<!--                            <el-form-item label="内容" prop="content">-->
<!--                                <el-input v-model="essay2.content" type="textarea" autosize-->
<!--                                          placeholder="请输入内容"></el-input>-->
<!--                            </el-form-item>-->
<!--                            <el-form-item label="图片">-->
<!--                                <el-image :src="essay2.image" style="width: 50%">-->
<!--                                </el-image>-->
<!--                            </el-form-item>-->
<!--                            <el-form-item style="text-align: center">-->
<!--                                <el-button type="primary" @click="publishAssay">修改</el-button>-->
<!--                            </el-form-item>-->
<!--                        </el-form>-->
<!--                    </el-dialog>-->
                </el-tab-pane>
            </el-tabs>
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
                color: ""
            },
            essay2: {
                id: null,
                content: "",
                title: "",
                image: "",
            },
            dialogImageUrl: '',
            publishDialogFormVisible: false,
            publishForm: {
                color: 'rgba(0, 0, 0, 1)'
            },
            dialogVisible: false,
            activeName: 'first',
            essayList: [],
            vis: false,

        }
    },
    created() {
        this.getEssayList()
    },
    methods: {
        // 将图片上传到服务器，返回的地址替换到md中
        async imgAdd(pos,$file){
            console.log($file)
            let formdata = new FormData();
            formdata.append('file', $file);
            const {data:res} = await this.$blog.post('/upload',formdata)
            if (res.code === 200){
                this.$refs.md.$img2Url(pos,res.data)
            }
        },
        // 删除不需要的图片
        async imgDel(pos){
            console.log(pos[0])
            let len = pos[0].split('/').length
            let filename = pos[0].split('/')[len-1]
            console.log(filename)
            const {data:res} = await this.$picture.get(`/delete/${filename}`)
        },
        showEssay(esy) {
            this.essay2 = esy
            this.vis = true
        },
        // 获取随笔列表
        async getEssayList() {
            const {data: res} = await this.$blog.get('/essays')
            if (res.code === 200) {
                this.essayList = res.data.sort((a, b) => {
                    return b.createTime.localeCompare(a.createTime)
                })
                this.essayList.forEach(item => {
                    item.vis = false
                })
            }
        },
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
        backPage() {
            this.$refs.upload.clearFiles()
            this.blog.firstPicture = ''
            this.publishDialogFormVisible = false
            this.$refs.publishFormRef.resetFields()
        },
        async publishAssay() {
            this.essay.image = this.dialogImageUrl
            this.essay.title = this.publishForm.title
            this.essay.content = this.publishForm.content
            this.essay.color = this.publishForm.color
            // rgba(170, 64, 64, 1)
            console.log(this.essay)
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
    .card:hover{
        cursor: pointer;
    }
</style>