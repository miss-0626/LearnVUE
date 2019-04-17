<template>
  <div>
    <el-row style="margin-top: 5px">
  <el-button @click="clearFilter">清除筛选</el-button>
    <el-date-picker style="margin-left: 150px" v-model="data" type="date" placeholder="选择借用日期"></el-date-picker>
    <el-select v-model="time" placeholder="选择借用时间">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
    <el-button style="margin-left: 50px"  @click="handlefind(data,time)">空实验室查询</el-button>
    </el-row>
  <el-table ref="filterTable" :data="tableData3.slice((currentPage-1)*pagesize,currentPage*pagesize).filter(data => !search || data.labNum.toLowerCase().includes(search.toLowerCase()))" style="width: 100%">
    <el-table-column prop="labNum" label="实验室编号" sortable ></el-table-column>
    <el-table-column prop="labName" label="实验室名称" ></el-table-column>
    <el-table-column prop="state" label="状态"
                     :filters="[{ text: '占用', value: '占用' }, { text: '空闲', value: '空闲' }]"
      :filter-method="filterTag" filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag :type="scope.row.state === '占用' ? '空闲' : 'success'"
          disable-transitions>{{scope.row.state}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="操作">
    <template slot-scope="scope">
      <el-button size="mini" @click="handleuse(scope.$index, scope.row)">申请借用</el-button>
    </template>
    </el-table-column>
    <el-table-column align="right" width="220">
      <template slot="header" slot-scope="scope">
        <el-input v-model="search" size="mini" placeholder="输入实验室编号搜索">
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
                   :total="tableData3.length">
    </el-pagination>

    <el-dialog :title="实验室借用申请" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules">
        <el-form-item label="借用人学号" :label-width="formLabelWidth" prop="number">
          <el-input v-model="form.number" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="实验室编号" :label-width="formLabelWidth" prop="labNum">
          <el-input v-model="form.labNum" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="实验室名称" :label-width="formLabelWidth" prop="labName">
          <el-input v-model="form.labName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述用途" :label-width="formLabelWidth" prop="use">
          <el-input type="textarea" v-model="form.use" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="借用日期" :label-width="formLabelWidth" prop="data">
          <el-date-picker  v-model="data" type="date" placeholder="选择借用日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="借用时间" :label-width="formLabelWidth" prop="time">
          <el-select v-model="time" placeholder="选择借用时间">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="cancel">取 消</el-button>
        <el-button type="primary" @click="borrow">申 请</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
    export default {
        name: "labstate",
      data() {
        return {
          currentPage:1,
          pagesize:5,
          data:'',
          time:'',
          options: [{
            value: '选项1',
            label: '第1,2节'
          }, {
            value: '选项2',
            label: '第3,4节'
          }, {
            value: '选项3',
            label: '第5,6节'
          }, {
            value: '选项4',
            label: '第7,8节'
          }, {
            value: '选项5',
            label: '第9,10,11节'
          }, {
            value: '选项6',
            label: '上午'
          }, {
            value: '选项7',
            label: '下午'
          }, {
            value: '选项8',
            label: '白天'
          },{
            value: '选项9',
            label: '晚上'
          },{
          value: '选项10',
            label: '整天'
        }],
          tableData3: [{
            labId:'1',
            labNum:'6-210',
            labName: '物理实验室',
            state: '空闲'
          },{
            labId:'1',
            labNum:'6-212',
            labName: '硬件实验室',
            state: '占用'
          },{
            labId:'1',
            labNum:'8-207',
            labName: '电子实验室',
            state: '占用'
          },{
            labId:'1',
            labNum:'8-314',
            labName: '电子实验室',
            state: '空闲'
          },{
            labId:'1',
            labNum:'8-512',
            labName: '光学实验室',
            state: '空闲'
          },{
            labId:'1',
            labNum:'6-312',
            labName: '硬件实验室',
            state: '空闲'
          },{
            labId:'1',
            labNum:'8-501',
            labName: '光学实验室',
            state: '空闲'
          }],
          dialogFormVisible: false,
          formLabelWidth: '100px',
          form: {},
          currentIndex: '',
          search:'',
          rules: {
            number:   [{required: true, message: '请输入学号', trigger: 'blur'}],
            name:     [{required: true, message: '请输入姓名', trigger: 'blur'}],
            labNum :  [{required: true, message: '请输入借用实验室编号', trigger: 'blur'}],
            labName : [{required: true, message: '请输入借用实验室名称', trigger: 'blur'}],
            use:      [{required: true, message: '请描述用途', trigger: 'blur'}]
          }
        };
      },
      methods: {
        clearFilter() {
          this.$refs.filterTable.clearFilter();
        },
        filterTag(value, row) {
          return row.state === value;
        },
        filterHandler(value, row, column) {
          const property = column['property'];
          return row[property] === value;
        },
        handleuse(index, row) {
          this.form = {
            number: '',
            name: '',
            labname: '',
            use:'',
            data: '',
            time: ''
          };
          this.dialogFormVisible = true;
        },
        handlefind(data,time) {
          console.log(index, row);
        },
        cancel(){
          this.dialogFormVisible = false;
        },
        borrow(){
          this.dialogFormVisible = false;
        },
        handleSizeChange: function (size) {
          this.pagesize = size;
          console.log(this.pagesize);
        },
        handleCurrentChange: function(currentPage){
          this.currentPage = currentPage;
          console.log(this.currentPage);
        }
      }
    }
</script>

<style scoped>

</style>
