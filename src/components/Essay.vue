<template>
    <el-container>
        <el-timeline>
            <el-timeline-item v-for="essay in essayList" timestamp="2018/4/12" placement="top">
                <el-card style="letter-spacing: 1px">
                    <h2 v-if="essay.title">{{essay.title}}</h2>
                    <p v-if="essay.content">{{essay.content}}</p>
                    <el-image v-if="essay.image" :src="essay.image"></el-image>
                </el-card>
            </el-timeline-item>
        </el-timeline>
    </el-container>
</template>

<script>
export default {
    data() {
        return {
            essayList: []
        }
    },
    created() {
        this.getEssayList()
    },
    methods:{
        async getEssayList(){
            const {data: res} = await this.$blog.get('/essays')
            if (res.code === 200){
                this.essayList = res.data.sort((a, b) => {
                    return b.createTime.localeCompare(a.createTime)
                })
            }
        }
    }
}
</script>

<style scoped lang="less">

    .el-timeline {
        width: 80%;
        margin-left: 40px;

        .el-image {
            width: 200px;
        }
    }
</style>