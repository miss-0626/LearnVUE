<template>
  <div>
    <el-row style="margin-top: 5px">
      <el-button type="primary" @click="add" style="float:right;margin-right:30px">新增教师</el-button>
    </el-row>
    <el-table :data="tableData24.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%">
      <el-table-column label="肖像" prop="imgUrl">
        <template slot-scope="props">
          <el-popover placement="right" title="" trigger="click">
            <img :src="props.row.imgUrl" style="max-width:300px;max-height:300px"/>
            <img slot="reference" :src="props.row.imgUrl" :alt="props.row.imgUrl" style="width:100px;height:100px" class="image">
<!--            <img slot="reference" :src="getImgUrl()" :alt="props.row.imgUrl" style="width:100px;height:100px" class="image">-->
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="id" prop="lecturerId" v-if="not"></el-table-column>
      <el-table-column label="姓名" prop="lecturerName"></el-table-column>
      <el-table-column label="职称" prop="title"></el-table-column>
      <el-table-column label="简介" prop="introduce"></el-table-column>
      <el-table-column label="电话" prop="phone"></el-table-column>
      <el-table-column label="邮箱" prop="email"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
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
                   :total="tableData24.length">
    </el-pagination>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :model="form">

        <el-form-item label="肖像" :label-width="formLabelWidth">
        <!-- <el-input type="file" v-model="form.img" auto-complete="off" @click="uploadimg"></el-input>-->
        <el-upload
               ref="upload"
               name="file"
               action="http://192.168.1.235:8080/exper_front/file/upload"
               list-type="picture-card"
               :limit="1"
               :file-list="imgList"
                v-model="form.imgUrl"
               :on-exceed="onExceed"
               :before-upload="beforeUpload"
               :on-preview="handlePreview"
               :on-remove="handleRemove"
               :on-success="handleSuccess"
               :with-credentials="true">
          <i class="el-icon-plus"></i>
          <div slot="tip" class="el-upload__tip">请上传JPG/GIF/PNG/BMP 格式的图片，且大小不超过2M</div>
        </el-upload>
        <el-dialog :visible.sync="innerVisible">
          <img  width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
          <img v-show="dialogStatus=='editdate'&& yes" :src="form.imgUrl"  style="width:130px;height:130px" class="image">
      </el-form-item>
        <el-form-item label="id" :label-width="formLabelWidth" v-show="not">
          <el-input v-model="form.lecturerId" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="导师" :label-width="formLabelWidth">
          <el-input v-model="form.lecturerName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="职称" :label-width="formLabelWidth">
          <el-input v-model="form.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="简介" :label-width="formLabelWidth">
          <el-input v-model="form.introduce" type="textarea" :rows="3" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="cancel">取 消</el-button>
        <el-button v-if="dialogStatus=='update'" type="primary" @click="update">新 增</el-button>
        <el-button v-else type="primary" @click="editdate">修 改</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "dea-teacher",
    inject: ['reload'],
    data() {
      return {
        currentPage:1,
        pagesize:5,
        not:false,
        yes:true,
        imgList: [],
        tableData24: [],
        dialogFormVisible: false,
        innerVisible: false,
        dialogImageUrl: '',
        formLabelWidth: '100px',
        form: {},
        currentIndex: '',
        dialogStatus: "",
        textMap: {
          update: "新增教师信息",
          editdate: "修改教师信息"
        },
      }
    },
    mounted() {
      var vm = this;
      this.$axios({
        method: 'get',
        url: 'http://192.168.1.235:8080/exper_front/lecturer/list'
      }).then(response => {
        if(response.data === ''){
          this.$router.push({path: '/Login'})
        }else{
          vm.tableData24 = response.data.data;
          let tableData24 = response.data.data;
          console.log(tableData24)
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
        this.yes = false;
        this.$message({
          type: 'success',
          message: '图片上传成功',
          duration: 6000
        });
        if (res.meta.success) {
          this.form.imgUrl = res.data.url; //将返回的文件储存路径赋值picture字段
        }
      },
      //删除文件之前的钩子函数
      handleRemove(file, fileList) {
        this.$message({
          type: 'info',
          message: '已删除原有图片',
          duration: 6000
        });
      },
      //点击列表中已上传的文件事的钩子函数
      handlePreview(file) {
        this.dialogImageUrl = this.form.imgUrl;
        this.innerVisible = true;
      },
      //上传的文件个数超出设定时触发的函数
      onExceed(files, fileList) {
        this.$message({
          type: 'info',
          message: '最多只能上传一个图片',
          duration: 6000
        });
      },
      //文件上传前的前的钩子函数
      //参数是上传的文件，若返回false，或返回Primary且被reject，则停止上传
      beforeUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isGIF = file.type === 'image/gif';
        const isPNG = file.type === 'image/png';
        const isBMP = file.type === 'image/bmp';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG && !isGIF && !isPNG && !isBMP) {
          this.$message.error('上传图片必须是JPG/GIF/PNG/BMP 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return (isJPG || isBMP || isGIF || isPNG) && isLt2M;
      },


      add() {
        this.dialogStatus = "update";
        this.form = {
          lecturerId:'',
          imgUrl:'',
          lecturerName: '',
          title: '',
          phone: '',
          email:'',
          introduce: ''
        };
        this.dialogFormVisible = true;
      },
      update() {
        this.$axios({
          method: 'post',
          url: 'http://192.168.1.235:8080/exper_front/lecturer/add',
          data: {
            lecturerName: this.form.lecturerName,
            introduce: this.form.introduce,
            title: this.form.title,
            email: this.form.email,
            phone: this.form.phone,
            imgUrl: this.form.imgUrl
          }
        }).then(response => {
          this.reload()
          let res = response.data;
          console.log(res)
        }).catch(function (err) {
          console.log(err)
        });
        this.dialogFormVisible = false;
      },
      editdate(){
        this.$axios({
          method: 'post',
          url: 'http://192.168.1.235:8080/exper_front/lecturer/update',
          data: {
            lecturerId:this.form.lecturerId,
            lecturerName: this.form.lecturerName,
            introduce: this.form.introduce,
            title: this.form.title,
            email: this.form.email,
            phone: this.form.phone,
            imgUrl: this.form.imgUrl
          }
        }).then(response => {
          this.reload()
          let res = response.data;
          console.log(res)
        }).catch(function (err) {
          console.log(err)
        });
        this.dialogFormVisible = false;
      },
      cancel(){
        this.reload();
        this.dialogFormVisible = false;
      },
/*      handleEdit(index, row) {
        this.dialogStatus = "editdate";
        this.form = this.tableData24[index];
        this.currentIndex = index;
        this.dialogFormVisible = true;
      },*/
      handleEdit(index, row) {
        var vm = this;
        this.dialogFormVisible = true;
        this.dialogStatus = "editdate";
        this.$axios({
          method: 'get',
          url: 'http://192.168.1.235:8080/exper_front/lecturer/update/'+this.tableData24[index].lecturerId,
        }).then(response => {
          vm.form = response.data.data;
          let res = response.data;
          console.log(res);
        }).catch(function (err) {
          console.log(err)
        });
      },
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该条信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios({
            method: 'get',
            url: 'http://192.168.1.235:8080/exper_front/lecturer/delete/'+this.tableData24[index].lecturerId,
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
