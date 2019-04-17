<template>
  <div>
    <el-row style="margin-top: 5px">
      <el-button @click="clearFilter">清除筛选</el-button>
      <el-date-picker style="margin-left: 150px" v-model="data" type="date" placeholder="选择借用日期"></el-date-picker>
      <el-select v-model="time" placeholder="选择借用时间">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-button style="margin-left: 50px"  @click="handlefind(data,time)">空闲设备查询</el-button>
    </el-row>
    <el-table ref="filterTable" :data="tableData6.slice((currentPage-1)*pagesize,currentPage*pagesize).filter(data => !search || data.equiName.toLowerCase().includes(search.toLowerCase()))" style="width: 100%">
      <el-table-column prop="equiNum" label="设备编号"></el-table-column>
      <el-table-column prop="equiName" label="设备名称"></el-table-column>
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
          <el-button size="mini" @click="handleuse(scope.$index, scope.row)">申请借用</el-button>
        </template>
      </el-table-column>
      <el-table-column align="right" width="220">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入设备名称搜索">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination style="padding-left: 30px"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="currentPage"
                   :page-sizes="[5, 10, 20, 40]"
                   :page-size="pagesize"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="tableData6.length">
    </el-pagination>

    <el-dialog :title="设备借用申请" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules">
        <el-form-item label="借用人学号" :label-width="formLabelWidth" prop="number">
          <el-input v-model="form.number" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="设备名称" :label-width="formLabelWidth" prop="quename">
          <el-input v-model="form.quename" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="设备编号" :label-width="formLabelWidth" prop="quenumber">
          <el-input  v-model="form.quenumber" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述设备用途" :label-width="formLabelWidth"prop="use">
          <el-input type="textarea" v-model="form.use" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="借用日期" :label-width="formLabelWidth">
          <el-date-picker  v-model="data" type="date" placeholder="选择借用日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="借用时间" :label-width="formLabelWidth">
          <el-select v-model="time" placeholder="选择借用时间">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer;margin-top: 5px">
        <el-button type="danger" @click="cancel">取 消</el-button>
        <el-button type="primary" @click="borrow">申 请</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: "questate",
    data() {
      return {
        currentPage:1,
        pagesize:5,
        data:'',
        time:'',
        search:'',
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
        tableData6: [ {
          equiId:'1',
          equiNum:'1-101',
          equiName:'示波器',
          labNum:'8-520',
          state:'空闲'
        },
          {
            equiId:'11',
            equiNum:'1-101',
            equiName:'信号发生器',
            labNum:'8-520',
            state:'占用'
          },{
            equiId:'12',
            equiNum:'1-101',
            equiName:'示波器',
            labNum:'8-520',
            state:'空闲'
          },{
            equiId:'13',
            equiNum:'1-101',
            equiName:'信号发生器',
            labNum:'8-520',
            state:'占用'
          },{
            equiId:'15',
            equiNum:'1-101',
            equiName:'信号发生器',
            labNum:'8-520',
            state:'空闲'
          },{
            equiId:'18',
            equiNum:'1-101',
            equiName:'示波器',
            labNum:'8-520',
            state:'空闲'
          }],
        dialogFormVisible: false,
        formLabelWidth: '100px',
        form: {},
        currentIndex: '',
        rules: {
          number:   [{required: true, message: '请输入学号', trigger: 'blur'}],
          name:     [{required: true, message: '请输入姓名', trigger: 'blur'}],
          quename : [{required: true, message: '请输入借用设备名称', trigger: 'blur'}],
          quenumber:   [{required: true, message: '请输入设备编号', trigger: 'blur'}],
          use:      [{required: true, message: '请描述用途', trigger: 'blur'}]
        }
      }
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
          quename: '',
          quenumber:'',
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
