<template>
    <el-container>
        <el-row>
            <el-col :span="24">
                <a href="www.baidu.com" style="text-decoration: none">
                    <el-card class="project" v-for="(project,index) in projectList">
                        <el-image class="image" :src="project.pic_url"></el-image>
                        <div class="pro-info">
                            <h3>{{project.title}}</h3>
                            <p class="info">{{project.content}}</p>
                            <div class="proTech">
                                <p class="tech">{{project.techs}}</p>
                            </div>
                        </div>
                    </el-card>
                </a>
            </el-col>

        </el-row>

    </el-container>
</template>

<script>
export default {
    data() {
        return {
            projectList: [
                {
                    title: 'Vue电商管理系统',
                    content: '实现了商城后台管理用户账号(登录，退出，用户管理，权限管理)，商品管理(商品分类，分类参数，商品信息，订单)，数据统计等功能,',
                    techs: ['Vue', 'Vue-router', 'Element-UI', 'Axios', 'Echarts']
                },

                {
                    title: '个人博客系统',
                    content: '一个简单的个人博客项目博客的浏览，查找，评论，以及后台对博客的管理等功能。',
                    techs: ['SpringBoot', 'JPA', 'Semantic-UI', 'MySQL']
                },


            ],
        }
    },
    created() {
        this.getProjectList()
    },
    methods: {
        async getProjectList() {
            const {data: res} = await this.$blog.get('/projects')
            if (res.code === 200) {
                this.projectList = res.data
            }
        }
    }
}
</script>

<style scoped lang="less">

    .el-card {
        width: 80%;
        margin: 15px;
        border-radius: 20px;
        padding: 0;
    }

    .el-card /deep/ .el-card__body {
        display: flex;
        height: 220px;
        padding: 0;
        margin: 0;
    }

    .el-card:hover {
        cursor: pointer;
        color: white;
        background-color: #3a8ee6;

    }

    .el-image {
        width: 40%;
        height: 100%;
    }

    .el-card:hover .el-image {
        -webkit-transform: scale(1.1);
        transition: all .6s;
    }


    .project {
        .pro-info {
            margin-top: 15px;
            margin-left: 30px;
            margin-right: 20px;
            height: auto;
            width: 60%;

            .proTech {
                display: flex;
                flex-wrap: wrap;
                font-size: small;

                .tech {
                    margin: 5px;
                }
            }
        }
    }

    @media screen and (max-width: 480px) {
        .el-card {
            width: 90%;
            margin: 10px;
            padding: 0;
        }

        .el-image {
            width: 100%;
            height: 100%;
        }

        .el-card /deep/ .el-card__body {
            height: auto;
            flex-direction: column;

            .image {
                width: 100%;
                height: auto;
                flex-shrink: 0;
            }
        }

        .project {
            .pro-info {
                width: 90%;
                margin: 0 auto;
                margin-bottom: 10px;
            }
        }
    }
</style>