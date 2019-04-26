<template>
  <div>
    <el-row>
      <el-col class="head">
        <span>设备管理</span>
      </el-col>
    </el-row>
    <el-table :data="tableData20.slice((currentPage-1)*pagesize,currentPage*pagesize)" height="450"  border style="width: 100%">
      <el-table-column label="id" prop="equiId" v-if="not"></el-table-column>
      <el-table-column sortable prop="labNum" label="归属实验室号" align="center"></el-table-column>
      <el-table-column sortable prop="equiNum" label="设备编号" align="center"></el-table-column>
      <el-table-column sortable prop="equiName" label="设备名称" align="center"></el-table-column>
      <el-table-column prop="user" label="申请人" align="center"></el-table-column>
      <el-table-column label="状态" prop="state" sortable align="center">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.state==='已允许'">{{scope.row.state}}</el-tag>
          <el-tag type="danger" v-else-if="scope.row.state==='已拒绝'">{{scope.row.state}}</el-tag>
          <el-tag v-else="scope.row.state==='待处理'">{{scope.row.state}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="180">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="handlepass(scope.$index, scope.row)">允许</el-button>
          <el-button size="small" type="danger" @click="handlenot(scope.$index, scope.row)">拒绝</el-button>
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
                   :total="tableData20.length">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: "deal-questate",
    inject: ['reload'],
    data() {
      return {
        currentPage:1,
        pagesize:5,
        not:false,
        tableData20: [],
        form: {},
        currentIndex: ''
      };
    },
    mounted() {
      var vm = this;
      this.$axios({
        method: 'get',
        url: 'http://192.168.1.235:8080/exper_front/equi/checkbooklist'
      }).then(response => {
        if(response.data === ''){
        this.$router.push({path: '/Login'})
      }else{
        vm.tableData20 = response.data.data;
        let tableData20 = response.data.data;
        console.log(tableData20)
      }
    }).catch(function (err) {
        console.log(err);
      })
    },
    methods: {
      handleSizeChange: function (size) {
        this.pagesize = size;
        console.log(this.pagesize);
      },
      handleCurrentChange: function(currentPage){
        this.currentPage = currentPage;
        console.log(this.currentPage);
      },

      handlepass(index,row){
        this.$confirm('确认允许该学生的申请吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          this.$axios({
          method: 'get',
          url: 'http://192.168.1.235:8080/exper_front/equi/checkbook/'+this.tableData20[index].equiId,
        }).then(response => {
          this.reload()
          this.$message({
          type: 'success',
          message: '成功!'
        })
        let res = response.data;
        console.log(res)
      }).catch(function (err) {
          console.log(err)
        });
        this.reload()
      }).catch(() => {
          this.$message({
          type: 'info',
          message: '取消决定'
        })
      })
      },
      handlenot(index, row) {
        this.$confirm('确认拒绝该学生的申请吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios({
          method: 'get',
          url: 'http://192.168.1.235:8080/exper_front/equi/refuse/'+this.tableData20[index].equiId,
        }).then(response => {
          this.reload()
          this.$message({
          type: 'success',
          message: '已拒绝!'
        })
        let res = response.data;
        console.log(res)
      }).catch(function (err) {
          console.log(err)
        });
        this.reload()
      }).catch(() => {
          this.$message({
          type: 'info',
          message: '取消决定'
        })
      })
      }
    }
  }
</script>

<style>
  .head{
    font-weight: normal;
    font-size: x-large;
    color: dimgray;
    background-color: aliceblue;
    margin: 0;
    padding: 5px 15px;
  }
  .que-table-expand {
    font-size: 0
  }
  .labelColor .el-form-item__label{
    width: 90px;
    color: #99a9bf
  }
  .que-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%
  }
</style>
