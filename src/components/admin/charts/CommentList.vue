<template>
  <el-table :data="commentlist" class="comment-list" style="width: 100%;padding-top: 15px;height: 450px;overflow: auto">
    <el-table-column label="最新评论">
      <template slot-scope="scope">
          <div class="user" style="display: flex;justify-content: space-between;align-items: flex-start;border-bottom: 1px solid #ccc">
            <div class="user" style="display: flex; justify-content: flex-start;align-items: center">
              <el-avatar size="small" :src="scope.row.avatar"></el-avatar>
              <div class="username" style="margin-left: 10px">{{ scope.row.nickname  }}</div>
            </div>
            <div><i class="el-icon-delete" @click="deleteCommentById(scope.row.id)"></i></div>
          </div>
        <div class="content" style="margin-left: 50px;margin-top: 5px">
          {{ scope.row.content}}
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {

  data() {
    return {
      editing: false,
      commentlist:[],
      title:'最新评论'
    }
  },
  created(){
    this.getCommentList()
  },
  methods: {
    async getCommentList(){
      const {data: res} = await this.$blog.get('/admin/getCommentList')
      console.log(res)
      this.commentlist = res.data
    },
    async deleteCommentById(id){
      const {data: res} = await this.$blog.get('/admin/deleteCommentById',{
        params: id
      })
    }
  }
}
</script>
