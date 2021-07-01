<template>
    <div class="footer-wrap">
        <!--    center aligned居中-->
        <el-row class="footer-info">
            <el-col :span="4">
                <el-image :src="picload" alt="图片加载失败"
                          class="ui rounded image" style="width: 110px"/>
            </el-col>
            <el-col :span="7">
                <h4 class="ui inverted header m-text-spaced ">最新博客</h4>
                <div id="newblog-container">
                    <div class="recommend-blog l-text list" v-for="blog in footerList" :key="blog.id">
                        <a class="item" href="#" target="_blank">{{blog.title}}</a>
                    </div>
                </div>
            </el-col>
            <el-col :span="5">
                <h4 class="ui inverted header m-text-spaced ">联系我</h4>
                <div class="ui inverted link list">
                    <p class="item">Email：2569757226@qq.com</p>
                    <p class="item">QQ：2569757226</p>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="seven wide column">
                    <h4 class="ui inverted header m-text-spaced">博客简介</h4>
                    <p class="m-text-thin m-text-spaced m-opacity-mini" >
                        梦想还是要有的，万一实现了呢～</p>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <div class="author">
                <p class="m-text-thin m-text-spaced m-opacity-mini">Copright©2018-2022 taiyonoyoni Designed by
                    taiyonoyoni</p>
            </div>
        </el-row>
    </div>
</template>

<script>
export default {
    data(){
        return {
            footerList: [],
            picload:   require('../../assets/images/wechat.jpg')
        }
    },
    created(){
        this.getfooterList()
    },
    methods: {
        async getfooterList() {
            const {data: res} = await this.$http.get('/footer/newblog')
            console.log(res)
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
    }
    .footer-info{
        display: flex;
        align-items: flex-start;
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
            opacity: 0.8;
        }
        .el-image:hover{
            opacity: 1;
        }
    }
    .author{
        color: rgba(255,255,255,.5);
    }
</style>
