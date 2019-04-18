<template>
  <div>
    <el-row style="margin-top: 5px">
    <el-button @click="clearFilter" style="margin: 5px 15px 0 15px">清除筛选</el-button>
    <el-button type="primary" @click="add" style="float:right;margin-right:30px">新增课程信息</el-button>
    </el-row>
    <el-table :data="tableData22.slice((currentPage-1)*pagesize,currentPage*pagesize).filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))" border style="width: 100%">
      <el-table-column prop="courseName" label="教学课程" sortable></el-table-column>
      <el-table-column prop="teacher" label="教学老师" sortable></el-table-column>
      <el-table-column prop="type" label="类型" sortable  column-key="date"
                       :filters="[{text: '必修', value: '必修'},
                   {text: '选修', value: '选修'}]" :filter-method="filterHandler">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
      <el-table-column align="right">
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
                   :total="tableData22.length">
    </el-pagination>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="教学课程" :label-width="formLabelWidth">
          <el-input v-model="form.courseName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="教学老师" :label-width="formLabelWidth">
          <el-input v-model="form.teacher" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-select v-model="form.type" placeholder="课程类型">
            <el-option label="必修" value="必修"></el-option>
            <el-option label="选修" value="选修"></el-option>
          </el-select>
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
    name: "deal-course",
    data() {
      return {
        currentPage:1,
        pagesize:5,
        tableData22: [{
          courseId:'1',
          courseName:'通信技术',
          teacher:'崔老师',
          type:'必修'
        },
          {
            courseId:'12',
            courseName:'图像处理',
            teacher:'崔老师',
            type:'必修'
          },{
            courseId:'13',
            courseName:'通信技术',
            teacher:'崔老师',
            type:'必修'
          },{
            courseId:'17',
            courseName:'通信技术',
            teacher:'崔老师',
            type:'必修'
          },{
            courseId:'14',
            courseName:'计算机基础',
            teacher:'崔老师',
            type:'必修'
          },{
            courseId:'15',
            courseName:'通信技术',
            teacher:'崔老师',
            type:'必修'
          }],
        dialogFormVisible: false,
        formLabelWidth: '100px',
        form: {},
        currentIndex: '',
        dialogStatus: "",
        textMap: {
          update: "新增课程信息",
          editdate: "修改课程信息"
        },
        search:''
      }
    },
    methods: {
      clearFilter() {
        this.$refs.filterTable.clearFilter();
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      handleSizeChange: function (size) {
        this.pagesize = size;
        console.log(this.pagesize);
      },
      handleCurrentChange: function(currentPage){
        this.currentPage = currentPage;
        console.log(this.currentPage);
      },
      add() {
        this.dialogStatus = "update";
        this.form = {
          name: '',
          teacher:'',
          institute:'',
          introduce: '',
          desc:''
        };
        this.dialogFormVisible = true;
      },
      update() {
        this.form.date = reformat(this.form.date);
        this.tableData22.push(this.form);
        this.dialogFormVisible = false;
      },
      editdate() {
        this.dialogFormVisible = false;
      },
      cancel() {
        this.dialogFormVisible = false;
      },
      handleEdit(index, row) {
        this.dialogStatus = "editdate";
        this.form = this.tableData22[index];
        this.currentIndex = index;
        this.dialogFormVisible = true;
      },
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该条信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.tableData22.splice(index, 1);
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
  .course-table-expand {
    font-size: 0
  }
  .labelColor .el-form-item__label{
    width: 90px;
    color: #99a9bf
  }
  .course-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%
  }
</style>
