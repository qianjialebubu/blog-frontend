<template>
    <el-container>
        <el-row :gutter="12">
            <el-col :span="16">
                <el-card  class="left-item">
                    <div slot="header" class="total">
                        <span>博客</span>
                        <span>共 <span style="color: #3a8ee6; font-size: 20px">{{blogList.length}}</span> 篇</span>
                    </div>
                    <div class="blog-content" v-for="blog in blogList" :key="blog.id">
                        <el-col :span="16">
                            <h3>{{blog.title}}</h3>
                            <p class="m-text description">{{blog.description}}</p>
                            <div class="blog-info">
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
                                <div class="blog-type">
                                    <el-tag effect="plain">{{blog.type.name}}</el-tag>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <el-image :src="blog.firstPicture"></el-image>
                        </el-col>
                    </div>
                </el-card>
                <el-pagination
                        background
                        :page-size="queryInfo.pagesize"
                        :current-page="queryInfo.pagenum"
                        layout="prev, pager, next"
                        :total="total">
                </el-pagination>
            </el-col>
            <el-col :span="8">
                <el-card class="right-item" >
                    <div slot="header" class="attributes">
                        <el-button style="float: right; padding: 3px 0; font-size: medium" type="text">more <i
                                class="el-icon-caret-right"></i></el-button>
                        <span>分类</span>
                    </div>
                    <ul>
                        <li class="blog-type" v-for="type in typeList" :key="type.id">
                            <div>{{type.name}}</div>
                            <div>{{type.blogs.length}}</div>
                        </li>
                    </ul>
                </el-card>
                <el-card class="right-item">
                    <div slot="header" class="attributes">
                        <el-button style="float: right; padding: 3px 0; font-size: medium" type="text">more
                            <i class="el-icon-caret-right"></i></el-button>
                        <span>标签</span>
                    </div>
                    <div class="tags">
                        <el-tag class="tag" v-for="tag in tagList" :key="tag.id">
                            {{tag.name}}
                            {{tag.blogs.length}}
                        </el-tag>
                    </div>
                </el-card>
                <el-card class="right-item">
                    <div slot="header" class="attributes">
                        <el-button style="float: right; padding: 3px 0; font-size: medium" type="text">more <i
                                class="el-icon-caret-right"></i></el-button>
                        <span>最新推荐</span>
                    </div>
                        <div class="recommend-blog l-text" v-for="blog in recommendList" :key="blog.id">
                            <a href="#" target="_blank">{{blog.title}}</a>
                        </div>
                </el-card>
            </el-col>
        </el-row>
    </el-container>
</template>

<script>
export default {
    data() {
        return {
            queryInfo: {
                query: '',
                pagenum: 1,
                pagesize: 8
            },
            total:100,
            blogList: [],
            typeList: [],
            tagList: [],
            recommendList: [],
            value: new Date()
        }
    },
    created() {
        this.getTypeList()
        this.getBlogList()
        this.getTagList()
        this.getRecommendList()
    },
    methods: {
        // 获取推荐博客列表
        async getRecommendList() {
            const {data: res} = await this.$http.get('/getRecommendBlogList')
            console.log(res)
            this.recommendList = res.data
            this.total = res.total
        },
        // 获取博客类型列表
        async getTypeList() {
            const {data: res} = await this.$http.get('/getTypeList')
            console.log(res)
            this.typeList = res.data
        },
        // 获取博客标签列表
        async getTagList() {
            const {data: res} = await this.$http.get('/getTagList')
            console.log(res)
            this.tagList = res.data
        },
        // 获取博客列表
        async getBlogList() {
            const {data: res} = await this.$http.get('/getBlogList',)
            console.log(res)
            this.blogList = res.data
        },
        // 修改当前页码
        handleCurrentChange(newSize) {
            this.queryInfo.pagenum = newSize
            this.getBlogList()
        },
    },
}
</script>

<style scoped lang="less">

    ul{
        padding-left: 10px;
        padding-right: 10px;
        border-radius: 5px;
    }

    .el-card /deep/ {
        border-radius: 15px;
        border: 1px solid rgba(84, 92, 100, 0.3);
        box-shadow: 0 2px 12px 0 rgb(0 0 0 / 20%) !important;
    }

    .el-card /deep/ .blog-type {
        height: 40px;
        border-radius: 0;
        padding-left: 20px;
        padding-right: 20px;
    }

    .el-card /deep/  .el-card__header {
        background-color: rgba(179, 216, 255, 0.3);
        border-radius: 15px 15px 0 0;
    }

    .el-card /deep/  .el-card__body {
        padding: 0;
        margin: 0;
    }

    .el-pagination{
        display: flex;
        justify-content: center;
        padding-bottom: 20px;
    }

    .el-container {
        margin: auto;
        width: 80%;

        .right-item {
            margin-bottom: 20px;
            li:first-child{
                border-top: 1px solid rgba(179, 216, 255, 0.5);
            }
            li{
                border-bottom: 1px solid rgba(179, 216, 255, 0.5);
            }
        }

        .tags {
            margin: 15px;
            .tag{
                margin: 5px;
            }
        }

        .tag:hover {
            color: white;
            background-color: #3a8ee6;
            cursor: pointer;
        }

        .blog-type {
            display: flex;
            justify-content: space-between;
            align-items: center;
            line-height: 40px;
        }

        .blog-type:hover {
            background-color: rgba(58, 142, 230, 0.3);
        }

        .recommend-blog {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            padding-left: 20px;
            padding-right: 20px;

            a {
                border-bottom: 1px solid rgba(34, 36, 38, .15);
                line-height: 40px;
                display: block;
                text-decoration: none;
                color: black;
            }

            a:hover {
                color: #3a8ee6;
            }
        }

        .total {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: larger;
            font-weight: bold;
        }

        .blog-content:hover {
            border-left: 5px solid #3a8ee6;
            border-right: 5px solid #3a8ee6;
            border-bottom: 1px solid #3a8ee6;
            background-color: rgba(58, 142, 230, 0.3);
            cursor: pointer;

            .el-tag {
                color: white;
                background-color: #3a8ee6;
            }
        }

        .blog-content {
            height: auto;
            border-bottom: 1px solid rgba(34,36,38,.15);
            display: flex;
            justify-content: space-between;
            align-items: center;
            .el-image {
                border-radius: 5px;
                height: 130px;
            }

            .blog-info {
                display: flex;
                align-items: center;
                color: rgba(0, 0, 0, .4);
                font-size: 10px;

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

                .blog-date {
                    margin-right: 15px;
                }

                .blog-type {
                    margin-left: auto;
                }
            }
        }

        .description {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
        }

        /*text*/
        .m-text {
            font-weight: 300 !important;
            letter-spacing: 1px !important;
            line-height: 1.8 !important;
            font-size: small;
        }

        .l-text {
            font-weight: 300 !important;
            letter-spacing: 1px !important;
            line-height: 1.8 !important;
            font-size: 15px;
        }
    }

</style>