<template>
  <div>
    <el-row style="margin-top: 5px">
    <el-button @click="clearFilter">清除筛选</el-button>
    <el-button type="primary" @click="add" style="float:right;margin-right:30px">新增成绩</el-button>
    </el-row>
    <el-table ref="filterTable" :data="tableData8" style="width: 100%">
      <el-table-column prop="number" label="学号" sortable></el-table-column>
      <el-table-column prop="name" label="姓名" sortable></el-table-column>
      <el-table-column prop="year" label="学年"sortable  column-key="date"
                       :filters="[{text: '2018-2019', value: '2018-2019'},
                                  {text: '2017-2018', value: '2017-2018'},
                                  {text: '2016-2017', value: '2016-2017'},
                                  {text: '2015-2016', value: '2015-2016'}]" :filter-method="filterHandler">
      </el-table-column>
      <el-table-column prop="term" label="学期" sortable  column-key="date"
                       :filters="[{text: '1', value: '1'},
                                  {text: '2', value: '2'}]" :filter-method="filterHandler">
      </el-table-column>
      <el-table-column prop="course" label="课程名称" sortable></el-table-column>
      <el-table-column prop="score" label="成绩" sortable></el-table-column>
      <el-table-column prop="institute" label="开课学院" sortable  column-key="date"
                       :filters="[{text: '物理与电信工程学院', value: '物理与电信工程学院'},
                   {text: '信息光电子科技学院', value: '信息光电子科技学院'},
                   {text: '化学与环境学院', value: '化学与环境学院'},
                   {text: '华南先进光电子研究院', value: '华南先进光电子研究院'}]" :filter-method="filterHandler">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

<!--    <div class="page">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page.sync="currentPage3" :page-size="100"
                     layout="prev, pager, next, jumper" :total="1000">
      </el-pagination>
    </div>-->

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="学号" :label-width="formLabelWidth">
          <el-input v-model="form.number" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="学年" :label-width="formLabelWidth">
          <el-select v-model="form.year" placeholder="学年">
            <el-option label="2018-2019" value="2018-2019"></el-option>
            <el-option label="2017-2018" value="2017-2018"></el-option>
            <el-option label="2016-2017" value="2016-2017"></el-option>
            <el-option label="2015-2016" value="2015-2016"></el-option>
          </el-select>
        </el-form-item><el-form-item label="学期" :label-width="formLabelWidth">
        <el-select v-model="form.term" placeholder="学期">
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
        </el-select>
      </el-form-item>
        <el-form-item label="课程名称" :label-width="formLabelWidth">
          <el-select v-model="form.course" placeholder="课程名称">
            <el-option label="通信技术" value="通信技术"></el-option>
            <el-option label="计算机基础" value="计算机基础"></el-option>
            <el-option label="数据结构" value="数据结构"></el-option>
            <el-option label="课程设计" value="课程设计"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="成绩" :label-width="formLabelWidth">
          <el-input v-model="form.score" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="开课学院" :label-width="formLabelWidth">
          <el-select v-model="form.institute" placeholder="开课学院">
            <el-option label="物理与电信工程学院" value="物理与电信工程学院"></el-option>
            <el-option label="化学与环境学院" value="化学与环境学院"></el-option>
            <el-option label="信息光电子科技学院" value="信息光电子科技学院"></el-option>
            <el-option label="华南先进光电子研究院" value="华南先进光电子研究院"></el-option>
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
    name: "add-score",
    data() {
      return {
        tableData8: [{
          number:'201500001',
          name:'小明',
          year:'2018-2019',
          term:'1',
          course:'通信技术',
          score:'90',
          institute:'物理与电信工程学院'
        },{
          number:'201500004',
          name:'小明',
          year:'2018-2019',
          term:'2',
          course:'通信技术',
          score:'90',
          institute:'信息光电子科技学院'
        },{
          number:'201500071',
          name:'小明',
          year:'2017-2018',
          term:'2',
          course:'通信技术',
          score:'90',
          institute:'物理与电信工程学院'
        },{
          number:'201500032',
          name:'小明',
          year:'2015-2016',
          term:'1',
          course:'通信技术',
          score:'90',
          institute:'华南先进光电子研究院'
        },{
          number:'201500011',
          name:'小明',
          year:'2016-2017',
          term:'2',
          course:'通信技术',
          score:'90',
          institute:'物理与电信工程学院'
        },{
          number:'201500008',
          name:'小明',
          year:'2017-2018',
          term:'1',
          course:'通信技术',
          score:'90',
          institute:'物理与电信工程学院'
        },{
          number:'201500005',
          name:'小明',
          year:'2015-2016',
          term:'2',
          course:'通信技术',
          score:'90',
          institute:'化学与环境学院'
        }],
        dialogFormVisible: false,
        formLabelWidth: '80px',
        form: {},
        currentIndex: '',
        dialogStatus: "",
        textMap: {
          update: "新增学生信息",
          editdate: "修改学生信息"
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
          number: '',
          name: '',
          year: '',
          term: '',
          course: '',
          score: '',
          institute: ''
        };
        this.dialogFormVisible = true;
      },
      update() {
        this.form.date = reformat(this.form.date);
        this.tableData8.push(this.form);
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
        this.form = this.tableData8[index];
        this.currentIndex = index;
        this.dialogFormVisible = true;
      },
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该条信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.tableData8.splice(index, 1);
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
