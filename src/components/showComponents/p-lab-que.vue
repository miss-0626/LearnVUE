<template>
  <div style=";margin:30px 100px 0px 100px;">
    <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" border style="width: 100%">
      <el-table-column prop="equiId" label="id" v-if="not" ></el-table-column>
      <el-table-column prop="equiNum" label="设备编号" ></el-table-column>
      <el-table-column prop="equiName" label="设备名称" ></el-table-column>
<!--      <el-table-column prop="date" label="借用日期" ></el-table-column>
      <el-table-column prop="time" label="借用时间" ></el-table-column>-->
      <el-table-column prop="state" label="申请情况" width="100">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.state==='占用'" disable-transitions>{{scope.row.state}}</el-tag>
          <el-tag type="danger" v-else="scope.row.state==='待审核'" disable-transitions>{{scope.row.state}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.state==='占用'" @click="handlereturn(scope.$index, scope.row)">归 还</el-button>
          <el-button type="primary" v-if="scope.row.state==='待审核'" @click="handlereturn(scope.$index, scope.row)">取消申请</el-button>
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
    name: "p-lab-que",
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
        url: 'http://47.101.137.101:8080/exper_front/info/myequi',
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
      handlereturn(index,row) {
        this.$axios({
          method: 'get',
          url: 'http://47.101.137.101:8080/exper_front/equi/back/' + this.tableData[index].equiId,
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
