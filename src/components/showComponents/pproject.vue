<template>
<div style=";margin:50px 400px 0px 400px;">
  <el-table :data="tableData12" border style="width: 100%">
    <el-table-column prop="project" label="申请项目"></el-table-column>
    <el-table-column prop="teacher" label="指导老师"></el-table-column>
    <el-table-column prop="state" label="申报情况" width="100">
    <template slot-scope="scope">
      <el-tag type="success" v-if="scope.row.state==='成功'" disable-transitions>{{scope.row.state}}</el-tag>
      <el-tag type="danger" v-else-if="scope.row.state==='失败'" disable-transitions>{{scope.row.state}}</el-tag>
      <el-tag v-else="scope.row.state==='待处理'" disable-transitions>{{scope.row.state}}</el-tag>
    </template>
  </el-table-column>
  </el-table>
</div>
</template>

<script>
    export default {
        name: "pproject",
      data() {
        return {
          tableData12: [{
            project: '挑战杯',
            teacher: '崔老师',
            state: '待处理'
          },
            {
              project: '挑战杯',
              teacher: '崔老师',
              state: '失败'
            },
            {
              project: '挑战杯',
              teacher: '崔老师',
              state: '成功'
            }]
        }
      }
    }
</script>

<style scoped>

</style>
