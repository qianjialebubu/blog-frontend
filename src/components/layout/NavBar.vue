<template>
    <!--导航-->
    <el-header :class="{'navActive':scrollFlag}">
        <h2 class="logo">Hikari</h2>
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
        <div class="search_input" >
            <el-input
                    @focus="checkInput"
                    @blur="searching = false"
                    class="search"
                    placeholder="请输入内容"
                    prefix-icon="el-icon-search"
                    v-model="queryInfo.query"
                    size="mini">
            </el-input>
            <ul v-if="searching" >
                <li class="search-blog" v-for="blog in searchList" :key="blog.id"
                     @click="getBlogInfo(blog.id)">
                    <a>{{blog.title}}</a>
                </li>
            </ul>
        </div>

        <el-button v-if="login===false" @click="loginDialogFormVisible = true" size="mini" round type="primary" plain>
            点击登录
        </el-button>
        <el-dialog class="login_dialog" title="请登录" :visible.sync="loginDialogFormVisible" width="400px">
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
            scrollFlag:false,
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
            loginDialogFormVisible: false,
            // 表单数据绑定对象
            loginForm: {
                username: '',
                password: ''
            },
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
            }
        };
    },
    watch: {
        'queryInfo.query':{
            handler(value){
                if (this.timer){
                    clearTimeout(this.timer)
                }
                this.timer = setTimeout(() => {
                    this.searchBlog()
                },300)
            }
        }

    },
    mounted(){
        window.addEventListener('scroll',this.handleScroll)
    },
    methods: {
        resetLoginForm() {
            this.$refs.loginFormRef.resetFields()
            this.loginDialogFormVisible = false
        },
        userLogin() {
            this.$refs.loginFormRef.validate(async valid => {
                if (!valid) return;
                this.loginForm.password = this.$md5(this.loginForm.password )
                const {data: res} = await this.$blog.post('/login', this.loginForm);
                if (res.meta.status !== 200) return this.$message.error("登录失败")
                this.$message.success("登录成功")
                window.sessionStorage.setItem("token", res.data.token);
                this.$router.push("home")
            })
        },

        checkInput(){
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
            this.searchList = res.data.content.slice(0,5)
            if(this.searchList.length !== 0){
                // console.log(this.searchList)
                this.searching = true
            }
        },

        // 跳转到博客详情页
        getBlogInfo(blogId) {
            this.$router.push({path: '/blogInfo', query: {id: blogId}});
        },

        handleScroll(){
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            // console.log(scrollTop)
            this.scrollFlag = !!scrollTop;
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

    .navActive{
        opacity: 0.5;
    }

    .el-header{
        position: sticky;
        top: 0;
        z-index: 9999;
    }

    .search_input {
        position: relative;
        box-sizing: border-box;
    }


    .search_input ul{
        position: absolute;
        top: 30px;
        width: 100%;
        border: 1px solid #e5e9ef;
        margin-top: 1px;
        background: #fff;
        z-index: 99999;
        border-radius: 2px;
        box-shadow: 0 2px 4px rgba(0,0,0,.16);
        padding: 10px 0;
        font-size: 14px;
        box-sizing: border-box;
    }

    .search_input ul li{
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

    .search_input ul li:hover{
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
        background-color: #545c64;
        color: #fff;
        display: flex;
        padding-left: 50px;
        padding-right: 100px;
        justify-content: space-around;
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
            transform: scale(1.2);
            animation-name: example;
            animation-duration: 4s;
            cursor: pointer;
            transition: all .6s;
        }

        @keyframes example {
            0% {
                color: #ffd04b;
            }
            50% {
                color: yellow;
            }
            100% {
                color: #ffd04b;
            }
        }
    }


</style>