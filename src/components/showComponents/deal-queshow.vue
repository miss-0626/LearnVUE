<template>
  <div>
    <el-row style="margin-top: 5px">
    <el-button @click="clearFilter">清除筛选</el-button>
      <el-button type="primary" @click="add" style="float:right;margin-right:30px">新增设备</el-button>
    </el-row>
    <el-table ref="filterTable" :data="tableData18.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%">
      <el-table-column label="id" prop="equiId" v-if="not"></el-table-column>
      <el-table-column label="设备图片" prop="img" width="200">
        <template slot-scope="props">
          <el-popover placement="right" title="" trigger="click">
            <img :src="props.row.imgUrl" style="max-width:300px;max-height:300px"/>
            <img slot="reference" :src="props.row.imgUrl" :alt="props.row.imgUrl" style="width:100px;height:100px" class="image">
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="equiNum" label="设备编号" ></el-table-column>
      <el-table-column prop="equiName" label="设备名称" ></el-table-column>
      <el-table-column prop="labNum" label="所属实验室号"></el-table-column>
      <el-table-column prop="state" label="状态"
                       :filters="[{ text: '可预约', value: '可预约' },
                                  { text: '待审核', value: '待审核' },
                                  { text: '占用', value: '占用' }]"
                       :filter-method="filterTag" filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.state==='可预约'">{{scope.row.state}}</el-tag>
          <el-tag type="danger" v-else-if="scope.row.state==='占用'">{{scope.row.state}}</el-tag>
          <el-tag v-else="scope.row.state==='待审核'">{{scope.row.state}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" v-if="not"></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
      <el-table-column align="right" width="200">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入教学课程搜索">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
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
                   :total="tableData18.length">
    </el-pagination>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="设备图片" :label-width="formLabelWidth">
          <el-upload
            ref="upload"
            name="file"
            action="http://47.101.137.101:8080/exper_front/file/upload"
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
          <el-input v-model="form.equiId" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="设备编号" :label-width="formLabelWidth">
          <el-input v-model="form.equiNum" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="设备名称" :label-width="formLabelWidth">
          <el-input v-model="form.equiName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属实验室号" :label-width="formLabelWidth">
          <el-select v-model="form.labNum" placeholder="请选择">
            <el-option v-for="item in selects" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-select v-model="form.state" placeholder="请选择">
            <el-option v-for="item in options" :key="item.state" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input  v-model="form.remark" type="textarea" :rows="3" auto-complete="off"></el-input>
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
  import { reformat } from '../../common/reformartDate'

  export default {
    name: "deal-queshow",
    inject: ['reload'],
    data() {
      return {
        currentPage:1,
        pagesize:5,
        not:false,
        yes:true,
        imgList: [],
        options: [{
          value: '可预约',
          label: '可预约'
        }, {
          value: '占用',
          label: '占用'
        }, {
            value: '待审核',
            label: '待审核'
          }],
        selects:[],
        tableData18: [],
        search:'',
        dialogFormVisible: false,
        innerVisible: false,
        dialogImageUrl: '',
        formLabelWidth: '100px',
        form: {},
        currentIndex: '',
        dialogStatus: "",
        textMap: {
          update: "新增设备信息",
          editdate: "修改设备信息"
        },
      }
    },
    mounted() {
      var vm = this;
      this.$axios({
        method: 'get',
        url: 'http://47.101.137.101:8080/exper_front/equi/lista'
      }).then(response => {
        if(response.data === ''){
          this.$router.push({path: '/Login'})
        }else{
          vm.tableData18 = response.data.data;
          let tableData18 = response.data.data;
          console.log(tableData18)
        }
      }).catch(function (err) {
        console.log(err);
      })
    },
    methods: {
      clearFilter() {
        this.$refs.filterTable.clearFilter();
      },
      filterTag(value, row) {
        return row.state === value;
      },
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
        var vm = this;
        this.$axios({
          method: 'get',
          url: 'http://47.101.137.101:8080/exper_front/lab/name'
        }).then(response => {
          console.log(response)
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
              vm.selects= response.data.data;
              let selects= response.data.data;
              console.log(selects)
            }
          }
        }).catch(function (err) {
          console.log(err);
        })
        this.dialogStatus = "update";
        this.form = {
          imgUrl:'',
          equiName: '',
          equiNum: '',
          labNum:'',
          state:'',
          remark:''
        };
        this.dialogFormVisible = true;
      },
      update() {
        var vm = this;
        this.$axios({
          method: 'post',
          url: 'http://47.101.137.101:8080/exper_front/equi/add',
          data:{
            equiId: '',
            imgUrl: this.form.imgUrl,
            equiName: this.form.equiName,
            equiNum: this.form. equiNum,
            labNum: this.form.labNum,
            state: this.form.state,
            remark: this.form.remark
          }
        }).then(response => {
          if(response.data === ''){
            this.$router.push({path: '/Login'})
          }else{
            this.reload()
            console.log(response);
            this.$notify({
              type: 'success',
              message: response.data.meta.message,
              duration: 1000
            })
          }
        }).catch(function (err) {
          console.log(err);
        });
        this.dialogFormVisible = false;
      },
      editdate() {
        this.$axios({
          method: 'post',
          url: 'http://47.101.137.101:8080/exper_front/equi/update',
          data: {
            imgUrl:this.form.imgUrl,
            equiId: this.form.equiId,
            equiName: this.form.equiName,
            equiNum: this.form.equiNum,
            labNum: this.form.labNum,
            state: this.form.state,
            remark: this.form.remark
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
      cancel() {
        this.dialogFormVisible = false;
      },
      handleEdit(index, row) {
        var vm = this;
        this.$axios({
          method: 'get',
          url: 'http://47.101.137.101:8080/exper_front/lab/name'
        }).then(response => {
          console.log(response)
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
              vm.selects= response.data.data;
              let selects= response.data.data;
              console.log(selects)
            }
          }
        }).catch(function (err) {
          console.log(err);
        })

        this.dialogFormVisible = true;
        this.dialogStatus = "editdate";
        this.$axios({
          method: 'get',
          url: 'http://47.101.137.101:8080/exper_front/equi/update/'+this.tableData18[index].equiId,
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
            url: 'http://47.101.137.101:8080/exper_front/equi/delete/'+this.tableData18[index].equiId,
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

<style scoped>

</style>
