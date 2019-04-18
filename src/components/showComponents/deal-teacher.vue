<template>
  <div>
    <el-row style="margin-top: 5px">
      <el-button type="primary" @click="add" style="float:right;margin-right:30px">新增导师</el-button>
    </el-row>
    <el-table :data="tableData24.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%">
      <el-table-column label="肖像" prop="img">
        <template slot-scope="props">
          <el-popover placement="right" title="" trigger="click">
            <img :src="props.row.img" style="max-width:300px;max-height:300px"/>
            <img slot="reference" :src="props.row.img" :alt="props.row.img" style="width:100px;height:100px" class="image">
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="导师" prop="name"></el-table-column>
      <el-table-column label="职称" prop="identity"></el-table-column>
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
        <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :file-list="imgList" v-model="form.img"
                   :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="innerVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>

        <el-form-item label="导师" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="职称" :label-width="formLabelWidth">
          <el-input v-model="form.identity" auto-complete="off"></el-input>
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
    name: "dea-teacher",
    data() {
      return {
        currentPage:1,
        pagesize:5,
        imgList: [{ url: '../static/image/tzl.png'}],
        tableData24: [{
          teacherId:'1',
          img: '../static/image/tzl.png',
          name: '唐志列',
          identity:'物理与电信工程学院院长'
        },
          {
            teacherId:'11',
            img: '../static/image/tzl.png',
            name: '唐志列',
            identity:'物理与电信工程学院院长'
          },{
            teacherId:'13',
            img: '../static/image/tzl.png',
            name: '唐志列',
            identity:'物理与电信工程学院院长'
          },{
            teacherId:'14',
            img: '../static/image/tzl.png',
            name: '唐志列',
            identity:'物理与电信工程学院院长'
          },{
            teacherId:'19',
            img: '../static/image/tzl.png',
            name: '唐志列',
            identity:'物理与电信工程学院院长'
          }],
        dialogFormVisible: false,
        innerVisible: false,
        dialogImageUrl: '',
        formLabelWidth: '100px',
        form: {},
        currentIndex: '',
        dialogStatus: "",
        textMap: {
          update: "新增导师信息",
          editdate: "修改导师信息"
        },
      }
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
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.innerVisible = true;
      },
      add() {
        this.dialogStatus = "update";
        this.form = {
          img:'',
          name: '',
          sex: '',
          identity: '',
          majoy: '',
          desc: ''
        };
        this.dialogFormVisible = true;
      },
      update() {
        this.form.date = reformat(this.form.date);
        this.tableData24.push(this.form);
        this.dialogFormVisible = false;
      },
      editdate(){
        this.dialogFormVisible = false;
      },
      cancel(){
        this.dialogFormVisible = false;
      },
      handleEdit(index, row) {
        this.dialogStatus = "editdate";
        this.form = this.tableData24[index];
        this.currentIndex = index;
        this.dialogFormVisible = true;
      },
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该条信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.tableData24.splice(index, 1);
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
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
