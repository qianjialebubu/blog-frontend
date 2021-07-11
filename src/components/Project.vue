<template>
    <el-container>
        <el-card class="project" v-for="(project,index) in projectList">
            <el-image v-if="index%2===0" :src="project.pic"></el-image>
            <div class="pro-info">
                <h3>{{project.proName}}</h3>
                <p class="info">{{project.proInfo}}</p>
                <div class="proTech">
                    <p class="tech" v-for="tech in project.proTech">{{tech}}</p>
                </div>
            </div>
            <el-image v-if="index%2===1" :src="project.pic"></el-image>
        </el-card>
    </el-container>
</template>

<script>
export default {
    data() {
        return {
            projectList: [
                {
                    pic:  require('../assets/images/bg2.jpeg'),
                    proName: 'Vue电商管理系统',
                    proInfo: '实现了商城后台管理用户账号(登录，退出，用户管理，权限管理)，商品管理(商品分类，分类参数，商品信息，订单)，数据统计等功能',
                    proTech: ['Vue' , 'Vue-router' , 'Element-UI' , 'Axios' , 'Echarts']
                },

                {
                    pic:  require('../assets/images/bg.jpeg'),
                    proName: '简易个人博客系统',
                    proInfo: '一个简单的个人博客项目博客的浏览，查找，评论，以及后台对博客的管理等功能。',
                    proTech: ['SpringBoot','JPA','Semantic-UI','MySQL']
                },


            ]
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
        height: 200px;
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

    .el-card:hover .el-image{
        -webkit-transform: scale(1.1);
        transition: all .6s;
    }


    .project{
        .pro-info {
            margin-top: 15px;
            margin-left: 30px;
            margin-right: 20px;
            width: 60%;
            .proTech{
                display: flex;
                flex-wrap: wrap;
                font-size: small;
                .tech{
                    margin: 5px;
                }
            }
        }
    }
</style>