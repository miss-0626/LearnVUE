<template>
  <div>
    <el-row style="margin-top: 5px">
    <el-button @click="clearFilter" style="margin: 5px 15px 0 15px">清除筛选</el-button>
    <el-button type="primary" @click="add" style="float:right;margin-right:30px">新增实验室</el-button>
    </el-row>
    <el-table ref="filterTable" :data="tableData16.slice((currentPage-1)*pagesize,currentPage*pagesize)" border style="width: 100%">
      <el-table-column label="id" prop="labId" v-if="not"></el-table-column>
      <el-table-column prop="labNum" label="实验室编号" sortable></el-table-column>
      <el-table-column prop="labName" label="实验室名称"></el-table-column>
      <el-table-column prop="labSum" label="实验室简介" v-if="not"></el-table-column>
      <el-table-column label="开放时间" sortable>
        <template slot-scope="scope">
         <span>{{scope.row.openDate}}</span>至<span>{{scope.row.closeDate}}</span>
        </template>
      </el-table-column>
<!--      <el-table-column prop="closeData" label="关闭时间"></el-table-column>-->
      <el-table-column prop="isUsed" label="占用状态"
                       :filters="[{ text: '占用', value: '占用' }, { text: '空闲', value: '空闲' }]"
                       :filter-method="filterTag" filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag :type="scope.row.isUsed === '空闲' ? '占用' : 'danger'"
                  disable-transitions>{{scope.row.isUsed}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="lecturer" label="实验室负责人"></el-table-column>
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
                   :total="tableData16.length">
    </el-pagination>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="id" :label-width="formLabelWidth" v-show="not">
          <el-input v-model="form.labId" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="实验室编号" :label-width="formLabelWidth">
          <el-input v-model="form.labNum" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="实验室名称" :label-width="formLabelWidth">
          <el-input v-model="form.labName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="实验室简介" :label-width="formLabelWidth">
          <el-input v-model="form.labSum" type="textarea" :rows="3" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="开放时间" :label-width="formLabelWidth" prop="time">
          <el-date-picker v-model="form.openDate"  @change="getSTime1" value-format="yyyy-MM-dd" type="date" placeholder="请选择开放时间"></el-date-picker>
          <el-date-picker v-model="form.closeDate" @change="getSTime2" value-format="yyyy-MM-dd"  type="date" placeholder="请选择关闭时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="实验室状态" :label-width="formLabelWidth">
          <el-select v-model="form.isUsed" placeholder="请选择">
            <el-option v-for="item in options" :key="item.isUsed" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="实验室负责人" :label-width="formLabelWidth">
          <el-select v-model="form.lecturer" placeholder="请选择">
            <el-option v-for="item in selects" :key="item" :label="item" :value="item"></el-option>
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
    name: "deal-labshow",
    inject: ['reload'],
    data() {
      return {
        currentPage:1,
        pagesize:5,
        not:false,
        options: [{
          value: '空闲',
          label: '空闲'
        }, {
          value: '占用',
          label: '占用'
        }],
        selects:[],
        tableData16: [],
        dialogFormVisible: false,
        formLabelWidth: '100px',
        form: {},
        currentIndex: '',
        dialogStatus: "",
        textMap: {
          update: "新增实验室信息",
          editdate: "修改实验室信息"
        },
      }
    },
    mounted() {
      var vm = this;
      this.$axios({
        method: 'get',
        url: 'http://192.168.1.235:8080/exper_front/lab/list'
      }).then(response => {
        if(response.data === ''){
          this.$router.push({path: '/Login'})
        }else{
          vm.tableData16 = response.data.data;
          let tableData16 = response.data.data;
          console.log(tableData16)
        }
      }).catch(function (err) {
        console.log(err)
      })
    },
    methods: {
      filterTag(value, row) {
        return row.isUsed === value;
      },
      clearFilter() {
        this.$refs.filterTable.clearFilter();
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
          labId: '',
          labNum:'',
          labName:'',
          labSum:'',
          lecturer:'',
          isUsed:'',
          openDate:'',
          closeDate:''
        };
        this.dialogFormVisible = true;
      },
      update() {
        var vm = this;
        this.$axios({
          method: 'post',
          url: 'http://192.168.1.235:8080/exper_front/lab/add',
          data:{
            labId: '',
            labNum:this.form.labNum,
            labName:this.form.labName,
            labSum:this.form.labSum,
            lecturer:this.form.lecturer,
            isUsed:this.form.isUsed,
            openDate:this.form.openDate,
            closeDate:this.form.closeDate
          }
        }).then(response => {
          if(response.data === ''){
            this.$router.push({path: '/Login'})
          }else{
            this.reload();
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
      editdate(){
        this.$axios({
          method: 'post',
          url: 'http://192.168.1.235:8080/exper_front/lab/update',
          data: {
            labId: this.form.labId,
            labNum:this.form.labNum,
            labName:this.form.labName,
            labSum:this.form.labSum,
            lecturer:this.form.lecturer,
            isUsed:this.form.isUsed,
            openDate:this.form.openDate,
            closeDate:this.form.closeDate
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
        this.dialogFormVisible = false;
      },
      handleEdit(index, row) {
        var vm = this;
        this.dialogFormVisible = true;
        this.dialogStatus = "editdate";
        this.$axios({
          method: 'get',
          url: 'http://192.168.1.235:8080/exper_front/lab/update/'+this.tableData16[index].labId,
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
            url: 'http://192.168.1.235:8080/exper_front/lab/delete/'+this.tableData16[index].labId,
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
      },
      getSTime1(val) {
        this.form.openDate = val;
      },
      getSTime2(val) {
        this.form.closeDate = val;
      }
    }
  }
</script>

<style>
  .lab-table-expand {
    font-size: 0
  }
  .labelColor .el-form-item__label{
    width: 90px;
    color: #99a9bf
  }
  .lab-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%
  }
</style>
