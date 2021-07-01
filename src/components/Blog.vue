<template>
    <el-container class="m-container-small m-padded-tb-big animate__animated animate__fadeIn ">
        <el-card class="first-card">
            <div slot="header" class="total blog-info">
                <div class="user-info">
                    <el-avatar size="small" :src="blog.user.avatar"></el-avatar>
                    <a href="#" class="header">{{blog.user.nickname}}</a>
                </div>
                <div class="blog-date">
                    <i class="el-icon-date"></i>
                    <span>{{blog.createTime | dataFormat}}</span>
                </div>
                <div>
                    <i class="el-icon-view"></i>
                    <span>{{blog.views}}</span>
                </div>
            </div>
            <el-image class="blog-pic" :src="blog.firstPicture"></el-image>
            <hr class="style-one"/>
            <h2 class="blog-title header">{{blog.title}}
                <el-tag effect="plain" type="warning" style="font-weight: bold; font-size: small; margin-left: 20px">
                    {{blog.flag}}
                </el-tag>
            </h2>
            <div v-highlight class="typo typo-selection m-padded-lr-responsive m-padded-tb-large js-toc-content"
                 v-html="blog.content"></div>
            <div class="tags">
                <div class="tag-item" v-for="tag in blog.tags">
                    <div class="sjx-outer">
                        <div class="sjx-inner"></div>
                    </div>
                    <div class="tag">
                        {{tag.name}}
                    </div>
                </div>
            </div>

            <el-popover
                    placement="bottom"
                    title=""
                    width="300"
                    trigger="hover"
                    content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
                    <div class="give-money">
                        <div class="give-money-item">
                            <el-image :src="wechart" title="微信支付"></el-image>
                            <p>微信</p>
                        </div>
                        <div class="give-money-item">
                            <el-image :src="alipay" title="支付宝支付"></el-image>
                            <p>支付宝</p>
                        </div>
                    </div>
                    <el-button class="zanshang" slot="reference" type="danger" round plain>赞赏</el-button>
            </el-popover>

            <div class="author">
                <ul>
                    <li>作者 {{blog.user.nickname}}</li>
                    <li>发表时间 {{blog.createTime | dataFormat}}</li>
                </ul>
            </div>
            <el-card shadow="never" class="comments">
                <div class="header">
                    评论
                </div>
                <div class="comment">
                    <el-avatar class="avatar" :src="blog.user.avatar" size="small"></el-avatar>
                    <div class="right-con">
                        <div class="comment-title">
                            <a class="comment-author">
                                <span>{{blog.user.nickname}}</span>
                                <span>博主</span>
                            </a>
                            <div class="comment-data">
                                <span class="date">Today at 5:42PM</span>
                            </div>
                        </div>
                        <div class="comment-content">
                            1111你好
                        </div>
                        <div class="reply">回复</div>
                    </div>
                </div>
                <div class="comment">
                    <el-avatar class="avatar" :src="blog.user.avatar" size="small"></el-avatar>
                    <div class="right-con">
                        <div class="comment-title">
                            <a class="comment-author">
                                <span>{{blog.user.nickname}}</span>
                                <span>博主</span>
                            </a>
                            <div class="comment-data">
                                <span class="date">Today at 5:42PM</span>
                            </div>
                        </div>
                        <div class="comment-content">
                            1111你好
                        </div>
                        <div class="reply">回复</div>
                    </div>
                </div>
            </el-card>
            <el-form class="commmet-reply">
                <el-form-item>
                    <el-input type="textarea" class="write-commmet" :rows="6">
                    </el-input>
                </el-form-item>
                <el-form-item class="auth-info">
                    <el-input
                            class="item name"
                            placeholder="姓名"
                            prefix-icon="el-icon-search"
                            style="width: 200px">
                    </el-input>
                    <el-input
                            class="item email"
                            placeholder="邮箱"
                            prefix-icon="el-icon-search"
                            style="width: 200px">
                    </el-input>
                    <el-button prefix-icon="el-icon-submit" type="primary" class="item" >
                        <i class="el-icon-edit"></i> 提交
                    </el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </el-container>
</template>

<script>
import Prism from '../plugins/prism'

export default {
    data() {
        return {
            blog: '',
            blogId: 0,
            wechart:   require('../assets/images/weixinzhifu.png'),
            alipay:   require('../assets/images/zhifubao.jpg')
        }
    },
    created() {
        this.getBlogInfomation()
    },
    methods: {
        async getBlogInfomation() {
            console.log(this.$route.params.id)
            const {data: res} = await this.$http.get(`/blog/${this.$route.query.id}`)
            this.blog = res.data
            this.blogId = this.$route.params.id
            this.timer = setTimeout(() => {
                Prism.highlightAll() // 这里加定时器让它后执行，不然没效果
            }, 0)
        }
    }
}
</script>

