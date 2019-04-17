<template>
  <div style=";margin:30px 100px 0px 100px;">
    <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" border style="width: 100%">
      <el-table-column prop="labNum" label="实验室/设备编号" ></el-table-column>
      <el-table-column prop="labName" label="实验室/设备名称" ></el-table-column>
      <el-table-column prop="date" label="借用日期" ></el-table-column>
      <el-table-column prop="time" label="借用时间" ></el-table-column>
      <el-table-column prop="state" label="申请情况" width="100">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.state==='成功'" disable-transitions>{{scope.row.state}}</el-tag>
          <el-tag type="danger" v-else-if="scope.row.state==='失败'" disable-transitions>{{scope.row.state}}</el-tag>
          <el-tag v-else="scope.row.state==='待处理'" disable-transitions>{{scope.row.state}}</el-tag>
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
    data() {
      return {
        currentPage:1,
        pagesize:5,
        tableData: [{
          labNum: '6-201',
          labName: '物理实验室',
          date:'2019-03-15',
          time:'整天',
          state: '待处理'
        },
          {
            labNum: '8-212',
            labName: '物理实验室',
            date:'2019-03-12',
            time:'下午',
            state: '成功'
          },{
            labNum: '8-211',
            labName: '物理实验室',
            date:'2019-03-10',
            time:'晚上',
            state: '失败'
          },{
            labNum: '6-212',
            labName: '硬件实验室',
            date:'2019-03-05',
            time:'上午',
            state: '成功'
          }]
      }
    },
    methods:{
      handleSizeChange: function (size) {
        this.pagesize = size;
        console.log(this.pagesize);
      },
      handleCurrentChange: function(currentPage){
        this.currentPage = currentPage;
        console.log(this.currentPage);
      }
    }
  }
</script>

<style scoped>

</style>
