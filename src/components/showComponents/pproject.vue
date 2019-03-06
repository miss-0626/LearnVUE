<template>
<div style=";margin:50px 400px 0px 400px;">
  <el-table :data="tableData7" border style="width: 100%">
    <el-table-column prop="project" label="申请项目" width="180"></el-table-column>
    <el-table-column prop="teacher" label="指导老师" width="180"></el-table-column>
    <el-table-column prop="state" label="申报情况" width="100">
    <template slot-scope="scope">
      <el-tag :type="scope.row.tag === '成功'?'失败': 'danger'" disable-transitions>{{scope.row.tag}}</el-tag>
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
          tableData7: [{
            project: '挑战杯',
            teacher: '崔老师',
            tag: '待处理'
          },
            {
              project: '挑战杯',
              teacher: '崔老师',
              tag: '失败'
            },
            {
              project: '挑战杯',
              teacher: '崔老师',
              tag: '成功'
            }]
        }
      }
    }
</script>

<style scoped>

</style>
