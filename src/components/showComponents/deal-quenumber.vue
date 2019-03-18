<template>
  <div>
    <el-row style="margin-top: 5px">
    <el-button @click="clearFilter">清除筛选</el-button>
    <el-button type="primary" @click="add" style="float:right;margin-right:30px">新增设备信息</el-button>
    </el-row>
    <el-table ref="filterTable" :data="tableData2" style="width: 100%">
      <el-table-column prop="quename" label="设备名称" ></el-table-column>
      <el-table-column prop="number" label="设备编号"></el-table-column>
      <el-table-column prop="labname" label="实验室名称" ></el-table-column>
      <el-table-column prop="institute" label="归属学院" sortable  column-key="date"
                       :filters="[{text: '物理与电信工程学院', value: '物理与电信工程学院'},
                   {text: '信息光电子科技学院', value: '信息光电子科技学院'},
                   {text: '化学与环境学院', value: '化学与环境学院'},
                   {text: '华南先进光电子研究院', value: '华南先进光电子研究院'}]" :filter-method="filterHandler">
      </el-table-column>
      <el-table-column prop="address" label="实验室地址"   :formatter="formatter"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="设备名称" :label-width="formLabelWidth">
          <el-input v-model="form.quename" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="设备编号" :label-width="formLabelWidth">
          <el-input v-model="form.number" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="实验室名称" :label-width="formLabelWidth">
          <el-input v-model="form.labname" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="归属学院" :label-width="formLabelWidth">
          <el-select v-model="form.institute" placeholder="归属学院">
            <el-option label="物理与电信工程学院" value="物理与电信工程学院"></el-option>
            <el-option label="信息光电子科技学院" value="信息光电子科技学院"></el-option>
            <el-option label="化学与环境学院" value="化学与环境学院"></el-option>
            <el-option label="华南先进光电子研究院" value="华南先进光电子研究院"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="实验室地址" :label-width="formLabelWidth">
          <el-input v-model="form.address" auto-complete="off"></el-input>
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
    name: "deal-quenumber",
    data() {
      return {
        tableData2: [{
          quename:'XX示波器',
          number:'10-001',
          labname:'物理实验室',
          institute:'物理与电信工程学院',
          address: '理八-520'
        },
          {
            quename:'XX示波器',
            number:'10-001',
            labname:'物理实验室',
            institute:'化学与环境学院',
            address: '理八-520'
          },
          {
            quename:'XX示波器',
            number:'10-001',
            labname:'物理实验室',
            institute:'信息光电子科技学院',
            address: '理八-520'
          },
          {
            quename:'XX示波器',
            number:'10-001',
            labname:'物理实验室',
            institute:'物理与电信工程学院',
            address: '理八-520'
          },
          {
            quename:'XX示波器',
            number:'10-001',
            labname:'物理实验室',
            institute:'信息光电子科技学院',
            address: '理八-520'
          },
          {
            quename:'XX示波器',
            number:'10-001',
            labname:'物理实验室',
            institute:'华南先进光电子研究院',
            address: '理八-520'
          },
          {
            quename:'XX示波器',
            number:'10-001',
            labname:'物理实验室',
            institute:'化学与环境学院',
            address: '理八-520'
          },{
            quename:'XX示波器',
            number:'10-001',
            labname:'物理实验室',
            institute:'华南先进光电子研究院',
            address: '理八-520'
          },{
            quename:'XX示波器',
            number:'10-001',
            labname:'物理实验室',
            institute:'物理与电信工程学院',
            address: '理八-520'
          }],
        dialogFormVisible: false,
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
    methods: {
      clearFilter() {
        this.$refs.filterTable.clearFilter();
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      add() {
        this.dialogStatus = "update";
        this.form = {
          quename: '',
          number: '',
          labname: '',
          institute: '',
          address: ''
        };
        this.dialogFormVisible = true;
      },
      update() {
        this.form.date = reformat(this.form.date);
        this.tableData2.push(this.form);
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
        this.form = this.tableData2[index];
        this.currentIndex = index;
        this.dialogFormVisible = true;
      },
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该条信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.tableData2.splice(index, 1);
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

<style scoped>

</style>
