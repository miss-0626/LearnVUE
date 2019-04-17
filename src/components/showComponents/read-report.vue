<template>
  <div style="margin-top: 5px">
    <el-table ref="filterTable" :data="tableData15.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100% ">
      <el-table-column prop="number" label="学号" sortable></el-table-column>
      <el-table-column prop="name" label="姓名" sortable></el-table-column>
      <el-table-column prop="experiment" label="实验名称" sortable></el-table-column>
      <el-table-column prop="report" label="实验报告">
        <template slot-scope="props">
          <el-popover placement="right" title="" trigger="click">
            <img :src="props.row.report" style="max-width:1000px;max-height:600px"/>
            <img slot="reference" :src="props.row.report" :alt="props.row.report" style="width:50px;height:30px">
          </el-popover>
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
                   :total="tableData15.length">
    </el-pagination>
  </div>
</template>

<script>
    export default {
        name: "read-report",
      data() {
        return {
          currentPage:1,
          pagesize:5,
          tableData15: [{
            number: '201500001',
            name: '小明',
            experiment: '现代通信网',
            report: '../static/image/logo.png'
          }, {
            number: '201500001',
            name: '小明',
            experiment: '现代通信网',
            report: '../static/image/1.jpg'
          }, {
            number: '201500001',
            name: '小明',
            experiment: '现代通信网',
            report: '../static/image/logo.png'
          }, {
            number: '201500001',
            name: '小明',
            experiment: '现代通信网',
            report: '../static/image/5.jpg'
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
