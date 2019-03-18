<template>
  <div style=";margin:50px 400px 0px 400px;">
    <el-table :data="tableData7" border style="width: 100%">
      <el-table-column prop="experiment" label="实验名称" ></el-table-column>
      <el-table-column prop="book" label="指导书" ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="download(scope.$index, scope.row)">下 载</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "teachbook",
    data() {
      return {
        tableData7: [{
          experiment: '现代通信网',
          book: '实验指导书'
        },
          {
            experiment: '现代通信网',
            book: '实验指导书'
          },{
            experiment: '现代通信网',
            book: '实验指导书'
          }],
        methods: {
          download:{

          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
