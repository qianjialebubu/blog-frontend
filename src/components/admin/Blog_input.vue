<template>
    <div>
        <!--    面包屑导航区-->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>撰写博客</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row :gutter="5">
            <el-col :span="15">
                <el-input placeholder="请输入文章标题" v-model="blog.title"></el-input>
            </el-col>
            <el-col :span="6">
<!--                <el-input placeholder="插入图片" v-model="blog.title"></el-input>-->
              <el-button type="primary" round @click="InsertPic">插入图片</el-button>
            </el-col>
            <el-col :span="3">
                <el-button style="border-radius: 20px" type="danger" @click="submit">发布文章</el-button>
            </el-col>
        </el-row>
        <el-row>
            <mavon-editor v-model="blog.content" style="margin: 10px auto;min-height: 70vh"/>
<!--            <tinymce v-model="blog.content" style="margin: 10px auto;min-height: 70vh"/>-->
        </el-row>
        <el-row align="right" type="flex" justify="end">

        </el-row>

<!--        <el-dialog title="分类修改" :visible.sync="createTagDialogFormVisible">-->
<!--          <el-form style="text-align: left" ref="createTagFormRef" :model="createTagForm"-->
<!--                   :rules="createTagFormRules" label-width="80px">-->
<!--            <el-form-item label="标签名称" prop="name">-->
<!--              <el-input v-model="createTagForm.name"></el-input>-->
<!--            </el-form-item>-->
<!--          </el-form>-->
<!--          <div slot="footer" class="dialog-footer">-->
<!--            <el-button @click="backPage">取消</el-button>-->
<!--            <el-button tag="primary" @click="createTag">提交</el-button>-->
<!--          </div>-->
<!--        </el-dialog>-->
        <el-dialog class="publish_dialog" title="发布文章" :visible.sync="publishDialogFormVisible">
            <el-form style="text-align: left" ref="publishFormRef" :model="publishForm" :rules="publishFormRules"
                     class="publish_form">
                <el-form-item label="文章分类" prop="type">
                    <el-select size="small" v-model="publishForm.type" placeholder="请选择文章分类" style="margin-right: 10px"
                               @change="setBlogType">
                        <el-option v-for="type in typeList" :label="type.name" :value="type.id" :key="type.id"></el-option>
                    </el-select>

<!--                    <el-button size="small">+ 新建分类</el-button>-->
<!--                    <el-button size="small" @click="createTagDialogFormVisible = true">+ 新建分类</el-button>-->

                </el-form-item>
                <el-form-item label="文章标签" prop="tags">
                    <el-card shadow="never" style="height: 120px; overflow: auto">
                        <el-checkbox-group v-model="publishForm.tags">
                            <el-checkbox v-for="tag in tagList" :label="tag.id" :key="tag.id">{{tag.name}}</el-checkbox>
                        </el-checkbox-group>
<!--                        <el-button v-else size="mini" class="button-new-tag" @click="showInput(scope.row)">+ New Tag-->
<!--                        </el-button>-->

<!--                        <el-button size="mini">+ 新建标签</el-button>-->
<!--                        <el-button type="mini" style="margin-bottom: 20px" @click="showInput(scope.row) = true">+新建标签</el-button>-->
                    </el-card>
<!--                    <el-dialog title="分类修改" :visible.sync="createTagDialogFormVisible">-->
<!--                      <el-form style="text-align: left" ref="createTagFormRef" :model="createTagForm"-->
<!--                               :rules="createTagFormRules" label-width="80px">-->
<!--                        <el-form-item label="标签名称" prop="name">-->
<!--                          <el-input v-model="createTagForm.name"></el-input>-->
<!--                        </el-form-item>-->
<!--                      </el-form>-->
<!--                      <div slot="footer" class="dialog-footer">-->
<!--                        <el-button @click="backPage">取消</el-button>-->
<!--                        <el-button tag="primary" @click="createTag">提交</el-button>-->
<!--                      </div>-->
<!--                    </el-dialog>-->
                </el-form-item>
                <el-form-item label="文章类型" prop="flag">
                    <el-select size="small" v-model="publishForm.flag">
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
                            ref="upload"
                            action="http://175.24.197.233:8090/upload"
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
            </el-form>
<!--          action="http://192.168.3.184:8090/upload"-->
            <div slot="footer" class="dialog-footer">
                <el-button @click="backPage">取消</el-button>
                <el-button type="primary" @click="publishBlog">发布文章</el-button>
            </div>

        </el-dialog>

      <el-dialog title="选择图片" :visible.sync="addFriendDialogFormVisible">
<!--        {{ this.pictureList }}-->
        <el-form style="text-align: left" ref="addTypeFormRef" :model="pictureList"
                 label-width="80px">
          <div v-for="(pic,idx) in pictureList" class="waterfall_item" :key="pic" >
            <el-card class="imgs" >
              <div style="width: 5%;height: 100%;float:left;text-align: center;background-color: #1abc9c">
                <span>{{idx}}</span>
              </div>
<!--              显示图片-->
              <div  style="width: 25%;height: 100%;float:left;text-align: center" >
                <el-image :src=pic ></el-image>
              </div>
<!--              显示图片地址-->
              <div style="width: 60%;height: 100%;float:left;background-color: #e8ddc8">
<!--                <img class="images" v-if="pic" :lazy-src="pic" @click="showImg(pic)"/>-->
                <span>{{pic}}</span>
              </div>
              <div style="width: 10%;height: 100%;float:left;text-align: center">
                <el-button size="mini" type="danger" circle @click="deletePic(pic,idx)">
                  <i class="el-icon-delete"></i>
                </el-button>
              </div>
            </el-card>
          </div>

