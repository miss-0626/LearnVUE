<template>
  <div style="margin-top: 5px">
    <el-table ref="filterTable" :data="tableData12" style="width: 100% ">
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
  </div>
</template>

<script>
    export default {
        name: "read-report",
      data() {
        return {
          tableData12: [{
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
      }
    }

</script>

<style scoped>

</style>
