<template>
    <el-container>
        <el-timeline>
            <el-timeline-item timestamp="2018/4/12" placement="top">
                <el-card>
                    <h4>博客第一版发布啦</h4>
                    <el-image :src="pic"></el-image>
                </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2018/4/3" placement="top">
                <el-card>
                    <h4>更新 Github 模板</h4>
                    <p>王小虎 提交于 2018/4/3 20:46</p>
                </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2018/4/2" placement="top">
                <el-card>
                    <h4>更新 Github 模板</h4>
                    <p>王小虎 提交于 2018/4/2 20:46</p>
                </el-card>
            </el-timeline-item>
        </el-timeline>
    </el-container>
</template>

<script>
export default {
    data(){
        return {
            pic:  require('../assets/images/aboutme.jpeg'),
        }
    }
}
</script>

<style scoped lang="less">
    .el-container{
        width: 80%;
        margin: auto;
        align-items: center;
    }
    .el-timeline{
        width: 80%;
        margin-left: 40px;
        .el-image{
            width: 200px;
        }
    }
</style>