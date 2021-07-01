<template>
    <el-container>
        <el-row :gutter="12">
            <el-col :span="16">
                <el-card  class="left-item">
                    <div slot="header" class="total">
                        <div class="title">
                            <i v-if="selected" class="el-icon-back" @click="updateBlogList"></i>
                            <span>{{selectMethod}}</span>
                        </div>
                        <span>共 <span style="color: #3a8ee6; font-size: 20px">{{totalcount}}</span> 篇</span>
                    </div>
                    <div class="blog-content" v-for="blog in blogList" :key="blog.id" @click="getBlogInfo(blog.id)">
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
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-size="queryInfo.pagesize"
                        :current-page="queryInfo.pagenum"
                        layout="total, prev, pager, next, jumper"
                        :total="totalcount">
                </el-pagination>
            </el-col>
            <el-col :span="8">
                <el-card class="right-item" >
                    <div slot="header" class="attributes">

                        <span>分类</span>
                    </div>
                    <ul>
                        <li class="blog-type" v-for="type in typeList" :key="type.id"
                            @click="selectType(type.id)"
                            :class="type.id === typeId? 'activeType':''">
                            <div style="display: flex;align-items: center">
                                <el-image :src="type.pic_url" style="width: 28px;height: 28px; border-radius: 50%; margin-right: 10px"></el-image>
                                {{type.name}}
                            </div>
                            <div>{{type.blogs.length}}</div>
                        </li>
                    </ul>
                    <div class="more" @click="dealType">
                        <i v-if="moreType" class="el-icon-arrow-down"></i>
                        <i v-else class="el-icon-arrow-up"></i>
                    </div>
                </el-card>
                <el-card class="right-item">
                    <div slot="header" class="attributes">
                        <el-button style="float: right; padding: 3px 0; font-size: medium" type="text" @click="getFullTagList">more
                            <i class="el-icon-caret-right"></i></el-button>
                        <span>标签</span>
                    </div>
                    <div class="tags">
                        <div class="tag-item" v-for="tag in tagList"
                             @click="selectTag(tag.id)"
                             :class="tag.id === tagId? 'activeTag':''">
                            <div class="sjx-outer">
                                <div class="sjx-inner"></div>
                            </div>
                            <div class="tag" >
                                {{tag.name}}
                                {{tag.blogs.length}}
                            </div>
                        </div>
                    </div>
                    <div class="more" @click="dealTag">
                        <i v-if="moreTag" class="el-icon-arrow-down"></i>
                        <i v-else class="el-icon-arrow-up"></i>
                    </div>
                </el-card>
                <el-card class="right-item">
                    <div slot="header" class="attributes">
                        <span>最新推荐</span>
                    </div>
                        <div class="recommend-blog l-text" v-for="blog in recommendList" :key="blog.id" @click="getBlogInfo(blog.id)">
                            <a >{{blog.title}}</a>
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
            totalcount: 100,
            queryInfo: {
                query: '',
                pagenum: 1,
                pagesize: 8
            },
            blogList: [],
            typeList: [],
            tagList: [],
            recommendList: [],
            selectMethod:'全部博客',
            typeId:-1,
            tagId:-1,
            selected: false,
            moreType: true,
            moreTag: true,
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
            const {data: res} = await this.$http.get('/getBlogList',{
                params: this.queryInfo
            })
            console.log(res)
            this.blogList = res.data.content
            this.totalcount = res.data.totalElements
        },
        // 跳转到博客详情页
        getBlogInfo(blogId){
            this.$router.push({path:'/blogInfo',query:{id:blogId}});
        },
        // 修改当前页码
        handleCurrentChange(newSize) {
            this.queryInfo.pagenum = newSize
            this.getBlogList()
        },
        // 修改当前页大小
        handleSizeChange(newSize) {
            this.queryInfo.pagesize = newSize
            this.getGoodsList()
        },
        // 按分类筛选博客
        async selectType(id){
            this.typeId = id
            const {data: res} = await this.$http.get(`/types/${this.typeId}`)
            console.log(res)
            this.blogList = res.data.content
            this.totalcount = res.data.totalElements
            this.selectMethod = '分类: '+this.typeList.find( item => item.id === this.typeId).name
            this.selected = true
        },
        // 按标签筛选博客
        async selectTag(id){
            this.tagId= id
            const {data: res} = await this.$http.get(`/tags/${this.tagId}`)
            this.blogList = res.data.content
            this.totalcount = res.data.totalElements
            this.selectMethod = '标签: '+this.tagList.find(item => item.id === this.tagId).name
            this.selected = true
        },
        // 更新博客列表
        updateBlogList(){
            this.selected = false
            this.typeId = -1
            this.tagId = -1
            this.getBlogList()
        },
        // 得到所有的分类
        async getFullTypeList(){
            const {data: res} = await this.$http.get('/getFullTypeList')
            console.log(res)
            this.typeList = res.data
        },
        // 得到所有的标签
        async getFullTagList(){
            const {data: res} = await this.$http.get('/getFullTagList')
            console.log(res)
            this.tagList = res.data
        },
        async dealType(){
            if (this.moreType){
                await this.getFullTypeList()
            }else {
                await this.getTypeList()
            }
            this.moreType = !this.moreType
        },
        async dealTag(){
            if (this.moreTag){
                await this.getFullTagList()
            }else {
                await this.getTagList()
            }
            this.moreTag = !this.moreTag
        }
    },
}
</script>

<style scoped lang="less">

    ul{
        padding-left: 10px;
        padding-right: 10px;
        margin-bottom: 0;
        border-radius: 5px;
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

    .el-card /deep/ {
        border-radius: 15px;
        border: 1px solid rgba(84, 92, 100, 0.3);
        box-shadow: 0 2px 12px 0 rgba(0 0 0 0.2) !important;
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
            .more{
                text-align: center;
                color: #3a8ee6;
                padding: 8px;
            }
            .blog-type:hover,.activeType  {
                background-color: rgba(58, 142, 230, 0.3);
                cursor: pointer;
            }

            .tags {
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                margin: 15px 13px 0;
                border-bottom: 1px solid rgba(179, 216, 255, 0.5);

            }

            .tag-item {
                display: flex;
                justify-content: space-around;
                align-items: center;
                margin-left: 10px;
                margin-bottom: 10px;
            }

            .tag {
                background-color: #ecf5ff;
                display: inline-block;
                height: 22px;
                padding: 0 10px;
                line-height: 20px;
                font-size: 10px;
                color: #409eff;
                border-radius: 4px;
                box-sizing: border-box;
                white-space: nowrap;
                border: 1px solid #409eff;
            }

            .sjx-outer {
                width: 0;
                height: 0;
                border-top: 6px solid transparent;
                border-bottom: 6px solid transparent;
                border-right: 6px solid #409eff;
                position: relative;
            }

            .sjx-inner {
                border-top: 6px solid transparent;
                border-bottom: 6px solid transparent;
                border-right: 6px solid #ecf5ff;
                top: -6px;
                left: 1px;
                position: absolute;
            }

            .tag-item:hover, .activeTag {
                .tag{
                    color: white;
                    background-color: #409eff;
                    cursor: pointer;
                }
                .sjx-inner {
                    border-right: 6px solid #409eff;
                }
            }

        }


        .blog-type {
            display: flex;
            justify-content: space-between;
            align-items: center;
            line-height: 40px;
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
            .title{
                display: flex;
                align-items: center;
                .el-icon-back{
                    font-weight: bolder;
                    color: #3a8ee6;
                    margin-right: 10px;
                }
                .el-icon-back:hover{
                    cursor: pointer;
                }
            }
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
            padding: 10px;
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