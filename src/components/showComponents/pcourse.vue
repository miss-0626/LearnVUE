<template>
  <div style=";margin:30px 100px 0px 100px;">
    <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" border style="width: 100%">
      <el-table-column label="id" prop="courseId" v-if="not"></el-table-column>
      <el-table-column prop="courseName" label="课程名称" ></el-table-column>
      <el-table-column prop="lecturer" label="教学老师" ></el-table-column>
      <el-table-column prop="courseType" label="课程类型" ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger"  @click="handledrop(scope.$index,scope.row)">退 选</el-button>
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
                   :total="tableData.length">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: "pcourse",
    inject: ['reload'],
    data() {
      return {
        currentPage:1,
        pagesize:5,
        not:false,
        tableData: []
      }
    },
    mounted(){
      var vm = this;
      this.$axios({
        method: 'post',
        url: 'http://192.168.1.235:8080/exper_front/info/mycourse',
        data:{}
      }).then(response => {
        let res = response.data
        console.log(res)
      if(response.data === ''){
        this.$router.push({path: '/Login'})
      }else{
        vm.tableData = response.data.data;
        let tableData = response.data.data;
        console.log(tableData)
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
      handledrop(index,row) {
        this.$axios({
          method: 'get',
          url: 'http://192.168.1.235:8080/exper_front/course/cancel/' + this.tableData[index].courseId,
        }).then(response => {
          this.$message({
          type: 'success',
          message: response.data.meta.message,
          showClose: true
        })
        this.reload()
      }).
        catch(function (err) {
          console.log(err)
        });
      }
    }
  }
</script>

<style scoped>

</style>
