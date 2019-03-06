<template>
  <div>
    <el-button @click="clearFilter">清除所有过滤器</el-button>
    <el-table ref="filterTable" :data="tableData3" style="width: 100%">
      <el-table-column prop="quename" label="设备名称" width="150" column-key="date"
                       :filters="[{text: '示波器', value: '示波器'},
                                  {text: '高频信号发生器', value: '高频信号发生器'},
                                  {text: '频谱仪', value: '频谱仪'},
                                  {text: '计算机', value: '计算机'}]" :filter-method="filterHandler">
      </el-table-column>
      <el-table-column prop="number" label="设备编号"></el-table-column>
      <el-table-column prop="state" label="状态"
                       :filters="[{ text: '占用', value: '占用' },
                                  { text: '空闲', value: '空闲' }]"
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
    name: "questate",
    data() {
      return {
        tableData3: [{
          quename:'示波器',
          number:'10-001',
          state: '空闲'
        },{
          quename:'高频信号发生器',
          number:'10-001',
          state: '空闲'
        },{
          quename:'频谱仪',
          number:'10-001',
          state: '占用'
        },{
          quename:'计算机',
          number:'10-001',
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
