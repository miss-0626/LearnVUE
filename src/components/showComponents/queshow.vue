<template>
  <div>
    <el-button @click="clearFilter">清除所有过滤器</el-button>
    <el-table ref="filterTable" :data="tableData2" style="width: 100%">
      <el-table-column prop="quename" label="设备名称" width="150" column-key="date"
                       :filters="[{text: '示波器', value: '示波器'},
                                  {text: '高频信号发生器', value: '高频信号发生器'},
                                  {text: '频谱仪', value: '频谱仪'},
                                  {text: '计算机', value: '计算机'}]" :filter-method="filterHandler">
      </el-table-column>
      <el-table-column prop="introduce" label="设备基本信息及用途"></el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "queshow",
    data() {
      return {
        tableData2: [{
          quename:'示波器',
          introduce: '这是一条示波器介绍'
        },
          {
            quename:'计算机',
            introduce: '这是一条计算机介绍'
          },
          {
            quename:'高频信号发生器',
            introduce: '这是一条高频信号发生器介绍'
          },
          {
            quename:'高频信号发生器',
            introduce: '这是一条高频信号发生器介绍'
          },
          {
            quename:'频谱仪',
            introduce: '这是一条频谱仪介绍'
          },
          {
            quename:'频谱仪',
            introduce: '这是一条频谱仪介绍'
          }]
      }
    },
    methods: {
      clearFilter() {
        this.$refs.filterTable.clearFilter();
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
