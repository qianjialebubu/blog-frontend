<template>
    <!--导航-->
    <el-header :style="'margin-bottom:'+ headerBottom +'px'" class="animate__animated animate__fadeIn"
               :class="{'navActive':scrollFlag}">
        <h2 class="animate__animated animate__swing logo" :key="shade" @click="shade++">Hikari</h2>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal"
                 background-color="#545c64" router text-color="#fff" active-text-color="#ffd04b">
            <el-menu-item :index="'/'+item.path" v-for="item in menulist" :key="item.id">
                <template slot="title">
                    <!--                图标-->
                    <i :class="iconsObj[item.id]"></i>
                    <!--                文本-->
                    <span>{{item.authName}}</span>
                </template>
            </el-menu-item>
        </el-menu>
        <div v-if="menuHiddenVisiable">
            <el-menu :default-active="activeIndex" class="animate__animated animate__fadeInDown el-menu-hidden"
                     background-color="#545c64" router text-color="#fff" active-text-color="#ffd04b">
                <el-menu-item :index="'/'+item.path" v-for="item in menulist" :key="item.id">
                    <template slot="title">
                        <!--                图标-->
                        <i :class="iconsObj[item.id]"></i>
                        <!--                文本-->
                        <span>{{item.authName}}</span>
                    </template>
                </el-menu-item>
            </el-menu>
        </div>

        <div class="menu-expend"  @click="menuExpend">
            <i class="el-icon-menu"></i>
        </div>
        <div class="search_input">
            <el-input
                    @focus="checkInput"
                    @blur="searching = false"
                    class="search"
                    placeholder="请输入内容"
                    prefix-icon="el-icon-search"
                    v-model="queryInfo.query"
                    size="mini">
            </el-input>
            <ul v-if="searching">
                <li class="animate__animated animate__fadeInDown search-blog" v-for="blog in searchList" :key="blog.id"
                    @click="getBlogInfo(blog.id)">
                    <a>{{blog.title}}</a>
                </li>
            </ul>
        </div>

        <el-button v-if="userInfo===null" @click="loginDialogFormVisible = true" size="mini" round type="primary" plain>
            点击登录
        </el-button>
        <div v-else class="loginInfo">
            <el-avatar :src="userInfo.avatar"></el-avatar>
            <div class="user-option">
                <h3 class="web-font nickname">{{userInfo.nickname}}</h3>
                <p v-if="userInfo.type === 1" class="logout" @click="manageBlog">管理博客</p>
                <p class="logout" @click="logout">退出登录</p>
            </div>
        </div>
        <el-dialog class="login_dialog" title="请登录" :visible.sync="loginDialogFormVisible" width="400px" center>
            <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" class="login_form">
                <!--        用户名-->
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user">
                    </el-input>
                </el-form-item>
                <!--        密码-->
                <el-form-item prop="password">
                    <el-input type="password" v-model="loginForm.password"
                              prefix-icon="iconfont icon-3702mima"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetLoginForm">取消</el-button>
                <el-button type="primary" @click="userLogin">登录</el-button>
            </div>
        </el-dialog>
    </el-header>
</template>

<script>

