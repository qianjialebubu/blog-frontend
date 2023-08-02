<template>
  <div>
    <!--    面包屑导航区-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>友链管理</el-breadcrumb-item>

    </el-breadcrumb>
    <el-card shadow="never">
      <el-row :gutter="5">
        <el-col :span="8">
          <el-input placeholder="请输入博客名称或者备注" v-model="search"></el-input>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="searchFriend()">查找链接</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="addFriend()" >新增链接</el-button>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="clearSearchFriend()">清空搜索</el-button>
        </el-col>
      </el-row>

      <el-table :data="FriendsList">

        <el-table-column type="index"></el-table-column>
        <el-table-column label="博客名称" prop="blogName" align="center"></el-table-column>
        <el-table-column label="链接" prop="link" align="center">
          <template slot-scope="scope">
            <a :href="scope.row.link" target="_blank" class="buttonText">{{scope.row.link }}</a>
          </template>
<!--          <template slot-scope="scope">-->
<!--            <a :href="scope.row.link" target="_blank" class="buttonText">{{scope.row.link}}</a>-->
<!--          </template>-->
        </el-table-column>
        <el-table-column label="添加时间" prop="createTime" min-width="100px" align="center">
          <template slot-scope="scope">{{scope.row.createTime | dataFormat }}</template>
        </el-table-column>
        <el-table-column label="是否显示" min-width="70px">
          <template slot-scope="scope">
            <el-switch active-value="1" inactive-value="0" v-model="scope.row.state" :disabled="userInfo.id== scope.row.id || scope.row.id == 1"
                       @change="FriendStateChanged(scope.row)">

            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="备注" prop="note" align="center" ></el-table-column>
        <el-table-column label="操作" width="240px" align="center">

          <template slot-scope="scope">
            <!--            修改按钮-->
            <el-button
                type="warning"
                circle
                icon="el-icon-edit"
                size="mini"
                @click="FriendChanged(scope.row)"

            >

            </el-button>
            <el-button size="mini" circle type="danger" icon="el-icon-delete"
                       @click="deleteFriend(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="pagesize"
          :current-page="pagenum"
          :layout="pagLayout"
          :total="totalcount"
          style="text-align: center">
      </el-pagination>

    </el-card>

    <el-dialog title="友链修改" :visible.sync="createFriendDialogFormVisible">
      <el-form style="text-align: left" ref="createTypeFormRef" :model="Friend"
                label-width="80px">
        <el-form-item label="博客名称" prop="blogName">
          <el-input v-model="Friend.blogName"></el-input>
        </el-form-item>
        <el-form-item label="链接" prop="link">
          <el-input v-model="Friend.link"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="backPage">取消</el-button>
        <el-button type="primary" @click="createFriend">提交</el-button>
      </div>
    </el-dialog>

    <el-dialog title="友链新增" :visible.sync="addFriendDialogFormVisible">
      <el-form style="text-align: left" ref="addTypeFormRef" :model="Friend"
               label-width="80px">
        <el-form-item label="博客名称" prop="blogName">
          <el-input v-model="Friend.blogName"></el-input>
        </el-form-item>
        <el-form-item label="链接" prop="link">
          <el-input v-model="Friend.link"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="link">
          <el-input v-model="Friend.note"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="link">
          <el-input v-model="Friend.state"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="backPage">取消</el-button>
        <el-button type="primary" @click="insertFriend">提交</el-button>
      </div>


    </el-dialog>
  </div>

</template>

