<template>
    <div class="animate__animated animate__fadeIn box">
        <nav class="header">
            <div class="container title">
                <i class="web-font">Hikari</i>
                <div class="right-items">
                    <div class="link">
                        <a href="javascript:;" @click="scoll('self-introduce')"
                           class="link-item personal-introduce">个人介绍</a> |
                        <a href="javascript:;" @click="scoll('project')" class="link-item project-introduce">项目介绍</a> |
                        <a href="javascript:;" @click="scoll('comments')" class="link-item message">给我留言</a>
                    </div>
                    <img src="../assets/about/avatar.png" alt="">
                </div>
            </div>
        </nav>
        <div class="first">
            <div class="container">
                <div class="banner">
                    <p class="m-text-large m-margin-tb-tiny">求职意向:前端开发工程师</p>
                    2022届应届毕业生，正在寻找工作机会，工作地点不限，首选上海
                    <br>
                    <br>
                    <br>
                    <p class=" m-text-small m-margin-tb-tiny"><i class="iconfont icon-youxiang"></i> 2569757226@qq.com
                    </p>
                    <p class="m-text-small m-margin-tb-tiny"><i class="iconfont icon-shouji"></i> 13835486950</p>
                </div>
            </div>
        </div>
        <div id="self-introduce" class="second">
            <div class="container">
                <div class="left-item">
                    <div class="title">技能掌握</div>
                    <div class="table">
                        <div class="table-td-l">
                            <div v-for="skill in skillList" class="m-text-small">
                                {{skill.name}}
                            </div>
                        </div>
                        <div class="table-td-r">
                            <div class="rect" v-for="skill in skillList">
                                <div class="tran" :style="'width: '+skill.score"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="right-item">
                    <div class="header">
                        <dl id="tabSelector" class="tabs">
                            <dd class="tab" v-for="tab in tabList" :class="tab.id===tabActiveId?'active':''" @click="selectTab(tab.id)">{{tab.title}}</dd>
                        </dl>
                        <div class="tab-place"></div>
                    </div>
                    <div id="tab-con" class="tab-content">
                        2018-至今
                        <div v-if="tabActiveId === 0" class="info edu-info">
                            <div> XXXXXX大学 本科 XXXX学院 计算机科学与技术</div>
                            <div> GPA: 3.87/4 英语水平: 6级</div>
                            <div> 在校期间学习成绩良好，专业排名前5%，曾获得国家奖学金，国家励志奖学金，多次专业一等奖学金，三好学生等荣誉。
                            </div>
                        </div>
                        <div v-if="tabActiveId === 1" class="info award-info">
                            <span v-for="award in awardList">{{award}} <br></span>
                        </div>
                        <div v-if="tabActiveId === 2" class="info work-info">
                            暂无工作经历，求捞
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <dl id="project">
            <dd class="project-item" v-for="project in projectList">
                <div class="place">
                    <img src="../assets/about/vueShop.png" alt="" style="visibility: hidden">
                </div>
                <div class="container">
                    <img src="../assets/about/vueShop.png" alt="">
                    <div class="info">
                        <div class="info-header">
                            <p class="m-text-meddle title m-margin-tb-tiny">{{project.name}}</p>
                            <p class="m-text-small date">{{project.time}}</p>
                        </div>
                        <p>{{project.role}} | {{project.company}}</p>
                        <p>{{project.describe}}</p>
                        <p>项目中使用的技术：{{project.techs.join(' | ')}} </p>
                    </div>
                </div>
                <div class="place">
                    <div class="demo">
                        <img src="../assets/about/vueShop.png" alt="">
                    </div>
                </div>
            </dd>
        </dl>
        <div class="hudong">
            <div class="container">
                <div class="left-item">
                    <dl id="imgList">
                        <dd v-for="card in cardList" :key="card.id">
                            <div class="card">
                                <img src="../assets/about/bg/1.jpeg">
                                <div class="title">
                                    <div class="info">
                                        <p class="m-text-small">{{card.information}}</p>
                                        <div class="heart">
                                        </div>
                                    </div>
                                    <a :href="card.url"
                                       class="info-description m-text-small">{{card.url}}</a>
                                </div>
                            </div>
                        </dd>
                    </dl>
                </div>
                <div id="comments" class="right-item">
                    <div class="title">留言板</div>
                    <div class="comments">
                        <dl>
                            <dd class="comment" v-for="comment in commentList">
                                <div class="avatar m-text-large" v-text="comment.name.substring(0,1)"></div>
                                <div class="content">
                                    <p class="name m-text-small">{{comment.name}}</p>
                                    <p class="word m-text-small m-text-thin">{{comment.content}}</p>
                                </div>
                            </dd>
                        </dl>
                    </div>
                    <form class="comment-input">
                        <input name="comment" type="text" placeholder="请输入评论" style="width: 100%" v-model="formData.content">
                        <input name="name" type="text" placeholder="请输入姓名" v-model="formData.name">
                        <input type="button" @click="publish" value="提交">
                    </form>
                </div>
            </div>
        </div>

        <div class="footer">
            <p class="m-text-small m-text-spaced m-padded-tiny">
                走到生命的哪一个阶段,都该喜欢那一段时光,完成那一阶段该完成的职责,顺生而行,<br>
                不沉迷过去,不狂热地期待着未来, 生命这样就好。不管正经历着怎样的挣扎与挑战,或许我们都只有一个选择虽然痛苦,却依然要快乐,并相信未来</p>
            <p>Copright©2018-2022 Hikari Designed by Hikari</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            skillList: [
                {
                    name: 'HTML',
                    score: Math.ceil(Math.random() * 80) + 'px'
                },
                {
                    name: 'CSS',
                    score: Math.ceil(Math.random() * 80) + 'px'
                },
                {
                    name: 'JavaScript',
                    score: Math.ceil(Math.random() * 80) + 'px'
                },
                {
                    name: 'Vue',
                    score: Math.ceil(Math.random() * 80) + 'px'
                },
                {
                    name: 'Java',
                    score: Math.ceil(Math.random() * 80) + 'px'
                },
                {
                    name: 'C++',
                    score: Math.ceil(Math.random() * 80) + 'px'
                },
            ],
            awardList: [
                '2018.10全国大学生数学竞赛省级二等奖',
                '2019.03第十届蓝桥杯C/C++组省赛一等奖',
                '2019.09全国大学生数学建模竞赛省级二等奖',
                '2020.10第11届蓝桥杯C/C++组省级一等奖，国家级三等奖',
                '2021.04全国高校团体程序设计天梯赛团队铜奖，个人国家三等奖',
                '2021.05第12届蓝桥杯Java组省级一等奖，国家级三等奖'
            ],
            tabActiveId: 0,
            tabList: [
                {
                    id:0,
                    title: '教育经历'
                },
                {
                    id:1,
                    title: '竞赛获奖'
                },
                {
                    id:2,
                    title: '工作经历'
                }
            ],
            commentList:[
                {
                    name: '蜡笔小新',
                    content: '梦不会逃走，逃走的一直都是自己。'
                },
                {
                    name: '樱桃小丸子',
                    content: '心满意足享受每一点快乐，是走向幸福的唯一途径。'
                },
                {
                    name: '哈尔的移动城堡',
                    content: '世界这么大，人生这么长，总会有这么一个人，让你想要温柔的对待。'
                },
                {
                    name: '妖精的尾巴',
                    content: '若不想输给任何人，就得先认清自己的渺小。'
                }
            ],
            cardList:[
                {
                    id:1,
                    information: 'CSDN个人博客',
                    url: 'https://blog.csdn.net/weixin_44996854'
                },
                {
                    id:2,
                    information: '我的码云仓库',
                    url: 'https://gitee.com/tyoubin_admin'
                },
                {
                    id:3,
                    information: '我的个人网站',
                    url: 'http://hikari.top/'
                },
                {
                    id:4,
                    information: '我的爱好',
                    url: '网球 跑步 二次元 日语'
                },
                {
                    id:5,
                    information: '我的追番',
                    url: 'one piece 进击の巨人 不滅のあなたへ'
                },
                {
                    id:6,
                    information: '我的歌单',
                    url: 'Lemon 打上花火 夜に駆ける Time after time'
                },
                {
                    id:7,
                    information: '我的计划',
                    url: '学习前端，做项目，找工作'
                },
                {
                    id:8,
                    information: '我的愿望',
                    url: '找到工作 做的挑战的事 新的环境和朋友 去世界各地'
                },
            ],
            formData:{
                name:'',
                content: ''
            },
            projectList: [
                {
                    name: 'Vue电商管理系统',
                    role: '前端工程师',
                    company: '自学项目',
                    describe: '实现了商城后台管理用户账号(登录，退出，用户管理，权限管理)，商品管理(商品分类，分类参数，商品信息，订单)，数据统计等功能',
                    time: '2021-04 ~ 2021-05',
                    techs: ['Vue','Vue-router','Element-UI','Axios','Echarts']
                },
                {
                    name: 'SpringBoot开发的个人博客项目',
                    role: '独立开发',
                    company: '自学项目',
                    describe: '一个简单的个人博客项目博客的浏览，查找，评论，以及后台对博客的管理等功能。',
                    time: '2021-04 ~ 2021-05',
                    techs: ['SpringBoot+JPA','Semantic-UI','MySQL']
                },
                {
                    name: '基于深度学习的卡通图片自动生成',
                    role: '负责人',
                    company: '省级大创项目',
                    describe: '使用AnimeGAN，UGATIT，white-box，styleGAN等深度学习技术完成了真实照片卡通化和二次元头像自动生成等功能，并成功完成多种深度学习模型的训练和以及Python后端部署，前端以微信小程序的形式进行展示等。',
                    time: '2020.09 ~ 2021.04',
                    techs: ['Python','小程序','GAN','PaddlePaddle']
                },
            ],
            scollOpacity: 0,
            timer: null,
            scrollTop: 0
        }
    },

    methods: {
        // 选择选项卡展示的信息
        selectTab(id){
            this.tabActiveId = id
        },

        // 发表评论
        publish() {
            let comment = {}
            comment.name = this.formData.name
            comment.content = this.formData.content
            this.commentList.unshift(comment)
        },

        // 实现平滑滚动
        scoll(id) {
            window.scrollTo({top: document.getElementById(id).offsetTop, behavior: 'smooth'})
        }
    }
}
</script>