export default {

    data() {
        return {
            queryInfo: {
                query: '',
                timer: null
            },
            shade:0,
            scrollFlag: false,
            searchList: [],
            searching: false,
            activeIndex: '1',
            menulist: [
                {
                    id: 1,
                    authName: '首页',
                    path: 'index'
                },
                {
                    id: 2,
                    authName: '随笔',
                    path: 'essay'
                },
                {
                    id: 3,
                    authName: '项目',
                    path: 'project'
                },
                {
                    id: 4,
                    authName: '留言',
                    path: 'message'
                },
                {
                    id: 5,
                    authName: '关于我',
                    path: 'about'
                },
            ],
            iconsObj: {
                '1': 'iconfont icon-user',
                '2': 'iconfont icon-tijikongjian',
                '3': 'iconfont icon-shangpin',
                '4': 'iconfont icon-danju',
                '5': 'iconfont icon-baobiao',
                '6': 'iconfont icon-baobiao',
                '7': 'iconfont icon-baobiao'
            },
            isCollapse: false,
            login: false,
            userInfo: {
                avatar: '',
                type: -1
            },
            loginDialogFormVisible: false,
            // 表单数据绑定对象
            loginForm: {
                username: '',
                password: ''
            },
            administrator: false,
            menuHiddenVisiable: false,
            // 表单验证规则对象
            loginFormRules: {
                // 验证用户是否合法
                username: [
                    // 必填，提示消息，鼠标焦点消失时触发
                    {required: true, message: "请输入用户名", trigger: "blur"},
                    {min: 2, max: 10, message: "长度在2-10个字符之间"}
                ],
                // 验证密码是否合法
                password: [
                    {required: true, message: "请输入密码", trigger: "blur"},
                    {min: 6, max: 10, message: "长度在 6 到 10 个字符", trigger: "blur"}
                ]
            },
            headerBottom: 0
        };
    },
    watch: {
        'queryInfo.query': {
            handler(value) {
                if (this.timer) {
                    clearTimeout(this.timer)
                }
                this.timer = setTimeout(() => {
                    this.searchBlog()
                }, 300)
            }
        }
    },

    mounted() {
        window.addEventListener('scroll', this.handleScroll)
        this.userInfo = JSON.parse(window.sessionStorage.getItem('user'))
    },
    methods: {
        resetLoginForm() {
            this.$refs.loginFormRef.resetFields()
            this.loginDialogFormVisible = false
        },
        // 用户登录
        userLogin() {
            this.$refs.loginFormRef.validate(async valid => {
                if (!valid) return;
                let username = this.loginForm.username
                let password = this.$md5(this.loginForm.password)
                const {data: res} = await this.$blog.post('/login', {
                    username: username,
                    password: password
                });
                if (res.code !== 200) return this.$message.error("登录失败")
                console.log(res)
                this.loginDialogFormVisible = false
                this.$refs.loginFormRef.resetFields()
                this.$message({message: '登录成功', type: 'success', customClass: 'zZindex', offset: 80});
                this.userInfo = res.data.user
                // 如果该用户是管理员，显示跳到后台管理的按钮
                if (this.userInfo.type === 1){
                    this.administrator = true
                }
                this.login = true
                window.sessionStorage.setItem("token", res.data.token);
                window.sessionStorage.setItem("user", JSON.stringify(res.data.user));
            })
        },

        checkInput() {
            this.searching = this.queryInfo.query !== '';
        },

        async searchBlog() {
            if (this.queryInfo.query === '') {
                this.searching = false
                return
            }
            const {data: res} = await this.$blog.get('/search', {
                params: this.queryInfo
            })
            // console.log(res.data.content)
            this.searchList = res.data.content.slice(0, 5)
            if (this.searchList.length !== 0) {
                // console.log(this.searchList)
                this.searching = true
            }
        },

        // 跳转到博客详情页
        getBlogInfo(blogId) {
            this.$router.push({path: '/blogInfo', query: {id: blogId}});
        },

        handleScroll() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            // console.log(scrollTop)
            this.scrollFlag = !!scrollTop;
        },
        // 注销登录
        logout() {
            window.sessionStorage.clear()
            this.userInfo = null
            this.login = false
            this.$message({message: '退出登录成功', type: 'success', customClass: 'zZindex', offset: 80});
        },
        // 进入管理界面
        manageBlog() {
            this.$router.push('/admin')
        },
        // 展开菜单栏
        menuExpend() {
            console.log("展开")
            this.menuHiddenVisiable = !this.menuHiddenVisiable
            if (this.menuHiddenVisiable === true){
                this.headerBottom = 280
            } else {
                this.headerBottom = 0
            }
        }
    }
}
</script>

<style>

    .search input.el-input__inner {
        background-color: rgba(0, 0, 0, 0.1);
        /*border-radius: 20px;*/
        color: #cccccc;
    }
</style>

<style scoped lang="less">
    .navActive {
        opacity: 0.5;
    }

    .el-header{
        transition: .9s;
    }

    .search_input {
        position: relative;
        box-sizing: border-box;
    }


    .search_input ul {
        position: absolute;
        top: 30px;
        width: 100%;
        border: 1px solid #e5e9ef;
        margin-top: 1px;
        background: #fff;
        z-index: 10000;
        border-radius: 2px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .16);
        padding: 10px 0;
        font-size: 14px;
        box-sizing: border-box;
    }

    .search_input ul li {
        padding: 0 16px;
        height: 32px;
        line-height: 32px;
        cursor: pointer;
        word-wrap: break-word;
        word-break: break-all;
        display: block;
        color: #222;
        position: relative;
        /*transition: .2 ease;*/
    }

    .search_input ul li:hover {
        background-color: #e8f3ff;
    }


    .search-blog {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        padding-left: 20px;
        padding-right: 20px;
    }

    .el-header {
        width: 100%;
        position: sticky;
        top: 0;
        z-index: 9999;
        background-color: #545c64;
        color: #fff;
        display: flex;
        padding-left: 50px;
        padding-right: 50px;
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

        .el-menu {
            flex-shrink: 0;
        }

        .logo {
            color: #ffd04b;
        }

        .logo:hover {
            cursor: pointer;
        }

    }

    .loginInfo {
        flex-shrink: 0;
        background-color: #545c64;
        color: white;
        height: 60px;
        border: none;
        width: 120px;
        position: relative;

        .el-avatar {
            width: 36px;
            height: 36px;
            margin: 0 auto;
            z-index: 200;
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
            visibility: hidden;
            opacity: 0;
            color: #333;
            box-shadow: 0 2px 6px 0 rgb(0 0 0 / 10%);
            border: 1px solid #eee;
            border-radius: 5px;
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
            transition: opacity .4s;
        }
    }

    .zZindex {
        margin-top: 300px;
        padding-top: 100px;
    }

    .menu-expend {
        display: none !important;
    }

    .el-menu-hidden {
        /*display: none;*/
        position: absolute;
        top: 60px;
        left: 0;
        border-top: 1px solid #ccc;
        border-right: none;
        width: 100%;

        .el-menu-item {
            border-bottom: 1px solid #ccc;
        }
    }

    @media screen and (max-width: 1000px) {
        .search_input {
            visibility: hidden;
        }
    }

    @media screen and (max-width: 768px) {
        .el-menu-demo {
            display: none;
        }

        .menu-expend {
            display: block !important;
            position: fixed;
            top: 18px;
            left: 150px;
        }

        .menu-expend:hover {
            color: #ffd04b;
            cursor: pointer;
        }
    }

</style>