<template>
    <el-container>
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
                    <!--                        <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children" :key="subItem.id"-->
                    <!--                                      @click="saveNavState('/'+subItem.path)">-->
                    <!--                            <template slot="title">-->
                    <!--                                &lt;!&ndash;                图标&ndash;&gt;-->
                    <!--                                <i class="el-icon-menu"></i>-->
                    <!--                                &lt;!&ndash;                文本&ndash;&gt;-->
                    <!--                                <span>{{subItem.authName}}</span>-->
                    <!--                            </template>-->
                    <!--                        </el-menu-item>-->
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header>
                <div class="toggle-button" @click="toggleCollapse">|||
                </div>
                <div>
                    <span>博客后台管理系统</span>
                </div>
                <div>
                    <el-avatar :src="userInfo.avatar"/>
                    <el-button type="info" size="mini" plain @click="logout" style="margin-left: 5px">注销</el-button>
                </div>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    data() {
        return {
            menulist: [
                {id: 0, path: '/admin-index', authName: '后台首页'},
                {id: 1, path: '/blogs', authName: '博客管理'},
                {id: 2, path: '/users', authName: '个人中心'},
                {id: 3, path: '/blog-input', authName: '博客发表'},
                {id: 4, path: '/types', authName: '分类管理'},
                {id: 5, path: '/tags', authName: '标签管理'},
            ],
            iconsObj: {
                '0': 'el-icon-s-home',
                '1': 'iconfont icon-baobiao',
                '2': 'iconfont icon-tijikongjian',
                '3': 'iconfont icon-shangpin',
                '4': 'iconfont icon-danju',
                '5': 'iconfont icon-user'
            },
            isCollapse: false,
            // 被激活的动态地址
            activePath: '',
            userInfo:{}
        }
    },
    created() {
        // this.getMenuList()
        this.activePath = window.sessionStorage.getItem('activePath')
        this.userInfo = JSON.parse(window.sessionStorage.getItem('user'))
        console.log(this.userInfo)
    },
    methods: {
        logout() {
            window.sessionStorage.clear()
            this.$router.push('/login')
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
        background-color: #333744;
        color: #304156;
        text-align: center;
        line-height: 200px;
        /*默认有边框，会使右边对不齐，要去掉边框*/

        .el-menu {
            border: none;
        }
    }

    .el-main {
        background-color: #f0f2f5;
        color: #333;
        text-align: center;
    }

    /*.container {*/
    /*    height: 100%;*/
    /*}*/

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

</style>
