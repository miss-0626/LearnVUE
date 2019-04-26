<template>
  <div>
    <el-row style="margin-top: 5px">
    <el-button @click="clearFilter" style="margin: 5px 15px 0 15px">清除筛选</el-button>
    <el-button type="primary" @click="add" style="float:right;margin-right:30px">新增课程信息</el-button>
    </el-row>
    <el-table ref="filterTable" :data="tableData22.slice((currentPage-1)*pagesize,currentPage*pagesize).filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))" border style="width: 100%">
      <el-table-column label="id" prop="courseId" v-if="not"></el-table-column>
      <el-table-column prop="courseName" label="教学课程" sortable></el-table-column>
      <el-table-column prop="lecturer" label="教学老师" sortable></el-table-column>
      <el-table-column prop="courseSum" label="课程简介" sortable v-if="not"></el-table-column>
      <el-table-column prop="courseType" label="类型" sortable  column-key="date"
                       :filters="[{text: '必修', value: '必修'},
                                  {text: '选修', value: '选修'}]" :filter-method="filterTag">
      </el-table-column>
      <el-table-column label="选课人数/人数上限" v-if="not">
        <template slot-scope="scope">
          <span>{{scope.row.count}}</span>/<span>{{scope.row.limit}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" v-if="not"></el-table-column>
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
          <el-select v-model="form.lecturer" placeholder="请选择">
            <el-option v-for="item in selects" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课程简介" :label-width="formLabelWidth">
          <el-input v-model="form.courseSum" type="textarea" :rows="3" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-select v-model="form.courseType" placeholder="课程类型">
            <el-option label="必修" value="必修"></el-option>
            <el-option label="选修" value="选修"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选课人数" :label-width="formLabelWidth">
          <el-input v-model="form.count" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="人数上限" :label-width="formLabelWidth">
          <el-input v-model="form.limit" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.remark" type="textarea" :rows="3" auto-complete="off"></el-input>
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
    name: "deal-course",
    inject: ['reload'],
    data() {
      return {
        currentPage:1,
        pagesize:5,
        not:false,
        selects:[],
        tableData22: [],
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
    mounted() {
      var vm = this;
      this.$axios({
        method: 'get',
        url: 'http://192.168.1.235:8080/exper_front/course/list'
      }).then(response => {
        if(response.data === ''){
          this.$router.push({path: '/Login'})
        }else{
          vm.tableData22 = response.data.data;
          let tableData22 = response.data.data;
          console.log(tableData22)
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
        return row.courseType === value;
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
        var vm = this;
        this.$axios({
          method: 'get',
          url: 'http://192.168.1.235:8080/exper_front/lecturer/name'
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
          courseName: '',
          lecturer:'',
          courseSum:'',
          courseType: '',
          count:'',
          limit:'',
          remark:''
        };
        this.dialogFormVisible = true;
      },
      update() {
        this.$axios({
          method: 'post',
          url: 'http://192.168.1.235:8080/exper_front/course/add',
          data: {
            courseId:'',
            courseName: this.form.courseName,
            lecturer: this.form.lecturer,
            courseSum: this.form.courseSum,
            courseType: this.form.courseType,
            count: '',
            limit: this.form.limit,
            remark: this.form.remark,
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
      editdate() {
        this.$axios({
          method: 'post',
          url: 'http://192.168.1.235:8080/exper_front/course/update',
          data: {
              courseId: this.form.courseId,
              courseName: this.form.courseName,
              lecturer: this.form.lecturer,
              courseSum: this.form.courseSum,
              courseType: this.form.courseType,
              count: this.form.count,
              limit: this.form.limit,
              remark: this.form.remark,
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
          url: 'http://192.168.1.235:8080/exper_front/lecturer/name'
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
        this.form.courseId = this.tableData22[index].courseId;
        this.$axios({
          method: 'get',
          url: 'http://192.168.1.235:8080/exper_front/course/update/'+this.tableData22[index].courseId,
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
            url: 'http://192.168.1.235:8080/exper_front/course/delete/'+this.tableData22[index].courseId,
          }).then(response => {
            this.reload()
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
