<template>
  <div class="box">
    <aside class="animate__animated animate__bounceInLeft sidebar">
      <div class="avatar">
        <img src="http://hikari.top/images/17a0dd9a-4898-413e-898e-678e2be068fa.png" title="Hikari">
      </div>
      <nav class="nav">
        <a v-for="intro in introduceList" @click="showSection(intro.name)">{{intro.title}}</a>
      </nav>
    </aside>
    <main>
      <section class="animate__animated animate__fadeInRight" v-if="showSectionId === '#info'" id="info">
        <div class="wrap">
          <h2 class="title">个人资料</h2>
          <el-row :gutter="20" class="row">
            <el-col :sm="8" :xs="24" class="col-l-4">
              <p>姓名：Hikari</p>
              <p>性别：女</p>
              <p>年龄：22</p>
              <p>学历：本科</p>
              <p>QQ：2569757226</p>
              <p>身高：168cm</p>
              <p>体重：52kg</p>
              <p>血腥：O型</p>
            </el-col>
            <el-col :sm="16" :xs="24" class="col-l-4">
              <p>出生日期：1999-03-20</p>
              <p>学校：XXXX大学</p>
              <p>专业：计算机科学与技术</p>
              <p>绩点：3.84 / 4</p>
              <p>英语水平：六级</p>
              <p>码云仓库：<a href="https://github.com">https://gitee.com/tyoubin_admin</a></p>
              <p>CSDN博客：<a href="https://blog.csdn.net/weixin_44996854">https://blog.csdn.net/weixin_44996854</a></p>
              <p>邮箱：<a href="mailto:2569757226@qq.com">2569757226@qq.com</a></p>
            </el-col>
<!--            <el-col :sm="9" :xs="24" class="col-l-4">-->
<!--              <p>兴趣爱好：网球，跑步，二次元，日语</p>-->
<!--              <p>计算机专业大三学生，目前正在学习前端开发技术</p>-->
<!--            </el-col>-->
          </el-row>
        </div>
      </section>
      <section class="animate__animated animate__fadeInRight" v-show="showSectionId === '#skills'" id="skills">
        <div class="wrap">
          <h2 class="title">掌握的技能</h2>
          <el-row :gutter="40" class="row scrollable">
            <el-col :sm="8" :xs="24" class="center-fixed">
              <div class="skills-icon">
                <i class="fa fa-html5">
                  1
                </i>
              </div>
              <div class="skills-title">
                <h3>HTML5</h3>
                <p>熟悉 HTML5 网站的架构和开发</p>
              </div>
            </el-col>
            <el-col :sm="8" :xs="24" class="center-fixed">
              <div class="skills-icon">
                <i class="fa fa-css3"></i>
              </div>
              <div class="skills-title">
                <h3>CSS3</h3>
                <p>熟悉使用 CSS3 写响应式网站、动画等</p>
              </div>
            </el-col>
            <el-col :sm="8" :xs="24" class="center-fixed">
              <div class="skills-icon">
                <i class="fa fa-code"></i>
              </div>
              <div class="skills-title">
                <h3>JavaScript</h3>
                <p>能使用 JS 制作简单的程序、交互与后端数据的获取</p>
              </div>
            </el-col>
            <el-col :sm="8" :xs="24" class="center-fixed">
              <div class="skills-icon">
                <i class="fa fa-code"></i>
              </div>
              <div class="skills-title">
                <h3>Vue</h3>
                <p>熟悉Vue的开发流程，能够使用Vue框架开发完整项目</p>
              </div>
            </el-col>
            <el-col :sm="8" :xs="24" class="center-fixed">
              <div class="skills-icon">
                <i class="fa fa-html5">
                  1
                </i>
              </div>
              <div class="skills-title">
                <h3>Java</h3>
                <p>熟悉Java语言的基本使用，能使用SpringBoot进行后端开发</p>
              </div>
            </el-col>
            <el-col :sm="8" :xs="24" class="center-fixed">
              <div class="skills-icon">
                <i class="fa fa-css3"></i>
              </div>
              <div class="skills-title">
                <h3>计算机专业基础</h3>
                <p>熟悉基本的数据结构，算法，计算机网络等相关知识</p>
              </div>
            </el-col>
          </el-row>
        </div>
      </section>
      <section class="animate__animated animate__fadeInRight" v-show="showSectionId === '#works'" id="works">
        <div class="wrap">
          <h2 class="title">个人作品</h2>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="12"  v-for="work in workList" :key="work.id">
              <div class="works-item">
                <el-image :src="work.pic_url"  />
                <p>{{work.name}}</p>
              </div>
            </el-col>