<style scoped>
    body {
        margin: 0;
        padding: 0;
    }

    dl {
        margin: 0;
        padding: 0;
    }

    dl dd {
        margin: 0;
        padding: 0;
    }

    .container {
        width: 960px;
        /*background-color: rgba(0, 0, 0, 0.1);*/
        display: flex;
        justify-content: space-between;
        flex-shrink: 0;
        margin: auto;
        border-left: 1px solid black;
        border-right: 1px solid black;
    }

    .header {
        width: 100%;
        /*background-image: linear-gradient(135deg, #3C8CE7 10%, #00EAFF 100%);*/
        background-color: #3c8ce7;
    }

    .header .title {
        width: 960px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: auto;
        color: white;
    }

    .header .title .right-items {
        display: flex;
        align-items: center;
    }

    .web-font {
        font-size: 1.8em;
        margin: 10px 0;
    }

    .header .title .link {
        margin-right: 40px;
    }

    .header .title .link .link-item {
        margin-left: 10px;
        text-decoration: none;
        color: white;
    }

    .header .title .link .personal-introduce, .project-introduce {
        margin-right: 10px;
    }

    .header .title .link a:hover {
        color: #00EAFF;
        cursor: pointer;
    }

    .header .title img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 1px solid white;
    }

    .container .banner {
        width: 100%;
        background-color: #3c8ce7;
        /*background-image: linear-gradient(135deg, #3C8CE7 10%, #00EAFF 100%);*/
        color: white;
        /*background-color: rgba(179, 216, 255, 0.5);*/
        margin-top: 10px;
        padding: 10px;
        height: 160px;
    }

    .second .container .left-item {
        box-sizing: border-box;
        margin-top: 10px;
        margin-bottom: 10px;
        width: 240px;
        background-color: rgba(179, 216, 255, 0.5);
        text-align: center;
    }

    .second .container .title {
        text-align: center;
        background-color: #ccdef2;
        line-height: 36px;
        box-sizing: border-box;
    }

    .second .container .left-item .table {
        margin-top: 10px;
        display: flex;
        flex-wrap: wrap;
    }

    .second .container .left-item .table-td-l {
        padding-left: 20px;
        text-align: right;
        line-height: 20px;
        margin-right: 10px;
    }

    .second .container .left-item .table-td-r {
        text-align: left;
        margin-right: 10px;
    }

    .second .container .left-item .rect {
        width: 100px;
        height: 0.8em;
        margin-top: 5px;
        margin-bottom: 7px;
        background-image: linear-gradient(135deg, #3C8CE7 30%, #00EAFF 100%);
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .second .container .left-item .rect .tran {
        margin-right: -5px;
        width: 20%;
        height: 120%;
        background-color: #d9ebff;
    }

    .container .right-item {
        box-sizing: border-box;
        margin-top: 10px;
        margin-bottom: 10px;
        width: 710px;
        background-color: rgba(179, 216, 255, 0.5);
        border-left: 1px solid black;
        border-top: 1px solid black;
        border-bottom: 1px solid black;
    }

    .container .right-item .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-shrink: 1;
    }

    .container .right-item .tabs {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-shrink: 1;
    }

    .container .right-item .tab {
        line-height: 36px;
        text-align: center;
        flex-grow: 1;
        border-right: 1px solid black;
        border-bottom: 1px solid black;
        background-color: #d0dae5;
        width: 200px;
        box-sizing: border-box;
    }

    .container .right-item .tab:hover {
        cursor: pointer;
        background-color: #ccdef2;
    }


    .container .right-item .active {
        border-bottom: 1px solid #ccdef2;
        background-color: #ccdef2;
    }

    .container .right-item .tab-content {
        display: flex;
        padding: 20px;
        padding-left: 30px;
    }

    .container .right-item .tab-content .info {
        padding-left: 30px;
        width: 500px;
    }

    .container .right-item .tab-content .info div {
        margin-bottom: 5px;
    }

    .container .right-item .tab-place {
        border-bottom: 1px solid black;
        background-color: #d0dae5;
        padding: 8px;
        height: 20px;
        flex-grow: 2;
    }


    .project-item {
        width: 100%;
        display: flex;
    }

    #project dd:nth-child(odd) {
        background-color: rgba(179, 216, 255, 0.3);
    }

    #project .container {
        width: 960px;
        align-items: center;
        justify-content: flex-start;
    }

    #project .container .info {
        margin-right: 5px;
        flex-grow: 1;
    }

    #project .container .title {
        font-weight: bold;
    }

    #project .container .info-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    #project .container img {
        width: 100px;
        height: 100px;
        margin-right: 20px;
        margin-left: 5px;
        border: 1px solid #cccccc;
        margin-top: 40px;
    }

    #project .place {
        padding: 10px;
        margin: auto;
    }

    /*屏幕过小时不显示图片*/
    @media screen and (max-width: 1400px) {
        #project .place img {
            display: none;
        }
    }

    /*图片最大宽度为230px*/
    #project .place img {
        width: 70%;
        max-width: 230px;
        border: 1px solid #cccccc;
    }

    .hudong .container .left-item {
        margin-top: 10px;
        background-color: rgba(179, 216, 255, 0.3);
        width: 630px;
        height: 370px;
    }

    .hudong .container .left-item dl {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }


    .hudong .container .left-item .card {
        width: 150px;
        height: 180px;
        margin-bottom: 10px;
        background-color: #ccc;
        position: relative;
        overflow: hidden;
    }

    .hudong .container .left-item .card img {
        width: 100%;
        height: 100%;
    }

    .hudong .container .left-item .card .title {
        width: 100%;
        height: 25px;
        position: absolute;
        bottom: 0;
        background: rgba(0, 0, 0, 0.3);
        color: white;
    }

    .hudong .container .left-item .card .info {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 100%;
        height: 25px;
    }

    .hudong .container .left-item .card .info-description {
        width: 100%;
        word-wrap: break-word;
        text-decoration: none;
        color: white;
    }

    .hudong .container .left-item .card .info-description:hover {
        color: #00EAFF;
    }


    .hudong .container .left-item .card:hover img {
        -webkit-transform: scale(1.1);
        transition: all .6s;
        cursor: pointer;
    }

    .hudong .container .left-item .card:hover .title {
        height: 80px;
        transition: all .6s;
        cursor: pointer;
    }


    .hudong .container .left-item .card .info .heart {
        width: 50px;
        height: 50px;
        position: relative;
        display: block;
        background-image: url('../assets/about/heart.png');
        background-repeat: no-repeat;
        background-size: 2900%;
    }

    .heart2 {
        animation: mymoveOK .8s linear;
        animation-fill-mode: forwards;
        animation-timing-function: steps(28);
    }

    @keyframes mymoveOK {
        from {
            background-position: left;
        }
        to {
            background-position: right;
        }
    }

    .hudong .container .right-item {
        margin-top: 10px;
        background-color: rgba(179, 216, 255, 0.3);
        width: 320px;
        height: 370px;
        text-align: center;
    }

    .hudong .container .right-item .title {
        background-color: #ccdef2;
        text-align: center;
        padding: 8px;
        height: 20px;
        border-bottom: 1px solid black;
    }

    .hudong .container .right-item .comments dl {
        /*border-radius: 5px;*/
        height: 250px;
        overflow: auto;
        border-bottom: 1px solid black;
    }

    .hudong .container .right-item .comments dd {
        padding-left: 5px;
        padding-right: 5px;
        background: rgba(170, 189, 198, 0.5);
    }

    .hudong .container .right-item .comments dd:nth-child(even) {
        background: white;
        flex-direction: row-reverse;
    }

    .hudong .container .right-item .comment {
        display: flex;
        align-items: center;
        text-align: left;
    }


    .hudong .container .right-item .comments .avatar {
        background: #2c3e50;
        border-radius: 50%;
        text-align: center;
        color: white;
        width: 40px;
        line-height: 40px;
        margin: 5px;
        margin-right: 10px;
        flex-shrink: 0;
    }

    .hudong .container .right-item .comment-input {
        display: flex;
        flex-wrap: wrap;
    }

    .hudong .container .right-item .comment-input input {
        flex-grow: 1;
        margin: 5px;
    }

    .footer {
        width: 100%;
        background-image: linear-gradient(135deg, #717376 10%, #4d565f 100%);
        color: white;
        height: 150px;
        text-align: center;
        padding-top: 30px;
    }

    #back-top span {
        cursor: pointer;
        display: block;
        height: 250px;
        margin: -125px 0 0;
        overflow: hidden;
        padding: 0;
        position: fixed;
        right: 0;
        top: 80%;
        width: 149px;
        z-index: 11;
        background: url('../assets/about/rocket.png') no-repeat;
    }
</style>