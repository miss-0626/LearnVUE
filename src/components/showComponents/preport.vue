<template>
  <div>
    <el-row style="margin-top: 5px">
      <el-button type="primary" @click="add" style="float:right;margin-right:30px">上传实验报告</el-button>
    </el-row>
    <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%">
      <el-table-column label="id" prop="id" v-if="not"></el-table-column>
      <el-table-column label="url" prop="fileUrl" v-if="not"></el-table-column>
      <el-table-column label="文件名" prop="fileName"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="handledownload(scope.$index, scope.row)">下 载</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删 除</el-button>
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

    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="文件上传" :label-width="formLabelWidth">
          <!-- <el-input type="file" v-model="form.img" auto-complete="off" @click="uploadimg"></el-input>-->
          <el-upload
            ref="upload"
            name="file"
            action="http://47.101.137.101:8080/exper_front/file/upload"
            :limit="3"
            :file-list="fileList"
             v-model="form.fileUrl"
            :on-exceed="onExceed"
            :before-upload="beforeUpload"
            :on-success="handleSuccess"
            :with-credentials="true">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">请上传word/pdf或图片文件，且大小不超过10M</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="id" :label-width="formLabelWidth" v-show="not">
          <el-input v-model="form.fileId" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="课程名称" :label-width="formLabelWidth">
          <el-select v-model="form.courseName" placeholder="请选择">
            <el-option v-for="item in options" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="cancel">取 消</el-button>
        <el-button type="primary" @click="upload">上 传</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script type="text/ecmascript-6">
  import {saveAs} from 'file-saver';
  export default {
    name: "preport",
    inject: ['reload'],
    data() {
      return {
        currentPage:1,
        pagesize:5,
        courseName:[],
        fileName:'',
        not:false,
        fileList: [],
        tableData: [],
        options: [],
        dialogFormVisible: false,
        formLabelWidth: '100px',
        form: {},
        title:'上传实验报告'
      }
    },
    mounted() {
      var vm = this;
      this.$axios({
        method: 'post',
        url: 'http://47.101.137.101:8080/exper_front/info/myfile'
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
    methods: {
      handleSizeChange: function (size) {
        this.pagesize = size;
        console.log(this.pagesize);
      },
      handleCurrentChange: function(currentPage){
        this.currentPage = currentPage;
        console.log(this.currentPage);
      },

      //文件上传成功的钩子函数
      handleSuccess(res, file) {
        console.log(res);
        this.$message({
          type: 'success',
          message: '文件上传成功',
          duration: 6000
        });
        if (res.meta.success) {
          // this.form.fileUrl = res.data.url;
          this.form.fileId = res.data.fileId; //将返回的文件储存路径赋值picture字段
        }
      },
      //上传的文件个数超出设定时触发的函数
      onExceed(files, fileList) {
        this.$message({
          type: 'info',
          message: '最多只能上传3个文件',
          duration: 6000
        });
      },
      //文件上传前的前的钩子函数
      //参数是上传的文件，若返回false，或返回Primary且被reject，则停止上传
      beforeUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 10;
        if (!isLt2M) {
          this.$message.error('上传文件大小不能超过 10MB!');
        }
        return isLt2M;
      },
      add() {
        var vm = this;
        this.$axios({
          method: 'get',
          url: 'http://47.101.137.101:8080/exper_front/course/name'
        }).then(response => {
          console.log(response.data)
          if(response.data === ''){
            this.$router.push({path: '/Login'})
          }else{
            if (!response.data.meta.success) {
              this.$message({
                type: 'info',
                message: response.data.meta.message,
                duration: 6000
              });
            } else {
              vm.options= response.data.data;
              let options= response.data.data;
              console.log(options)
            }
          }
        }).catch(function (err) {
          console.log(err);
        })
        this.form = {
          fileId:'',
          fileName:''
        };
        this.dialogFormVisible = true;
      },
      upload() {
        this.$axios({
          method: 'post',
          url: 'http://47.101.137.101:8080/exper_front/file/save',
          data: {
            fileId:this.form.fileId,
            courseName:this.form.courseName,
          }
        }).then(response => {
          this.reload()
          let res = response.data;
          console.log(res)
        }).catch(function (err) {
          console.log(err)
        });
        this.dialogFormVisible = false;
        this.reload()
      },
      cancel(){
        this.reload();
        this.dialogFormVisible = false;
      },
      handledownload(index, row){
        this.$axios({
          method: 'post',
          url: 'http://47.101.137.101:8080/exper_front/file/download',
          data: {
            fileName:this.tableData[index].fileName,
            url:this.tableData[index].fileUrl,
          },
          // headers: {'Content-Type': 'application/json',},
          responseType: 'blob'
          // responseType: 'arraybuffer'
        }).then(response => {
          let aTag = document.createElement('a');
          let blob = new Blob([response.data],{type: 'application/octet-stream;charset=utf-8'});　　// 这个content是下载的文件内容，自己修改
          aTag.download = row.fileName;　　　　　　// 下载的文件名
          aTag.href = URL.createObjectURL(blob);
          aTag.click();
          URL.revokeObjectURL(blob);
/*          let url = window.URL.createObjectURL(new Blob([response.data]));
          let link = document.createElement('a');
          link.style.display = 'none';
          link.href = url;
          link.setAttribute('download',row.fileName);
          document.body.appendChild(link);
          link.click();*/
/*          this.reload()*/
          let res = response.data;
          console.log(res)
        }).catch(function (err) {
          console.log(err)
        });
      },
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios({
            method: 'get',
            url: 'http://47.101.137.101:8080/exper_front/file/delete/'+this.tableData[index].id,
          }).then(response => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            let res = response.data;
            console.log(res)
          }).catch(function (err) {
            console.log(err)
          });
          this.dialogFormVisible = false;
          this.reload()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    }
  }
</script>


<style>

  .teacher-table-expand {
    font-size: 0
  }
  .labelColor .el-form-item__label{
    width: 90px;
    color: #99a9bf
  }
  .teacher-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%
  }
</style>
