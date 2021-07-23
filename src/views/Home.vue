<template>
    <el-container style="width: 100%;max-width: 100%;">
        <el-aside :width="isCollapse ? '64px' : '150px'">
            <el-menu
                    :default-active="activePath"
                    class="el-menu-vertical-demo" unique-opened :collapse="isCollapse"
                    :collapse-transition="false" router background-color="#333744" text-color="#fff"
                    active-text-color="#409FFF">
                <!--            一级菜单-->
                <el-menu-item :index="item.path" v-for="item in menulist" :key="item.id">
                    <i :class="iconsObj[item.id]"></i>
                    <span>{{item.authName}}</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <div style="width: 100%">
            <el-header>
                <div class="toggle-button" @click="toggleCollapse">|||
                </div>
                <div>
                    <span>博客后台管理系统</span>
                </div>
                <div class="loginInfo">
                    <el-avatar :src="userInfo.avatar"></el-avatar>
                    <div class="user-option">
                        <h3 class="web-font nickname">{{userInfo.nickname}}</h3>
                        <p class="logout" @click="logout">退出登录</p>
                    </div>
                </div>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </div>
    </el-container>
</template>

<script>
export default {
    data() {
        return {
            menulist: [
                {id: 0, path: '/admin/index', authName: '后台首页'},
                {id: 1, path: '/admin/blogs', authName: '博客管理'},
                {id: 2, path: '/admin/users', authName: '用户管理'},
                {id: 3, path: '/admin/blog-input', authName: '撰写博客'},
                {id: 4, path: '/admin/types', authName: '分类管理'},
                {id: 5, path: '/admin/tags', authName: '标签管理'},
                {id: 6, path: '/admin/comments', authName: '评论管理'},
                {id: 7, path: '/admin/essays', authName: '随笔管理'},
                {id: 8, path: '/admin/projects', authName: '项目管理'},
                {id: 9, path: '/admin/administrator', authName: '个人中心'},
                {id: 10, path: '/admin/pictures', authName: '图片管理'},
            ],
            iconsObj: {
                '0': 'el-icon-s-home',
                '1': 'iconfont icon-baobiao',
                '2': 'iconfont icon-tijikongjian',
                '3': 'iconfont icon-shangpin',
                '4': 'iconfont icon-danju',
                '5': 'iconfont icon-user',
                '6': 'iconfont icon-user',
                '7': 'iconfont icon-user',
                '8': 'iconfont icon-user',
                '9': 'iconfont icon-user',
                '10':'iconfont icon-user',
            },
            isCollapse: false,
            // 被激活的动态地址
            activePath: '',
            userInfo: {
                avatar: ''
            }
        }
    },
    created() {
        // this.getMenuList()
        this.activePath = window.sessionStorage.getItem('activePath')
        this.userInfo = JSON.parse(window.sessionStorage.getItem('user'))
        console.log("进入管理界面" + this.userInfo)
    },
    methods: {
        logout() {
            window.sessionStorage.clear()
            this.$store.commit('getUserInfo')
            this.$router.push('/')
        },

        toggleCollapse() {
            this.isCollapse = !this.isCollapse
        },
        saveNavState(activePath) {
            window.sessionStorage.setItem('activePath', activePath)
            this.activePath = activePath
        }
    },

}
</script>

<style lang="less" scoped>

    .el-header {
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
        -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
        border-bottom: 1px solid #d8dce5;
        background-color: white;
        color: #333;
        text-align: center;
        line-height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 20px;

        > div {
            display: flex;
            align-items: center;
        }

        img {
            height: 40px;
        }

        span {
            margin-left: 15px;
        }
    }

    .el-aside {
        transition: .2s;
        background-color: #333744;
        color: #304156;
        text-align: center;
        line-height: 200px;
        min-height: 100vh;
        /*默认有边框，会使右边对不齐，要去掉边框*/

        .el-menu {
            border: none;
        }
    }

    .el-main {
        background-color: #f0f2f5;
        color: #333;
        text-align: center;
        min-height: 100vh;
        /*overflow: visible;*/
    }

    .iconfont {
        margin-right: 10px;
    }

    .toggle-button {
        line-height: 20px;
        font-size: 10px;
        color: black;
        text-align: center;
        letter-spacing: 0.2em;
        cursor: pointer;
    }

    .loginInfo {
        flex-shrink: 0;
        color: white;
        height: 60px;
        border: none;
        width: 120px;
        position: relative;

        .el-avatar {
            width: 36px;
            height: 36px;
            margin: 0 auto;
            z-index: 3000;
        }

        .user-option {
            position: absolute;
            top: 60px;
            width: 150px;
            left: 50%;
            transform: translate(-50%, 0);
            font-size: 14px;
            text-align: center;
            line-height: 30px;
            background-color: #fff;
            opacity: 0;
            visibility: hidden;
            color: #333;
            box-shadow: 0 2px 6px 0 rgb(0 0 0 / 10%);
            border: 1px solid #eee;
            border-radius: 5px;
            z-index: 2000;
        }

        .logout {
            margin: 10px auto;
            padding: 0;
            width: 100%;
        }

        .logout:hover {
            background-color: #eee;
        }
    }

    .loginInfo:hover {
        cursor: pointer;

        .el-avatar {
            transform: translate(0, 50%) scale(1.5);
            transition: .3s;
        }

        .user-option {
            visibility: visible;
            opacity: 1;
            transition: .4s;
        }
    }

    @media screen and (max-width: 768px) {
        .el-aside{
            position: absolute;
            z-index: 2000;
            top: 60px;
            visibility: hidden;
            /*display: none;*/
        }

    }

</style>