<script>
import {mapState} from 'vuex'
export default {
  data() {
    return {
      FriendsList: [],
      FriendsPageList:[],
      search: '',
      Friend:{
        id:null,
        blogName:'',
        link:'',
        createTime:'',
        note:'',
        state:''
      },
      page:{
        pagenum:this.pagenum,
        pagesize:this.pagesize,

      },
      pagenum: 1,
      pagesize: 8,
      totalcount: 0,

      createFriendForm:{
        blogName: '',
        link: '',
        id:null
      },
      addTypeFormRef:{

      },
      createFriendDialogFormVisible:false,
      addFriendDialogFormVisible:false
    }
  },
  computed:{
    pagLayout(){
      if (this.screenWidth<768){
        return 'prev, pager, next'
      } else {
        return 'total, prev, pager, next, jumper'
      }
    },
    ...mapState([
      'userInfo',
    ])
  },
  created() {
    this.getFriendList()
    this.getPageFriendsList(this.page)
    // this.FriendsList=this.FriendsPageList
    this.refreshPage()
  },
  methods: {
    baidu(){
      window.open('https://www.baidu.com')
    },
    //刷新分页页面
    refreshPage(){
      this.page.pagenum=this.pagenum
      this.page.pagesize=this.pagesize
      this.getPageFriendsList(this.page)
      this.FriendsList=this.FriendsPageList
    },
    async getPageFriendsList(page){
      const {data: res} = await this.$blog.post('/admin/friend/getPageFriendsList',{
        page
      })
      this.FriendsPageList=res.data
      this.FriendsList=this.FriendsPageList
    },
    // 修改当前页码
    handleCurrentChange(newSize) {
      this.pagenum = newSize
      this.refreshPage()
    },
    // 修改当前页大小
    handleSizeChange(newSize) {
      this.pagesize = newSize
    },

    async clearSearchFriend(){
      this.search=''
      this.getFriendList()
      this.refreshPage()
    },
    async addFriend(){
      this.addFriendDialogFormVisible=true
    },
    async getFriendList() {
      // const {data: res} = await this.$blog.get('users');
      const {data: res} = await this.$blog.get('/admin/friend/getFriendList')

      this.FriendsList=res.data
      if (res.code === 200) {
        if (this.search !== '') {
          let st = this.search
          let reg = RegExp(st)
          res.data = res.data.filter((item) => {
            return reg.test(item.blogName) || reg.test(item.note)
          })
        }
        // this.FriendsPageList(this.page)
        this.FriendsList = res.data
        this.totalcount=this.FriendsList.length
        // this.$message.success("获取友链信息成功！")
      } else {
        this.$message.error("获取友链信息失败！")
      }
    },
    searchFriend() {
      // console.log(this.search)
      this.getFriendList()
    },
    // 修改用户权限
    async FriendStateChanged(row) {
      const {data: res} = await this.$blog.post('/admin/friend/createFriend', {
        Friend: row

      });
      if (res.code !== 200) return this.$message.error("修改状态失败")
      this.$message.success("修改状态成功")

    },
    backPage(){
      this.createFriendDialogFormVisible = false
      this.addFriendDialogFormVisible = false
    },
    //修改友链,主要是修改友链中的名称和链接
    async FriendChanged(row){

      this.Friend = row
      this.Friend.blogName=row.blogName
      this.Friend.link = row.link
      this.createFriendDialogFormVisible = true

    },

    //修改友链
    async createFriend(){
      const {data:res} =await this.$blog.post('/admin/friend/createFriend', {
        Friend: this.Friend
      })
      this.createFriendDialogFormVisible = false
      // this.pagenum = 2
      // this.refreshPage()

    },
    //新增友链
    async insertFriend(){
      const {data:res} =await this.$blog.post('/admin/friend/insertFriend', {
        Friend: this.Friend
      })

      // this.getFriendList()
      this.getPageFriendsList(this.page)
      this.backPage()
      this.Friend.state=''
      this.Friend.note=''
      this.Friend.blogName=''
      this.Friend.link=''
      this.pagenum = Math.floor((this.totalcount+1)/this.pagesize)+1
      // this.getFriendList()
      // alert(this.pagenum)
      // this.refreshPage()
      this.handleCurrentChange(this.pagenum)
    },


    // 删除用户
    async deleteFriend(id) {
      // 弹出对话框
      const confirmResult = await this.$confirm(
          '此操作将永久删除该链接, 是否继续',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
      ).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      const {data: res} = await this.$blog.get(`/admin/friend/${id}/delete`)
      if (res.code !== 200) return this.$message.error('删除链接失败！')
      this.$message.success('删除链接成功！')
      // this.getFriendList()
      this.refreshPage()
    }
  }
}
</script>

<style scoped lang="less">

</style>
