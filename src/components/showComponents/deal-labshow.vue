<template>
  <div>
    <el-row style="margin-top: 5px">
    <el-button @click="clearFilter" style="margin: 5px 15px 0 15px">清除筛选</el-button>
    <el-button type="primary" @click="add" style="float:right;margin-right:30px">新增实验室</el-button>
    </el-row>
    <el-table :data="tableData16.slice((currentPage-1)*pagesize,currentPage*pagesize)" border style="width: 100%">
      <el-table-column prop="labNum" label="实验室编号" sortable></el-table-column>
      <el-table-column prop="labName" label="实验室名称"></el-table-column>
      <el-table-column prop="state" label="占用状态"
                       :filters="[{ text: '占用', value: '占用' }, { text: '空闲', value: '空闲' }]"
                       :filter-method="filterTag" filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag :type="scope.row.state === '占用' ? '空闲' : 'success'"
                  disable-transitions>{{scope.row.state}}</el-tag>
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
        <el-form-item label="实验室编号" :label-width="formLabelWidth">
          <el-input v-model="form.labNum" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="实验室名称" :label-width="formLabelWidth">
          <el-input v-model="form.labName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="实验室状态" :label-width="formLabelWidth">
          <el-input v-model="form.state" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="实验室负责人" :label-width="formLabelWidth">
          <el-input v-model="form.lecturer" auto-complete="off"></el-input>
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
    data() {
      return {
        currentPage:1,
        pagesize:5,
        tableData16: [{
          labId:'1',
          labNum:'8-520',
          labName: '物理实验室',
          state: '空闲',
          lecturer: '张老师'
        },
          {
            labId:'2',
            labNum:'8-520',
            labName: '物理实验室',
            state: '空闲',
            lecturer: '张老师'
          },{
            labId:'3',
            labNum:'8-520',
            labName: '物理实验室',
            state: '占用',
            lecturer: '张老师'
          },{
            labId:'4',
            labNum:'8-520',
            labName: '物理实验室',
            state: '空闲',
            lecturer: '张老师'
          },{
            labId:'5',
            labNum:'8-520',
            labName: '物理实验室',
            state: '空闲',
            lecturer: '张老师'
          },{
            labId:'6',
            labNum:'8-520',
            labName: '物理实验室',
            state: '占用',
            lecturer: '张老师'
          },{
            labId:'7',
            labNum:'8-520',
            labName: '物理实验室',
            state: '空闲',
            lecturer: '张老师'
          }],
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
          institute: '',
          address: '',
          introduce: '',
          desc: ''
        };
        this.dialogFormVisible = true;
      },
      update() {
        this.form.date = reformat(this.form.date);
        this.tableData16.push(this.form);
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
//        this.editRow = JSON.stringify(this.tableData8[index]);
        this.form = this.tableData16[index];
        this.currentIndex = index;
        this.dialogFormVisible = true;
      },
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该条信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.tableData16.splice(index, 1);
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
