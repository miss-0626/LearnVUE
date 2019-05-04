<template>
  <div>
    <el-button v-if="role === 3" style="float:right;margin-right:100px" type="primary" @click="upload">上传实验报告</el-button>
  <div style=";margin:50px 400px 0px 400px;">
    <el-table :data="tableData10.slice((currentPage-1)*pagesize,currentPage*pagesize)" border style="width: 100%">
      <el-table-column prop="experiment" label="实验名称" ></el-table-column>
      <el-table-column prop="book" label="指导书" ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="download(scope.$index, scope.row)">下 载</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination style="padding-left: 30px;margin-top: 5px"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="currentPage"
                   :page-sizes="[5, 10, 20, 40]"
                   :page-size="pagesize"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="tableData10.length">
    </el-pagination>
  </div>
  </div>
</template>

<script>
  export default {
    name: "teachbook",
    data() {
      return {
        currentPage: 1,
        pagesize: 5,
        role:'',
        tableData10: [{
          experiment: '现代通信网',
          book: '实验指导书'
        },
          {
            experiment: '现代通信网',
            book: '实验指导书'
          }, {
            experiment: '现代通信网',
            book: '实验指导书'
          }]
      }
    },
   mounted() {
          const userrole = JSON.parse(sessionStorage.getItem('用户角色'));
          this.role = userrole;
        },
  methods: {
       upload(){

       },
       download(index, row){

       },
       handleSizeChange: function (size) {
            this.pagesize = size;
            console.log(this.pagesize);
          },
       handleCurrentChange: function(currentPage){
            this.currentPage = currentPage;
            console.log(this.currentPage);
          }
        }
  }
</script>

<style scoped>

</style>
