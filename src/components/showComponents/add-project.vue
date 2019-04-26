<template>
  <div>
  <el-row style="margin-top: 5px">
  <el-col class="head">
    <span>我的项目</span>
  <el-button type="primary" @click="add" style="float:right;margin-right:30px">新增项目</el-button>
  </el-col>
  </el-row>
  <el-table :data="tableData14.slice((currentPage-1)*pagesize,currentPage*pagesize)" height="450"  border style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="project-table-expand">
          <el-form-item class="labelColor" label="学生自荐">
            <span>{{ props.row.selfdesc}}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
      <el-table-column sortable prop="project" label="项目名称" ></el-table-column>
      <el-table-column label="申报学生信息">
             <el-table-column sortable prop="number" label="学号"></el-table-column>
             <el-table-column prop="name" label="姓名"></el-table-column>
             <el-table-column prop="self" label="申请信息"></el-table-column>
      </el-table-column>
    <el-table-column label="状态" prop="state" sortable align="center">
      <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.state==='已接受'">{{scope.row.state}}</el-tag>
          <el-tag type="danger" v-else-if="scope.row.state==='已拒绝'">{{scope.row.state}}</el-tag>
          <el-tag v-else="scope.row.state==='待处理'">{{scope.row.state}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="small" type="primary" @click="handlepass(scope.$index, scope.row)">接受</el-button>
        <el-button size="small" type="danger" @click="handlenot(scope.$index, scope.row)">拒绝</el-button>
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
                   :total="tableData14.length">
    </el-pagination>

    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="项目名称" :label-width="formLabelWidth">
          <el-input v-model="form.project" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="指导老师" :label-width="formLabelWidth">
          <el-input v-model="form.teacher" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="归属学院" :label-width="formLabelWidth">
          <el-select v-model="form.institute" placeholder="归属学院">
            <el-option label="物理与电信工程学院" value="物理与电信工程学院"></el-option>
            <el-option label="信息光电子科技学院" value="信息光电子科技学院"></el-option>
            <el-option label="化学与环境学院" value="化学与环境学院"></el-option>
            <el-option label="华南先进光电子研究院" value="华南先进光电子研究院"></el-option>
          </el-select>
        </el-form-item>
          <el-form-item label="项目详情" :label-width="formLabelWidth">
            <el-input type="textarea" v-model="form.descproject" auto-complete="off"></el-input>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="cancel">取 消</el-button>
        <el-button type="primary" @click="upproject">新 增</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import { reformat } from '../../common/reformartDate'

    export default {
      name: "add-project",
      data() {
        return {
          currentPage:1,
          pagesize:5,
          title:'新增项目',
          tableData14: [{
            project: '蓝桥杯',
            number: '20153100001',
            name: '小明',
            self: '展开查看',
            state:'待处理',
            selfdesc:'尊敬的校领导：\n' +
              '您好!\n' +
              '首先，真诚地感谢你从百忙之中抽出时间来看我的自荐材料'
          },
            {
              project: '蓝桥杯',
              number: '20153100001',
              name: '小明',
              self: '展开查看',
              state:'待处理',
              selfdesc:'尊敬的校领导：\n' +
                '您好!\n' +
                '首先，真诚地感谢你从百忙之中抽出时间来看我的自荐材料'
            }, {
              project: '蓝桥杯',
              number: '20153100001',
              name: '小明',
              self: '展开查看',
              state:'待处理',
              selfdesc:'尊敬的校领导：\n' +
                '您好!\n' +
                '首先，真诚地感谢你从百忙之中抽出时间来看我的自荐材料'
            }, {
              project: '挑战杯',
              number: '20153100001',
              name: '小明',
              self: '展开查看',
              state:'已接受',
              selfdesc:'尊敬的校领导：\n' +
                '您好!\n' +
                '首先，真诚地感谢你从百忙之中抽出时间来看我的自荐材料'
            }, {
              project: '挑战杯',
              number: '20153100001',
              name: '小明',
              self: '展开查看',
              state:'待处理',
              selfdesc:'尊敬的校领导：\n' +
                '您好!\n' +
                '首先，真诚地感谢你从百忙之中抽出时间来看我的自荐材料'
            }, {
              project: '蓝桥杯',
              number: '20153100001',
              name: '小明',
              self: '展开查看',
              state:'已拒绝',
              selfdesc:'尊敬的校领导：\n' +
                '您好!\n' +
                '首先，真诚地感谢你从百忙之中抽出时间来看我的自荐材料'
            }],
          dialogFormVisible: false,
          formLabelWidth: '80px',
          form: {},
          currentIndex: ''
        };
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
        add() {
          this.form = {
            project: '',
            teacheer: '',
            institute: '',
            descproject: ''
          };
          this.dialogFormVisible = true;
        },
        handlepass(index, row) {
          var that = this;
          this.$confirm('确认接受该学生的申请吗?', '提示', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'info'
          }).then(function () {//编辑保存
            row.state = '已接受';
            that.$message({
              type: 'success',
              message: '接受成功!'
            })
          }).catch(function () {  //编辑取消
            that.$message({
              type: 'info',
              message: '放弃接受.'
            });
          });
        },
        handlenot(index, row) {
          var that = this;
          this.$confirm('确认拒绝该学生的申请吗?', '提示', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(function () {//编辑保存
            row.state = '已拒绝';
            that.$message({
              type: 'success',
              message: '已拒绝该学生的申请!'
            })
          }).catch(function () {  //编辑取消
            that.$message({
              type: 'info',
              message: '放弃拒绝.'
            });
          });
        },
        upproject() {
          this.form.date = reformat(this.form.date);
          this.tableData14.push(this.form);
          this.dialogFormVisible = false;
        },
        cancel(){
          this.dialogFormVisible = false;
        }
      }
      }
</script>

<style>
  .head{
    font-weight: normal;
    font-size: x-large;
    color: dimgray;
    background-color: aliceblue;
    margin: 0;
    padding: 5px 15px;
  }
  .project-table-expand {
    font-size: 0
  }
  .labelColor .el-form-item__label{
    width: 90px;
    color: #99a9bf
  }
  .project-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%
  }
</style>