<style scoped lang="less">
    @import '../assets/css/typo.css';
    @import '../assets/css/me.css';
    @import '../assets/css/animate.css';

    .el-container {
        margin: 20px auto;
        width: 70%;
        display: block;
    }

    .el-card {
        width: 100%;
    }

    .el-popper /deep/ {
        box-shadow: 0 2px 4px 0 rgb(34 36 38 / 12%),
    }

    .first-card {
        border-radius: 10px 10px 0 0;
        position: relative;
        padding-bottom: 100px;
        text-align: center;
        font: 300 1em/1.8 PingFang SC, Lantinghei SC, Microsoft Yahei, Hiragino Sans GB, Microsoft Sans Serif, WenQuanYi Micro Hei, sans-serif;
        .blog-pic{
            border-radius: 8px;
        }
    }

    hr.style-one{
        width: 100%;
        background-image: linear-gradient(to right, rgba(64, 158, 255, 0), rgba(64, 158, 255, 0.75), rgba(64, 158, 255, 0));
    }

    .commmet-reply{
        position: relative;
        .auth-info{
            position: absolute;
            left: 0;
        }
        .item{
            margin-right: 20px;
        }
    }
    .zanshang{
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .give-money{
        display: flex;
        justify-content: space-around;
        align-items: center;
        border: 1px solid #409eff;
        border-radius: 10px;
        .give-money-item{
            border-radius: 10px;
            padding: 10px;
            width: 50%;
            text-align: center;
            .el-image{
                border: 1px solid #ccc;
                border-radius: 5px;
                margin-left: 5px;
                margin-right: 5px;
            }

            p{
                font-size: smaller;
                font-weight: bold;
                color: #3a8ee6;
                display: block;
                line-height: 20px;
                margin: 0;
            }
        }
    }

    .tags {
        display: flex;
        align-items: center;
        margin-left: 50px;
    }

    .tag-item {
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-left: 10px;
        margin-bottom: 20px;
    }

    .tag {
        padding-left: 10px;
        padding-right: 10px;
        border-radius: 5px;
        background-color: #ecf5ff;
        border: 1px solid #409eff;
        color: #409eff;
        display: flex;
    }

    .sjx-outer {
        width: 0;
        height: 0;
        border-top: 7px solid transparent;
        border-bottom: 7px solid transparent;
        border-right: 7px solid #409eff;
        position: relative;
    }

    .sjx-inner {
        border-top: 7px solid transparent;
        border-bottom: 7px solid transparent;
        border-right: 7px solid #ecf5ff;
        top: -7px;
        left: 1px;
        position: absolute;
    }

    .author {
        text-align: left;
        background-color: #fcfff5;
        box-shadow: 0 0 0 1px #a3c293 inset;
        color: #2c662d;
        width: 100%;
        position: absolute;
        left: 0;
        margin: 20px 0;
        padding: 20px 0;
        font-size: small;
        font-family: PingFang SC, Lantinghei SC, Microsoft Yahei, Hiragino Sans GB, Microsoft Sans Serif, WenQuanYi Micro Hei, sans-serif;
    }

    .comments {
        margin-top: 150px;
        box-shadow: 0 1px 2px 0 rgb(34 36 38 / 15%);
        border: 1px solid rgba(34, 36, 38, .15);
        border-top: 2px solid #409EFF;
        text-align: left;
        .comment{
            border-top: 1px solid #ccc;
            padding-top: 20px;
            display: flex;
            align-items: flex-start;
            font-size: 12px;
            .avatar{
                margin-right: 15px;
                margin-top: 5px;
            }
            .comment-title{
                color: black;
                display: flex;
                .comment-author{
                    font-weight: bold;
                    span{
                        padding-right: 5px;
                    }
                }
                .comment-data{
                    color: rgba(0,0,0,.5);
                }
            }
            .reply{
                color: rgba(0,0,0,.5);
            }
            .reply:hover{
                color: rgba(0,0,0,1);
                cursor: pointer;
            }

            .comment-content{
                font-size: 14px;
                letter-spacing: 2px;
                font-family: "微软雅黑", Arial, sans-serif;
            }
        }
        .header {
            font-family: Lato, 'Helvetica Neue', Arial, Helvetica, sans-serif;
            font-weight: 700;
            font-size: 1.28571429rem;
            color: rgba(0, 0, 0, .87);
        }

    }

    .write-commmet{
        margin-top:20px;
    }

    .blog-pic {
        width: 100%;
    }

    .blog-title {
        text-align: center;
    }

    .blog-info {
        display: flex;
        align-items: center;
        color: rgba(0, 0, 0, .4);
        font-size: 13px;

        .blog-date {
            margin-right: 5px;
        }

        .user-info {
            display: flex;
            justify-content: space-around;
            align-items: center;
            margin-right: 15px;

            .el-avatar {
                margin-right: 5px;
                width: 22px;
                height: 22px;
            }

            .header {
                text-decoration: none;
                color: #3a8ee6;
                font-weight: bold;
            }
        }
    }
</style>