<!--            <el-col :xs="24" :sm="12">-->
<!--              <div class="works-item">-->
<!--                <img src="" bk-image="active">-->
<!--                <p>Vue商城管理系统</p>-->
<!--              </div>-->
<!--            </el-col>-->
<!--            <el-col :xs="24" :sm="12">-->
<!--              <div class="works-item">-->
<!--                <img src="static/img/works/dream.jpg" bk-image="active">-->
<!--                <p>梦想主题班会</p>-->
<!--              </div>-->
<!--            </el-col>-->
<!--            <el-col :xs="24" :sm="12">-->
<!--              <div class="works-item">-->
<!--                <img src="static/img/works/kico-style.jpg" bk-image="active">-->
<!--                <p>Kico Style 响应式框架</p>-->
<!--              </div>-->
<!--            </el-col>-->
<!--            <el-col :xs="24" :sm="12">-->
<!--              <div class="works-item">-->
<!--                <img src="static/img/works/robots.jpg" bk-image="active">-->
<!--                <p>小缤机器人</p>-->
<!--              </div>-->
<!--            </el-col>-->
          </el-row>
        </div>
      </section>
      <section class="animate__animated animate__fadeInRight" v-show="showSectionId === '#hobbys'" id="hobbys">
        <div class="wrap">
          <h2 class="title">个人经历</h2>
          <div class="row">
            <div class="col-m-8">
              <ul class="timeline">
                <li>2016.07.03：创立缤奇（Binkic）团队</li>
                <li>2016.12.20：仿照某动漫官网编写模板，并搭建运营了一个动漫型社区</li>
                <li>2017.05.30：带领团队进行招新，并发起了首个游戏项目：<a>色块冲刺</a></li>
                <li>2017.08.17：为团队制作了首部宣传片：<a href="javascript:;" target="_blank">创意可以改变什么</a></li>
                <li>2017.12.08：个人编写的前端响应式框架 <a href="javascript:;" target="_blank">Kico Style</a> 初现雏形</li>
                <li>2018.03.01：基于 Kico Style 的第一个原创 <a href="javascript:;" target="_blank">缤奇团队官网</a> 正式上线</li>
                <li>2018.04.27：使用前端技术编写的 <a href="javascript:;" target="_blank">梦想晨会</a> 制作完成</li>
                <li>2018.06.07：参加“众创杯”创业大赛校园选拔赛，团队项目荣获三等奖</li>
                <li>2018.06.17：动漫门户网站制作完成，内含一个自己设计的简单音乐播放器</li>
                <li>2018.06.25：参加全国中职信息技术技能大赛微网站项目，荣获一等奖</li>
                <li>2018.08.03：原创博客主题 <a href="javascript:;" target="_blank">Single</a> 发布，截至 2 月共有 66 Stars</li>
                <li>2018.09.19：个人编写的播放器 <a href="javascript:;" target="_blank">Kico Player</a> 发布测试版</li>
                <li>2018.12.12：基于 ES6 的时钟小工具 <a href="javascript:;" target="_blank">Kico Tools</a> 发布测试版</li>
                <li>2018.12.18：第一个基于 PHP 的个人首页 <a href="javascript:;" target="_blank">Sweet</a> 发布正式版</li>
                <li>2019.01.01：缤奇团队新<a href="javascript:;" target="_blank">官网</a>正式上线，后端采用 Typecho 驱动</li>
                <li>2019.02.16：结合前后端制作了一个春节的<a href="javascript:;" target="_blank">问答红包</a>，使用正则判断答案</li>
              </ul>
            </div>
            <div class="col-m-4 center-fixed">
              <img src="static/img/story.png" bk-image="active">
            </div>
          </div>
        </div>
      </section>
      <section class="animate__animated animate__fadeInRight" v-show="showSectionId === '#summary'" id="team">
        <div class="wrap">
          <h2 class="title">我的团队</h2>
          <div class="row">
            <div class="col-m-6">
              <p>我的团队 -
                缤奇团队由一群热爱科技创新的年轻人所组成，做到了“实际”与“创新”的结合。奇思妙想不乏真正落实。集思广益，生动有趣的创意，尽在缤奇。缤奇团队如今有超过30名成员，各个部门互帮互助，同为一个目标而努力进取着。</p>
              <p>缤奇团队致力于开发原创游戏、动漫等项目。目前我们已完成项目有手机游戏“色块冲刺”、聊天娱乐项目“小缤机器人”等。正在创作项目有解密游戏“月亮湖的秘密”、VR 项目“梦想码头”等。缤奇官网 &amp;
                社区已陆续开放。网站采用团队成员自主编写的 CSS3 自适应框架，针对移动设备有布局优化，缤奇团队有着丰富的网站建设技术能力、有独立的画师以及文编。</p>
              <p>团队官网：<a href="http://www.wangdahai.cn">http://www.wangdahai.cn</a></p>
            </div>
            <div class="col-m-6 center">
              <img src="static/img/team.png" bk-image="active">
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showSectionId: '#info',
      introduceList: [
        {
          id: 0,
          title: '资料',
          name: '#info'
        },
        {
          id: 1,
          title: '技能',
          name: '#skills'
        },
        {
          id: 2,
          title: '作品',
          name: '#works'
        },
        {
          id: 3,
          title: '爱好',
          name: '#hobbys'
        },
        {
          id: 4,
          title: '评价',
          name: '#summary'
        },
      ],
      workList:[
        {
          id:0,
          name:'个人博客',
          pic_url:'http://hikari.top/images/343142d0-8c6d-4749-989c-fca4f2019185.jpg'
        },
        {
          id:1,
          name:'Vue商城管理系统',
          pic_url:'http://hikari.top/images/8109e106-b876-4679-bf75-407632e8caaa.jpg'
        },
        {
          id:2,
          name:'移动Web餐厅小游戏',
          pic_url:'http://hikari.top/images/86c0d3a1-77a0-47ce-ba70-042c0b6118e8.png',
        },
        {
          id:3,
          name:'高级个人简历',
          pic_url:'http://hikari.top/images/86c0d3a1-77a0-47ce-ba70-042c0b6118e8.png'
        },
      ]
    }
  },

  methods: {
    showSection(name) {
      this.showSectionId = name
    }
  }
}
</script>

