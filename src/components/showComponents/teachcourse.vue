<template>
  <div>
    <el-button @click="clearFilter">清除所有过滤器</el-button>
    <el-table ref="filterTable" :data="tableData2" style="width: 100%">
      <el-table-column prop="name" label="教学课程" ></el-table-column>
      <el-table-column prop="teacher" label="教学老师"sortable  column-key="date"
                       :filters="[{text: '崔老师', value: '崔老师'},
                   {text: '张老师', value: '张老师'},
                   {text: '邱老师', value: '邱老师'}]" :filter-method="filterHandler">
      </el-table-column>
      <el-table-column prop="institute" label="归属学院" sortable  column-key="date"
                       :filters="[{text: '物理与电信工程学院', value: '物理与电信工程学院'},
                   {text: '信息光电子科技学院', value: '信息光电子科技学院'},
                   {text: '化学与环境学院', value: '化学与环境学院'},
                   {text: '华南先进光电子研究院', value: '华南先进光电子研究院'}]" :filter-method="filterHandler">
      </el-table-column>
      <el-table-column prop="introduce" label="课程介绍" show-overflow-tooltip="true"></el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "teachcourse",
    data() {
      return {
        tableData2: [{
          name:'通信技术',
          teacher:'崔老师',
          institute:'物理与电信工程学院',
          introduce: '通信技术实验'
        },{
          name:'通信技术',
          teacher:'张老师',
          institute:'信息光电子科技学院',
          introduce: '通信技术实验'
        },{
          name:'通信技术',
          teacher:'崔老师',
          institute:'物理与电信工程学院',
          introduce: '通信技术实验'
        },{
          name:'通信技术',
          teacher:'邱老师',
          institute:'华南先进光电子研究院',
          introduce: '通信技术实验'
        },{
          name:'通信技术',
          teacher:'张老师',
          institute:'物理与电信工程学院',
          introduce: '通信技术实验'
        },{
          name:'通信技术',
          teacher:'邱老师',
          institute:'物理与电信工程学院',
          introduce: '通信技术实验'
        },{
          name:'通信技术',
          teacher:'崔老师',
          institute:'化学与环境学院',
          introduce: '通信技术实验'
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
