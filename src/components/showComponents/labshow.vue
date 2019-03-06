<template>
  <div>
    <el-button @click="clearFilter">清除所有过滤器</el-button>
    <el-table ref="filterTable" :data="tableData2" style="width: 100%">
      <el-table-column prop="name" label="实验室名称" width="150"></el-table-column>
      <el-table-column prop="institute" label="归属学院" sortable width="180" column-key="date"
        :filters="[{text: '物理与电信工程学院', value: '物理与电信工程学院'},
                   {text: '信息光电子科技学院', value: '信息光电子科技学院'},
                   {text: '化学与环境学院', value: '化学与环境学院'},
                   {text: '华南先进光电子研究院', value: '华南先进光电子研究院'}]" :filter-method="filterHandler">
      </el-table-column>
      <el-table-column prop="address" label="实验室地址"  width="120" :formatter="formatter"></el-table-column>
      <el-table-column prop="introduce" label="实验室介绍"></el-table-column>
    </el-table>
  </div>
</template>

<script>
    export default {
        name: "labshow",
      data() {
        return {
          tableData2: [{
              name: '物理实验室',
              institute:'物理与电信工程学院',
              address: '理八-520',
              introduce: '这是一条介绍'
            },
            {
              name: '物理实验室',
              institute:'化学与环境学院',
              address: '理八-520',
              introduce: '这是一条介绍'
            },
            {
              name: '物理实验室',
              institute:'信息光电子科技学院',
              address: '理八-520',
              introduce: '这是一条介绍'
            },
            {
              name: '物理实验室',
              institute:'物理与电信工程学院',
              address: '理八-520',
              introduce: '这是一条介绍'
            },
            {
              name: '物理实验室',
              institute:'信息光电子科技学院',
              address: '理八-520',
              introduce: '这是一条介绍'
            },
            {
              name: '物理实验室',
              institute:'华南先进光电子研究院',
              address: '理八-520',
              introduce: '这是一条介绍'
            },
            {
              name: '物理实验室',
              institute:'化学与环境学院',
              address: '理八-520',
              introduce: '这是一条介绍'
            },{
              name: '物理实验室',
              institute:'华南先进光电子研究院',
              address: '理八-520',
              introduce: '这是一条介绍'
            },{
              name: '物理实验室',
              institute:'物理与电信工程学院',
              address: '理八-520',
              introduce: '这是一条介绍'
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
