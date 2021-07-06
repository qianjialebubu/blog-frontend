<template>
    <div>
        <!--    面包屑导航区-->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>博客发表</el-breadcrumb-item>
        </el-breadcrumb>
        <mavon-editor v-model="value"/>

    </div>
</template>

<script>
export default {
    name: "Blog_input"
}
</script>

<style scoped>

</style>