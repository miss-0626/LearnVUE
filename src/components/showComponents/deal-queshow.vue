<template>
  <div>
    <el-row style="margin-top: 5px">
    <el-button @click="clearFilter">清除筛选</el-button>
      <el-button type="primary" @click="add" style="float:right;margin-right:30px">新增设备</el-button>
    </el-row>
    <el-table ref="filterTable" :data="tableData18.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%">
      <el-table-column label="设备图片" prop="img" width="200">
        <template slot-scope="props">
          <el-popover placement="right" title="" trigger="click">
            <img :src="props.row.img" style="max-width:300px;max-height:300px"/>
            <img slot="reference" :src="props.row.img" :alt="props.row.img" style="width:100px;height:100px" class="image">
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="equiNum" label="设备编号" width="150"></el-table-column>
      <el-table-column prop="equiName" label="设备名称" width="150"></el-table-column>
      <el-table-column prop="labNum" label="所属实验室"></el-table-column>
      <el-table-column prop="state" label="状态"
                       :filters="[{ text: '占用', value: '占用' },
                                  { text: '空闲', value: '空闲' }]"
                       :filter-method="filterTag" filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag :type="scope.row.state === '占用' ? '空闲' : 'success'"
                  disable-transitions>{{scope.row.state}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
      <el-table-column align="right" width="230">
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
                   :total="tableData18.length">
    </el-pagination>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="设备名称" :label-width="formLabelWidth">
          <el-input v-model="form.equiNum" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="设备名称" :label-width="formLabelWidth">
          <el-input v-model="form.equiName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属实验室" :label-width="formLabelWidth">
          <el-input  v-model="form.labNum" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-input  v-model="form.state" auto-complete="off"></el-input>
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
        currentPage:1,
        pagesize:5,
        tableData18: [
          {
            img: '../static/image/示波器.jpg',
            equiId:'1',
            equiNum:'1-101',
            equiName:'示波器',
            labNum:'8-520',
            state:'空闲'
          },{
            img: '../static/image/示波器.jpg',
            equiId:'1',
            equiNum:'1-101',
            equiName:'示波器',
            labNum:'8-520',
            state:'空闲'
          },{
            img: '../static/image/示波器.jpg',
            equiId:'1',
            equiNum:'1-101',
            equiName:'示波器',
            labNum:'8-520',
            state:'空闲'
          },{
            img: '../static/image/示波器.jpg',
            equiId:'1',
            equiNum:'1-101',
            equiName:'示波器',
            labNum:'8-520',
            state:'空闲'
          },{
            img: '../static/image/示波器.jpg',
            equiId:'1',
            equiNum:'1-101',
            equiName:'示波器',
            labNum:'8-520',
            state:'空闲'
          },{
            img: '../static/image/示波器.jpg',
            equiId:'1',
            equiNum:'1-101',
            equiName:'示波器',
            labNum:'8-520',
            state:'空闲'
          },{
            img: '../static/image/示波器.jpg',
            equiId:'1',
            equiNum:'1-101',
            equiName:'示波器',
            labNum:'8-520',
            state:'空闲'
          }],
        search:'',
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
          quename: '',
          introduce: ''
        };
        this.dialogFormVisible = true;
      },
      update() {
        this.form.date = reformat(this.form.date);
        this.tableData18.push(this.form);
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
        this.form = this.tableData18[index];
        this.currentIndex = index;
        this.dialogFormVisible = true;
      },
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该条信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.tableData18.splice(index, 1);
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
