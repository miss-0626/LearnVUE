<template>
  <div>
    <el-row style="margin-top: 5px">
    <el-button @click="clearFilter">清除筛选</el-button>
      <el-button type="primary" @click="add" style="float:right;margin-right:30px">新增设备</el-button>
    </el-row>
    <el-table ref="filterTable" :data="tableData2" style="width: 100%">
      <el-table-column prop="quename" label="设备名称" width="150" column-key="date"
                       :filters="[{text: '示波器', value: '示波器'},
                                  {text: '高频信号发生器', value: '高频信号发生器'},
                                  {text: '频谱仪', value: '频谱仪'},
                                  {text: '计算机', value: '计算机'}]" :filter-method="filterHandler">
      </el-table-column>
      <el-table-column prop="introduce" label="设备基本信息及用途"></el-table-column>
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
        <el-form-item label="设备基本信息及用途" :label-width="formLabelWidth">
          <el-input  type="textarea" v-model="form.introduce" auto-complete="off"></el-input>
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
    data() {
      return {
        tableData2: [{
          quename:'示波器',
          introduce: '这是一条示波器介绍'
        },
          {
            quename:'计算机',
            introduce: '这是一条计算机介绍'
          },
          {
            quename:'高频信号发生器',
            introduce: '这是一条高频信号发生器介绍'
          },
          {
            quename:'高频信号发生器',
            introduce: '这是一条高频信号发生器介绍'
          },
          {
            quename:'频谱仪',
            introduce: '这是一条频谱仪介绍'
          },
          {
            quename:'频谱仪',
            introduce: '这是一条频谱仪介绍'
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
          introduce: ''
        };
        this.dialogFormVisible = true;
      },
      update() {
        this.form.date = reformat(this.form.date);
        this.tableData2.push(this.form);
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
