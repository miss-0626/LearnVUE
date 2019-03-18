<template>
  <div>
    <el-row style="margin-top: 5px">
    <el-button @click="clearFilter" style="margin: 5px 15px 0 15px">清除筛选</el-button>
    <el-button type="primary" @click="add" style="float:right;margin-right:30px">新增课程信息</el-button>
    </el-row>
    <el-table :data="tableData2.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))" border style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="course-table-expand">
            <el-form-item class="labelColor" label="详细介绍">
              <span>{{ props.row.desc}}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="教学课程" ></el-table-column>
      <el-table-column prop="teacher" label="教学老师"sortable  column-key="date"
                       :filters="[{text: '崔老师', value: '崔老师'},
                   {text: '张老师', value: '张老师'},
                   {text: '邱老师', value: '邱老师'}]" :filter-method="filterHandler">
      </el-table-column>
      <el-table-column prop="institute" label="归属学院" sortable  column-key="date"
                       :filters="[{text: '物理与电信工程学院', value: '物理与电信工程学院'},
                   {text: '信息光电子科技学院', value: '信息光电子科技学院'},
                   {text: '化学与环境学院', value: '化学与环境学院'},
                   {text: '华南先进光电子研究院', value: '华南先进光电子研究院'}]" :filter-method="filterHandler">
      </el-table-column>
      <el-table-column prop="introduce" label="课程介绍" show-overflow-tooltip="true"></el-table-column>
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
          <el-input v-model="search" size="mini" placeholder="输入教学课程搜索"/>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="教学课程" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="教学老师" :label-width="formLabelWidth">
          <el-select v-model="form.teacher" placeholder="教学老师">
            <el-option label="崔老师" value="崔老师"></el-option>
            <el-option label="张老师" value="张老师"></el-option>
            <el-option label="邱老师" value="邱老师"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="归属学院" :label-width="formLabelWidth">
          <el-select v-model="form.institute" placeholder="归属学院">
            <el-option label="物理与电信工程学院" value="物理与电信工程学院"></el-option>
            <el-option label="信息光电子科技学院" value="信息光电子科技学院"></el-option>
            <el-option label="化学与环境学院" value="化学与环境学院"></el-option>
            <el-option label="华南先进光电子研究院" value="华南先进光电子研究院"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课程介绍" :label-width="formLabelWidth">
          <el-input v-model="form.introduce" auto-complete="展开查看"></el-input>
        </el-form-item>
        <el-form-item label="详细介绍" :label-width="formLabelWidth">
          <el-input  type="textarea" v-model="form.desc" auto-complete="off"></el-input>
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
        tableData2: [{
          name:'通信技术',
          teacher:'崔老师',
          institute:'物理与电信工程学院',
          introduce: '展开查看详情',
          desc:'通信技术实验'
        },{
          name:'计算机基础',
          teacher:'张老师',
          institute:'信息光电子科技学院',
          introduce: '通信技术实验'
        },{
          name:'通信技术',
          teacher:'崔老师',
          institute:'物理与电信工程学院',
          introduce: '通信技术实验'
        },{
          name:'图像处理',
          teacher:'邱老师',
          institute:'华南先进光电子研究院',
          introduce: '通信技术实验'
        },{
          name:'数字信号处理',
          teacher:'张老师',
          institute:'物理与电信工程学院',
          introduce: '通信技术实验'
        },{
          name:'通信技术',
          teacher:'邱老师',
          institute:'物理与电信工程学院',
          introduce: '通信技术实验'
        },{
          name:'通信技术',
          teacher:'崔老师',
          institute:'化学与环境学院',
          introduce: '通信技术实验'
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