<!--          <el-form-item label="博客名称" prop="blogName">-->
<!--            <el-input v-model="Friend.blogName"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="链接" prop="link">-->
<!--            <el-input v-model="Friend.link"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="备注" prop="link">-->
<!--            <el-input v-model="Friend.note"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="状态" prop="link">-->
<!--            <el-input v-model="Friend.state"></el-input>-->
<!--          </el-form-item>-->
        </el-form>
<!--        <div slot="footer" class="dialog-footer">-->
<!--          <el-button @click="backPage">取消</el-button>-->
<!--          <el-button type="primary" @click="insertFriend">提交</el-button>-->
<!--        </div>-->


      </el-dialog>


    </div>

</template>

<script>
export default {
    data() {
        return {
            createTagDialogFormVisible: false,
            addFriendDialogFormVisible: false,
            // createTypeDialogFormVisible: false,
            pictureList:[],
            picdialogVisible:false,
            blog: {
                id:null,
                content: "",
                flag: "",
                title: "",
                type: {},
                tagIds: '',
                firstPicture: "",
                appreciation: 0,
                user: {},
                views: 0,
                commentabled: true
            },
            picdialogImageUrl:'',
            flags: [
                {value: "原创", label: "原创"},
                {value: "转载", label: "转载"},
                {value: "翻译", label: "翻译"}
            ],
            publishDialogFormVisible: false,
            publishForm: {
                // type: {},
                tags: [],
                flag:'原创'
            },
            typeList: [],
            tagList: [],
            publishFormRules: {
                type:[
                    {required: true,message: '请选择类型',trigger: 'blur'}
                ],
                tags:[
                    {required: true,message: '请选择至少一种标签',trigger: 'blur'}
                ],
                flag:[
                    {required: true,message: '请选择文章类型',trigger: 'blur'}
                ],
            },
            dialogVisible: false
        }
    },
    created(){
      if (typeof this.$route.query.blog !== 'undefined'){
          this.blog = JSON.parse(this.$route.query.blog)
      }
    },
    methods: {
        // // 点击按钮,展示文本输入框
        // showInput(row) {
        //   row.inputVisible = true
        //   //   让输入框自动获取焦点
        //   // $nextTick方法的作用：当页面元素被重新渲染之后，才会至指定回调函数中的代码
        //   this.$nextTick(_ => {
        //     this.$refs.saveTagInput.$refs.input.focus()
        //   })
        // },
      async deletePic(url,idx) {

        const str = url.split('/')
        const len = str.length
        const filename = str[len-1]
        // console.log(str[len-1])
        // 弹出对话框
        const confirmResult = await this.$confirm(
            '确定要删除该图片吗',
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
        // alert(filename)
        const {data:res} = await this.$picture.get(`/pic/delete/${filename}`)
        this.$message.success('删除成功！')
        //强制刷新当前界面
        // location.reload();
        this.getPicList()
      },
      showImg(url) {
        this.picdialogImageUrl = url
        this.picdialogVisible = true
      },
        async InsertPic(){
          const {data: res} = await this.$picture.get('/pic/get_all')
          this.pictureList = res
          this.addFriendDialogFormVisible=true;
        },
        // 获取博客类型列表
        async getTypeList() {
            const {data: res} = await this.$blog.get('/admin/getFullTypeList')
            // console.log(res)
            this.typeList = res.data
        },
        // 获取博客标签列表
        async getTagList() {
            const {data: res} = await this.$blog.get('/admin/getFullTagList')
            // console.log(res)
            this.tagList = res.data
        },
        async submit() {
            if (this.blog.id!==null){
                const {data: res} = await this.$blog.post('/admin/blogs', {
                    blog: this.blog
                })
                // console.log(res)
                if (res.code === 200) {
                    this.publishDialogFormVisible = false
                    this.$router.go(-1);
                    return this.$message.success('修改博客成功！')
                } else {
                    this.publishDialogFormVisible = false
                    return this.$message.error('修改博客失败！')
                }
            } else {
                await this.getTypeList()
                await this.getTagList()
                this.publishDialogFormVisible = true
            }
        },
        async handleSuccess(res) {
            this.dialogImageUrl = res.data
        },
        publishBlog() {
            this.$refs.publishFormRef.validate( async valid => {
                if (!valid) return
                this.blog.firstPicture = this.dialogImageUrl
                this.blog.tagIds = this.publishForm.tags.toString().replace(/\[|]/g, '');
                this.blog.flag = this.publishForm.flag
                // console.log(this.blog.content)
                this.blog.user = JSON.parse(window.sessionStorage.getItem('user'))
                const {data: res} = await this.$blog.post('/admin/blogs', {
                    blog: this.blog
                })
                // console.log(res)
                if (res.code === 200) {
                    this.publishDialogFormVisible = false
                    return this.$message.success('发布博客成功！')
                } else {
                    this.publishDialogFormVisible = false
                    return this.$message.error('发布博客失败！')
                }
            })

        },
        handleRemove() {
            this.dialogImageUrl = ''
            // console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        setBlogType(res) {
            this.blog.type = this.typeList.find(item => item.id === res)
        },
        backPage(){
            this.$refs.upload.clearFiles()
            this.blog.firstPicture = ''
            this.publishDialogFormVisible = false
            this.$refs.publishFormRef.resetFields()
        }
    }
}
</script>

<style scoped lang="less">
    .el-form /deep/ .el-form-item__content {
        line-height: 23px;
    }

    .el-card /deep/ .el-card__body {
        padding: 10px;
    }

</style>