<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>图片管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-upload
            class="upload-demo"
            drag
            action="http://175.24.197.233:8090/uploadPictureManage"
            multiple>
      <i class="el-icon-upload" ></i>
      <div class="el-upload__text" >将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <el-button @click="getPicList" type="info" plain>刷新</el-button>
    <waterfall id="waterfall_box" :width="itemWidth" :gutterWidth="gutterWidth" :col="col" :data="pictureList">
      <template>
        <div v-for="(pic,idx) in pictureList" class="waterfall_item" :key="pic">
          <el-card class="imgs" >
            <div style="width: 100%;height: 100%">
              <img class="images" v-if="pic" :lazy-src="pic" @click="showImg(pic)"/>
              <span>{{pic}}</span>

              <el-button size="mini" type="danger" circle @click="deletePic(pic,idx)">
                <i class="el-icon-delete"></i>
              </el-button>

            </div>
          </el-card>
        </div>
      </template>
      <el-dialog :visible.sync="dialogVisible">
<!--        <img width="100%" :src=dialogImageUrl alt="">-->
        <img width="100%" :src=dialogImageUrl >
        显示图片
      </el-dialog>
    </waterfall>



<!--    测试修复功能-->
<!--    <el-upload-->
<!--        class="upload-demo"-->
<!--        drag-->
<!--        action="http://192.168.3.184:8090/uploadPictureManageFixPic"-->
<!--        :on-success="uploadSuccess"-->
<!--        multiple>-->
<!--      <i class="el-icon-upload" ></i>-->
<!--      <div class="el-upload__text" >将待修复拖到此处，或<em>点击上传</em></div>-->
<!--      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>-->
<!--    </el-upload>-->

<!--    <el-button @click="testPython">上传</el-button>-->
<!--    <el-button @click="fixPic">开始修复</el-button>-->
<!--    <el-button @click="clearPic">清空</el-button>-->
    <br>
    <img width="20%" :src=show_fix_before_pic.data @click="showImg(show_fix_before_pic.data)">
    <template>
      <div>
        <img width="20%" :src=show_fix_after_pic.url_pic @click="showImg(show_fix_after_pic.url_pic)">
      </div>
    </template>
  </div>

</template>

<script>
export default {
  data() {
    return {
      pictureList: [],
      renderList:[],
      waterfall_box_width: 0,
      waterfall_box_height: 0,
      waterfall_col_num: 0,
      waterfall_col_height_list: null, //每列最大高度
      img_width: 250,
      img_margin_right: 20,
      img_margin_bottom: 20,
      dialogVisible: false,
      dialogImageUrl: '',
      from_python: '没有返回',
      show_fix_after_pic: '',
      show_fix_before_pic: ''
    }
  },
  created() {
    this.getPicList()
  },
  computed:{
    itemWidth(){
      return 270 // #rem布局 计算宽度
    },
    gutterWidth(){
      return (18*0.5*(document.documentElement.clientWidth/270))	//#rem布局 计算x轴方向margin(y轴方向的margin自定义在css中即可)
    },
    col(){
      return Math.floor(document.documentElement.clientWidth/270)
    }
  },

  methods: {
    uploadSuccess(response){
      this.show_fix_before_pic = response
    },
    refresh:function () {
      location.reload();
    },
    handleRemove() {
      this.dialogImageUrl = ''
    },
    async handleSuccess(res) {
      // console.log(res.data)
      this.dialogImageUrl = res.data
    },
    scroll(scrollData){
      // console.log(scrollData)
    },
    switchCol(col){
      this.col = col
      // console.log(this.col)
    },
    loadmore(index){
      this.data = this.data.concat(this.data)
    },
    showImg(url) {
      this.dialogImageUrl = url
      this.dialogVisible = true
    },
    async checkImgWidth(fileUrl) {
      return new Promise((resolve, reject) => {
        let img = new Image();
        img.src = fileUrl
        let res = {}
        img.onload = function () {
          res = {
            width: this.width,
            height: this.height,
            url: fileUrl
          }
          resolve(res)
        }
      })
    },
    async getPicList() {
      const {data: res} = await this.$picture.get('/pic/get_all')
      this.pictureList = res
    },
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
    async testPython(){
      const {data: res} = await this.$picture.get('http://127.0.0.1:8000/')
      this.from_python = res
    },

    async fixPic(){
      const {data: res} = await this.$picture.post('http://175.24.197.233:8000/fixPic',this.show_fix_before_pic)
      this.show_fix_after_pic = res
    },
    // async fixPic(){
    //   const {data: res} = await this.$picture.get('http://127.0.0.1:8000/fixPic')
    //   this.from_python1 = res
    // },
    async clearPic(){
      this.from_python = ''
      this.from_python1 = ''
      this.show_fix_before_pic = ''
      this.show_fix_after_pic = ''
    }
  }
}
</script>

<style scoped lang="less">
  .el-card /deep/ .el-card__body{
    padding: 0;
  }
  #waterfall_box {
    width: 100%;
    position: relative;
    margin: 20px auto;

    .waterfall_item {

      .imgs {
        position: relative;
        margin-bottom: 20px;

        img {
          width: 100%;
        }

        span {
          position: absolute;
          bottom: 0;
          left: 0;
          line-height: 18px;
          font-size: small;
          color: #eee;
          background-color: rgba(0, 0, 0, 0.3);
          visibility: hidden;
        }

        button {
          position: absolute;
          top: 0;
          right: 0;
          visibility: hidden;
        }
      }

    }

    .waterfall_item:hover {
      cursor: pointer;
      overflow: hidden;


      span {
        color: white;
        transition: all .3s;
        visibility: visible;
      }

      button {
        visibility: visible;
      }

      img{
        transform: scale(1.1);
        width: 100%;
        transition: .6s;
      }
    }
  }

</style>