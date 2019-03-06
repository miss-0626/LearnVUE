<template>
  <div>
    <el-button @click="clearFilter">清除所有过滤器</el-button>
    <el-table ref="filterTable" :data="tableData2" style="width: 100%">
      <el-table-column prop="year" label="学年"sortable  column-key="date"
                       :filters="[{text: '2018-2019', value: '2018-2019'},
                                  {text: '2017-2018', value: '2017-2018'},
                                  {text: '2016-2017', value: '2016-2017'},
                                  {text: '2015-2016', value: '2015-2016'}]" :filter-method="filterHandler">
      </el-table-column>
      <el-table-column prop="term" label="学期" sortable  column-key="date"
                       :filters="[{text: '1', value: '1'},
                                  {text: '2', value: '2'}]" :filter-method="filterHandler">
      </el-table-column>
      <el-table-column prop="name" label="课程名称" sortable></el-table-column>
      <el-table-column prop="score" label="成绩" sortable></el-table-column>
      <el-table-column prop="institute" label="开课学院" sortable  column-key="date"
                       :filters="[{text: '物理与电信工程学院', value: '物理与电信工程学院'},
                   {text: '信息光电子科技学院', value: '信息光电子科技学院'},
                   {text: '化学与环境学院', value: '化学与环境学院'},
                   {text: '华南先进光电子研究院', value: '华南先进光电子研究院'}]" :filter-method="filterHandler">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
    export default {
        name: "pscore",
      data() {
        return {
          tableData2: [{
            year:'2018-2019',
            term:'1',
            name:'通信技术',
            score:'90',
            institute:'物理与电信工程学院'
          },{
            year:'2018-2019',
            term:'2',
            name:'通信技术',
            score:'90',
            institute:'信息光电子科技学院'
          },{
            year:'2017-2018',
            term:'2',
            name:'通信技术',
            score:'90',
            institute:'物理与电信工程学院'
          },{
            year:'2015-2016',
            term:'1',
            name:'通信技术',
            score:'90',
            institute:'华南先进光电子研究院'
          },{
            year:'2016-2017',
            term:'2',
            name:'通信技术',
            score:'90',
            institute:'物理与电信工程学院'
          },{
            year:'2017-2018',
            term:'1',
            name:'通信技术',
            score:'90',
            institute:'物理与电信工程学院'
          },{
            year:'2015-2016',
            term:'2',
            name:'通信技术',
            score:'90',
            institute:'化学与环境学院'
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