<style scoped lang="less">
  body {
    height: 100vh;
    overflow: hidden;
  }

  .box {
    width: 100%;
    height: 100vh;
    position: relative;
  }

  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    color: #fff;
    width: 250px;
    height: 100%;
    overflow: hidden;
    overflow-y: auto;
    background: rgba(75, 75, 75, 0.9);

    nav {
      margin: 0;
      display: flex;
      list-style: none;
      flex-direction: column;

      a {
        font: 16px/1.5 'Microsoft Yahei', 'PingFang SC', 'Hiragino Sans GB', sans-serif;
        list-style: none;
        box-sizing: border-box;
        text-decoration: none;
        color: #fff;
        padding: 1em;
        display: block;
        text-align: center;
        transition: background .3s, box-shadow .3s;
      }

      a:hover {
        background: rgba(60, 60, 60, 1);
      }
    }

    .avatar {
      width: 140px;
      height: 140px;
      margin: 1em auto;
      margin-top: 5em;
      background: #fff;
      border-radius: 100%;
      border: #fff 5px solid;
      transition: transform 0.5s;

      img {
        width: 100%;
        border-radius: 50%;
        /*transition: .6s;*/
      }

      img:hover {
        transform: rotate(360deg);
        transition: all 1.5s;
      }
    }
  }

  main {
    color: #353535;
    font: 16px/1.5 'Microsoft Yahei', 'PingFang SC', 'Hiragino Sans GB', sans-serif;
    box-sizing: border-box;
    margin-left: 250px;

    section {
      top: 50%;
      transform: translateY(-50%);
      position: relative;
      background-color: rgba(255, 255, 255, 0.8);
      border: 3px dashed rgba(0, 0, 0, 0.3);
      border-radius: 20px;
      padding: 20px;

      a{
        text-decoration: none;
      }
    }

    section:before {
      content: '';
      position: absolute;
      width: 0;
      height: 0;
      border-right: 20px solid rgba(0, 0, 0, 0.3);
      border-top: 20px solid transparent;
      border-bottom: 20px solid transparent;
      top: 50%;
      transform: translateY(-50%);
      left: -20px;
    }

    #info {

      .warp {

        .row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
    }

    #skills {
      .center-fixed {
        text-align: center;
        display: flex;
        flex-direction: column;

        .skills-icon {
          width: 100px;
          height: 100px;
          margin: 0 auto;
          background: #fff;
          border-radius: 100%;
          box-shadow: 0 5px rgba(0, 0, 0, 0.3);

          i {
            font-size: 50px;
            line-height: 100px;
            transition: all 1s;
          }

          .fa-html5 {
            content: "\f13b";
          }
        }

        .skills-icon:hover {
          i {
            transform: rotate(180deg);
            transition: all 1s;
          }
        }

      }

    }
    #works{
      .works-item{
        background-color: white;
        text-align: center;
        border-radius: 5px;
        .el-image{
          max-width: 100%;
          max-height: 180px;
          border-radius: 5px 5px 0 0;
          box-shadow: 0 0 2px 0 #ccc;
        }
        p{
          margin-top: 0;
          color: #303133;
        }
      }
    }
  }


</style>