<template>
  <div style="margin-top: 5px">
    <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%">
      <el-table-column label="id" prop="id" v-if="not"></el-table-column>
      <el-table-column label="url" prop="fileUrl" v-if="not"></el-table-column>
      <el-table-column label="课程名" prop="course" sortable></el-table-column>
      <el-table-column label="文件名" prop="fileName"></el-table-column>
      <el-table-column label="上传者" prop="uploader"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="handledownload(scope.$index, scope.row)">下 载</el-button>
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
                   :total="tableData.length">
    </el-pagination>
  </div>
</template>

<script>
    export default {
        name: "read-report",
      data() {
        return {
          currentPage:1,
          pagesize:5,
          not:false,
          tableData: []
        }
      },
      mounted() {
        var vm = this;
        this.$axios({
          method: 'post',
          url: 'http://47.101.137.101:8080/exper_front/info/mywork'
        }).then(response => {
          if(response.data === ''){
          this.$router.push({path: '/Login'})
        }else{
          vm.tableData = response.data.data;
          let data = response.data.data;
          console.log(data)
        }
      }).catch(function (err) {
          console.log(err);
        })
      },
      methods:{
        handleSizeChange: function (size) {
          this.pagesize = size;
          console.log(this.pagesize);
        },
        handleCurrentChange: function(currentPage){
          this.currentPage = currentPage;
          console.log(this.currentPage);
        },
        handledownload(index, row){
          this.$axios({
            method: 'post',
            url: 'http://47.101.137.101:8080/exper_front/file/download',
            data: {
              fileName:this.tableData[index].fileName,
              url:this.tableData[index].fileUrl,
            },
            responseType: 'blob'
          }).then(response => {
            let aTag = document.createElement('a');
          let blob = new Blob([response.data],{type: 'application/octet-stream;charset=utf-8'});　　// 这个content是下载的文件内容，自己修改
          aTag.download = row.fileName;　　　　　　// 下载的文件名
          aTag.href = URL.createObjectURL(blob);
          aTag.click();
          URL.revokeObjectURL(blob);
          let res = response.data;
          console.log(res)
        }).catch(function (err) {
            console.log(err)
          });
        },
      }
    }

</script>

<style scoped>

</style>
