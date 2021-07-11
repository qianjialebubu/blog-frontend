<template>
    <div class="message">
        <el-upload
                class="upload-demo"
                drag
                action="http://127.0.0.1:8090/upload"
                multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <el-container>
            <div class="img" v-for="pic in picList">
                <el-image :src="pic"></el-image>
                {{pic}}
            </div>
        </el-container>

    </div>


</template>

<script>
export default {
    data() {
        return {
            picList: []
        }
    },
    created(){
        this.getAllPicList()
    },
    methods: {
        async getAllPicList(){
            const {data: res} = await this.$picture.get('/pic_paths/get_all/')
            console.log(res)
            this.picList = res
        }
    },
}
</script>

<style scoped lang="less">
    .img{
        width: 300px;
        margin: 20px;
    }
</style>