<template>
  <div class="deal-message">
    <h2 class="title" style="text-align: center">讨论信息</h2>
    <el-table :data="talkData.slice((currentPage-1)*pagesize,currentPage*pagesize)" height="400" border style="width: 100%" >
      <el-table-column label="id" prop="commentId" v-if="not"></el-table-column>
      <el-table-column prop="course" label="课程"  align="center"></el-table-column>
      <el-table-column prop="user" label="发表者"  align="center"></el-table-column>
      <el-table-column prop="word" label="发表内容" align="center"></el-table-column>
      <el-table-column prop="deliverDate" label="发表时间" sortable align="center"></el-table-column>
      <el-table-column label="操作" width="100px" align="center">
        <template slot-scope="scope">
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination style="padding-left: 30px;margin-top: 5px"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="currentPage"
                   :page-sizes="[5, 10, 20, 40]"
                   :page-size="pagesize"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="talkData.length">
    </el-pagination>

  </div>
</template>

<script>
  export default {
    name: "deal-talk",
    inject: ['reload'],
    data(){
      return{
        currentPage:1,
        pagesize:5,
        not:false,
        talkData:[]
      }
    },
    mounted(){
      var vm = this;
      this.$axios({
        method: 'get',
        url: 'http://47.101.137.101:8080/exper_front/comment/list'
      }).then(response => {
        if(response.data === ''){
        this.$router.push({path: '/Login'})
      }else{
        vm.talkData = response.data.data;
        let talkData = response.data.data;
        console.log(talkData)
      }
    }).catch(function (err) {
        console.log(err);
      })
    },
    methods:{
      handleSizeChange: function (size) {
        this.pagesize = size;
        console.log(this.pagesize);
      },
      handleCurrentChange: function(currentPage){
        this.currentPage = currentPage;
        console.log(this.currentPage);
      },

      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该条信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var vm = this;
        this.$axios({
          method: 'get',
          url: 'http://47.101.137.101:8080/exper_front/comment/delete/'+this.talkData[index].commentId,
        }).then(response => {
          this.reload()
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        let res = response.data;
        console.log(res)
      }).catch(function (err) {
          console.log(err)
        });
      }).catch(() => {
          this.$message({
          type: 'info',
          message: '已取消删除'
        });
      })
      }
    }
  }
</script>

<style scoped>

</style>
