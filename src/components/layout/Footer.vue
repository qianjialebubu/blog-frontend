<template>
    <div class="animate__animated animate__fadeInUp footer-wrap">
        <!--    center aligned居中-->
        <el-row :gutter="20" class=" footer-info">
            <el-col class="ewm" :xs="24" :sm="4" >
                <el-image src="https://blog-bu.oss-cn-beijing.aliyuncs.com/blog_static_resource/portrait_programmer_20230308114752.jpg" alt="图片加载失败"
                          class="ui rounded image" style="width: 110px"/>
            </el-col>
            <el-col class="new-blog" :xs="24" :sm="7">
                <h4 class="ui inverted header m-text-spaced ">最新博客</h4>

                <div id="newblog-container">
                    <div class="recommend-blog l-text list" v-for="blog in footerList" :key="blog.id">
                        <a class="item" href="#" target="_blank">{{blog.title}}</a>

                    </div>
                </div>
            </el-col>
            <el-col class="connect" :xs="24" :sm="5">
                <h4 class="ui inverted header m-text-spaced ">联系我</h4>
                <div class="ui inverted link list">
                    <p class="item">Email：2077103562@qq.com</p>
                    <p class="item">QQ：2077103562</p>
                </div>
            </el-col>
            <el-col class="intro" :xs="24" :sm="8">
                <div class="seven wide column">
                    <h4 class="ui inverted header m-text-spaced">博客简介</h4>
                    <p class="m-text-thin m-text-spaced m-opacity-mini" >
                        梦想还是要有的，万一实现了呢～</p>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <div class="author">
<!--                <p class="m-text-thin m-text-spaced m-opacity-mini">Copright©2018-2022 taiyonoyoni Designed by-->
<!--                    taiyonoyoni</p>-->
              <a href="https://beian.miit.gov.cn/" target="_blank">备案号:</a>
              <a href="https://beian.miit.gov.cn/" target="_blank">津ICP备2023001661号-1</a>
              <p>Copyright © 2023<span v-if="getda"> - {{year}}</span> qjl. All rights reserved.</p>
            </div>
        </el-row>
    </div>
</template>

<script>
export default {
  mounted() {
    // 调用获取年
    this.getCurrentYear()
  },
  data(){

        return {
          // 当前年
          year:'',
          // 默认隐藏
          getda:false,
          footerList: [],
        }
    },
    created(){
        this.getfooterList()
    },
    methods: {
      // 版权 获取当前年
      getCurrentYear() {
        let date = new Date();
        let y = date.getFullYear();
        this.time = y;
        this.year = y;
        if (y > 2023 ) {
          this.getda = true
        } else {
          this.getda = false
        }
      },
        async getfooterList() {
            const {data: res} = await this.$blog.get('/footer/newblog')
            this.footerList = res.data
        }
    }
}
</script>

<style scoped lang="less">
    *:hover{
        cursor: pointer;
    }
    .footer-wrap {
        bottom: 0 !important;
        line-height: 2;
        position: relative;
        padding: 40px 20px;
        color: #eee;
        font-size: 14px;
        text-align: center;
        background-color: #545c64;
        transition: .2s;
    }
    .footer-info{
        line-height: 15px;
        color: rgba(255,255,255,.5);
        a{
            text-decoration: none;
            color: rgba(255,255,255,.5);
        }
        h4{
            color: white;
        }

        .list .item{
            line-height: 20px;
        }

        .list .item:hover{
            color: white;
        }
        .el-image{
            margin: 0 auto;
            opacity: 0.8;
        }
        .el-image:hover{
            opacity: 1;
        }
    }
    .author{
        color: rgba(255,255,255,.5);
    }

    @media only screen and (max-width: 480px) {
        .ewm,.new-blog,.intro,.connect{
            display: none;
        }
    }
</style>
