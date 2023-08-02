<template>
    <div>
        <!--    面包屑导航区-->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>分类管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card shadow="never">
            <el-button type="primary" @click="createTypeDialogFormVisible = true">新建分类</el-button>
<!--            <el-button type="primary" @click="outPutData">导出数据</el-button>-->
            <el-button type="primary" @click="showDialog">导出数据</el-button>
            <el-dialog :visible.sync="dialogVisible" title="选择文件夹" @close="dialogClosed">
              <div>
                <el-input v-model="selectedPath" placeholder="选择导出本地路径" />
              </div>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="handleFolderSelection">确定</el-button>
              </span>
            </el-dialog>
<!--            <p v-if="selectedPath">选择的文件夹路径：{{ selectedPath }}</p>-->
            <el-table :data="typeList" border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="图片" prop="pic_url" width="150px"  class="type-image-style">
                    <template slot-scope="scope">
                        <el-image :src="scope.row.pic_url"></el-image>
                    </template>
                </el-table-column>
                <el-table-column label="分类名称" prop="name"></el-table-column>
                <el-table-column label="博客数量" prop="blogs.length"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <!--            修改按钮-->
                        <el-button
                                type="primary"
                                icon="el-icon-edit"
                                size="mini"
                                @click="editBlogDialog(scope.row)"
                        >编辑
                        </el-button>
                        <!--            删除按钮-->
                        <el-button
                                type="danger"
                                icon="el-icon-delete"
                                size="mini"
                                @click="removeBlogById(scope.row)"
                        >删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-dialog title="分类修改" :visible.sync="createTypeDialogFormVisible">
            <el-form style="text-align: left" ref="createTypeFormRef" :model="createTypeForm"
                     :rules="createTypeFormRules" label-width="80px">
                <el-form-item label="分类名称" prop="name">
                    <el-input v-model="createTypeForm.name"></el-input>
                </el-form-item>
                <el-form-item label="封面图片">
                    <el-upload
                            ref="upload"
                            action="http://175.24.197.233:8090/upload"
                            list-type="picture-card"
                            :limit="1"
                            :file-list="fileList"
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
            <div slot="footer" class="dialog-footer">
                <el-button @click="backPage">取消</el-button>
                <el-button type="primary" @click="createType">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { Message } from 'element-ui'; // 导入Element UI的Message组件
export default {
    data() {
        return {
          dialogVisible: false,
          selectedPath: "",
            typeList: [],
            createTypeDialogFormVisible: false,
            dialogImageUrl: '',
            createTypeForm: {
                name: ''
            },
            createTypeFormRules: {
                name: [
                    {required: true, message: '分类名称不能为空', trigger: 'blur'}
                ],
            },
            type: {
                id: null,
                name: '',
                pic_url: ''
            },
            fileList: [],

        }
    },
    created() {
        this.getFullTypeList();
    },
    methods: {
      showDialog() {
        this.dialogVisible = true;
      },
      dialogClosed() {
        this.selectedPath = ""; // 清空选择的文件夹路径
      },
      handleFolderSelection() {
        this.dialogVisible = false; // 关闭对话框
        this.outPutData(this.selectedPath)
        // 在这里可以根据需要，将数据返回到前端或进行其他处理
      },
      // 导出分类的数据
      async outPutData(file){
        const {data: res} = await this.$blog.post('/admin/excel/outTypes', {
          data: file
        })
        // console.log(res.code)
        if(res.code ===200){
          console.log("导出分类数据成功")
        }else if(res.code ===201){
          console.log("导出分类数据失败，请检查路径是否合法")
        }
      },

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

        selectCard(id) {
            this.selectedCard = id
            // console.log(this.selectedCard)
        },
        createType() {
            this.$refs.createTypeFormRef.validate(async valid => {
                if (!valid) return
                this.type.name = this.createTypeForm.name
                this.type.pic_url = this.dialogImageUrl
                // console.log(this.type)
                const {data: res} = await this.$blog.post('/admin/types', {
                    type: this.type
                })
                // console.log(res)
                if (res.code === 200) {
                    this.createTypeDialogFormVisible = false
                    await this.getFullTypeList()
                    return this.$message.success(res.message)
                } else {
                    this.createTypeDialogFormVisible = false
                    return this.$message.error(res.message)
                }
            })
        },
        async removeBlogById(row) {
            const {data: res} = await this.$blog.get(`/admin/types/${row.id}/delete`)
            // console.log(res)
            if (res.code === 200) {
                this.createTypeDialogFormVisible = false
                await this.getFullTypeList()
                return this.$message.success(res.message)
            } else {
                return this.$message.error(res.message)
            }
        },
        handleRemove() {
            this.dialogImageUrl = ''
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
            this.createTypeDialogFormVisible = false
            this.createTypeForm.name = ''
            this.$refs.createTypeFormRef.resetFields()
        },
        editBlogDialog(row) {
            this.type = row
            // console.log(this.type)
            if (row.pic_url!=''){
                this.dialogImageUrl = row.pic_url
            }
            this.fileList = [{name: row.pic_url, url: row.pic_url}]
            this.createTypeForm.name = row.name
            this.createTypeDialogFormVisible = true
        }
    },
}
</script>

<style >
.type-image-style{

}

</style>