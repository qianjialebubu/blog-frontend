<template>
    <el-dialog class="login_dialog" title="请登录" :visible.sync="visiable" width="400px" center>
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
            <el-form-item style="text-align: right">
                <el-button @click="resetLoginForm">取消</el-button>
                <el-button type="primary" @click="userLogin">登录</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>

export default {
    props: ['vis'],
    data() {
        return {
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
            },
            visiable: false
        }
    },
    watch:{
       'vis':{
           handler(value){
               this.visiable = value
           }
       }
    },
    methods: {
        resetLoginForm() {
            this.$refs.loginFormRef.resetFields()
            this.$emit('cancel')
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
                window.sessionStorage.setItem("token", res.data.token);
                window.sessionStorage.setItem("user", JSON.stringify(res.data.user));
                this.$emit('login')
                this.$emit('cancel')
            })
        },
    }
}
</script>

<style lang="less" scoped>


    .login_form {
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
    }

    .btns {
        display: flex;
        justify-content: flex-end;
    }

    .login_dialog{
        opacity: 1;
    }

</style>
