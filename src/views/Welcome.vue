<template>
    <div>
        <NavBar></NavBar>
        <el-main>
            <router-view></router-view>
        </el-main>
        <Footer></Footer>
    </div>
</template>

<script>
import NavBar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";
export default {
    components: {Footer, NavBar},
}
</script>

<style scoped lang="less">
    .el-main{
        background-color: #f5f6f7;
        min-height: 450px;
    }
</style>
