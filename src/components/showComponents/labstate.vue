<template>
  <div>
  <el-button @click="clearFilter">清除所有过滤器</el-button>
  <el-table ref="filterTable" :data="tableData3" style="width: 100%">
    <el-table-column prop="name" label="实验室名称" ></el-table-column>
    <el-table-column prop="institute" label="归属学院" sortable  column-key="date"
                     :filters="[{text: '物理与电信工程学院', value: '物理与电信工程学院'},
                   {text: '信息光电子科技学院', value: '信息光电子科技学院'},
                   {text: '化学与环境学院', value: '化学与环境学院'},
                   {text: '华南先进光电子研究院', value: '华南先进光电子研究院'}]" :filter-method="filterHandler">
    </el-table-column>
    <el-table-column prop="state" label="状态"
                     :filters="[{ text: '占用', value: '占用' }, { text: '空闲', value: '空闲' }]"
      :filter-method="filterTag" filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag :type="scope.row.state === '占用' ? '空闲' : 'success'"
          disable-transitions>{{scope.row.state}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="操作">
    <template slot-scope="scope">
      <el-button
        size="mini"
        @click="handleuse(scope.$index, scope.row)">申请借用</el-button>
    </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
    export default {
        name: "labstate",
      data() {
        return {
          tableData3: [{
            name: '物理实验室',
            institute:'物理与电信工程学院',
            state: '空闲'
          },{
            name: '物理实验室',
            institute:'物理与电信工程学院',
            state: '空闲'
          },{
            name: '物理实验室',
            institute:'化学与环境学院',
            state: '占用'
          },{
            name: '物理实验室',
            institute:'物理与电信工程学院',
            state: '空闲'
          },{
            name: '物理实验室',
            institute:'化学与环境学院',
            state: '占用'
          },{
            name: '物理实验室',
            institute:'物理与电信工程学院',
            state: '空闲'
          }]
        }
      },
      methods: {
        clearFilter() {
          this.$refs.filterTable.clearFilter();
        },
        filterTag(value, row) {
          return row.state === value;
        },
        filterHandler(value, row, column) {
          const property = column['property'];
          return row[property] === value;
        },
        handleuse(index, row) {
          console.log(index, row);
        }
      }
    }
</script>

<style scoped>

</style>
