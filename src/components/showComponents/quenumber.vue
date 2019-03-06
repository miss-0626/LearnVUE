<template>
  <div>
    <el-button @click="clearFilter">清除所有过滤器</el-button>
    <el-table ref="filterTable" :data="tableData2" style="width: 100%">
      <el-table-column prop="quename" label="设备名称" ></el-table-column>
      <el-table-column prop="number" label="设备编号"></el-table-column>
      <el-table-column prop="labname" label="实验室名称" ></el-table-column>
      <el-table-column prop="institute" label="归属学院" sortable  column-key="date"
                       :filters="[{text: '物理与电信工程学院', value: '物理与电信工程学院'},
                   {text: '信息光电子科技学院', value: '信息光电子科技学院'},
                   {text: '化学与环境学院', value: '化学与环境学院'},
                   {text: '华南先进光电子研究院', value: '华南先进光电子研究院'}]" :filter-method="filterHandler">
      </el-table-column>
      <el-table-column prop="address" label="实验室地址"   :formatter="formatter"></el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "quenumber",
    data() {
      return {
        tableData2: [{
          quename:'XX示波器',
          number:'10-001',
          labname:'物理实验室',
          institute:'物理与电信工程学院',
          address: '理八-520'
        },
          {
            quename:'XX示波器',
            number:'10-001',
            labname:'物理实验室',
            institute:'化学与环境学院',
            address: '理八-520'
          },
          {
            quename:'XX示波器',
            number:'10-001',
            labname:'物理实验室',
            institute:'信息光电子科技学院',
            address: '理八-520'
          },
          {
            quename:'XX示波器',
            number:'10-001',
            labname:'物理实验室',
            institute:'物理与电信工程学院',
            address: '理八-520'
          },
          {
            quename:'XX示波器',
            number:'10-001',
            labname:'物理实验室',
            institute:'信息光电子科技学院',
            address: '理八-520'
          },
          {
            quename:'XX示波器',
            number:'10-001',
            labname:'物理实验室',
            institute:'华南先进光电子研究院',
            address: '理八-520'
          },
          {
            quename:'XX示波器',
            number:'10-001',
            labname:'物理实验室',
            institute:'化学与环境学院',
            address: '理八-520'
          },{
            quename:'XX示波器',
            number:'10-001',
            labname:'物理实验室',
            institute:'华南先进光电子研究院',
            address: '理八-520'
          },{
            quename:'XX示波器',
            number:'10-001',
            labname:'物理实验室',
            institute:'物理与电信工程学院',
            address: '理八-520'
          }]
      }
    },
    methods: {
      clearFilter() {
        this.$refs.filterTable.clearFilter();
      },
      formatter(row, column) {
        return row.address;
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      }
    }
  }
</script>

<style scoped>

</style>
