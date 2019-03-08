<template>
  <div>
    <el-row style="margin-top: 5px">
  <el-button @click="clearFilter">清除所有过滤器</el-button>
    <el-date-picker style="margin-left: 150px" v-model="value1" type="date" placeholder="选择借用日期"></el-date-picker>
    <el-select v-model="value2" placeholder="选择借用时间">
      <el-option v-for="item in options" :key="item.value2" :label="item.label" :value="item.value2">
      </el-option>
    </el-select>
    <el-button style="margin-left: 50px"  @click="handlefind(value1,value2)">空实验室查询</el-button>
    </el-row>
  <el-table ref="filterTable" :data="tableData3" style="width: 100%">
    <el-table-column prop="name" label="实验室名称" ></el-table-column>
    <el-table-column prop="institute" label="归属学院" sortable  column-key="date"
                     :filters="[{text: '物理与电信工程学院', value: '物理与电信工程学院'},
                   {text: '信息光电子科技学院', value: '信息光电子科技学院'},
                   {text: '化学与环境学院', value: '化学与环境学院'},
                   {text: '华南先进光电子研究院', value: '华南先进光电子研究院'}]" :filter-method="filterHandler">
    </el-table-column>
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
  </el-table>

    <el-dialog :title="实验室借用申请" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="借用人学号" :label-width="formLabelWidth">
          <el-input v-model="form.number" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="实验室名称" :label-width="formLabelWidth">
          <el-input v-model="form.labname" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述用途" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.use" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="借用日期" :label-width="formLabelWidth">
          <el-date-picker  v-model="value1" type="date" placeholder="选择借用日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="借用时间" :label-width="formLabelWidth">
          <el-select v-model="value2" placeholder="选择借用时间">
            <el-option v-for="item in options" :key="item.value2" :label="item.label" :value="item.value2">
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
          value1:'',
          value2:'',
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
            name: '物理实验室',
            institute:'物理与电信工程学院',
            state: '空闲'
          },{
            name: '物理实验室',
            institute:'物理与电信工程学院',
            state: '空闲'
          },{
            name: '物理实验室',
            institute:'化学与环境学院',
            state: '占用'
          },{
            name: '物理实验室',
            institute:'物理与电信工程学院',
            state: '空闲'
          },{
            name: '物理实验室',
            institute:'化学与环境学院',
            state: '占用'
          },{
            name: '物理实验室',
            institute:'物理与电信工程学院',
            state: '空闲'
          }],
          dialogFormVisible: false,
          formLabelWidth: '100px',
          form: {},
          currentIndex: '',
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
            labname: '',
            use:'',
            value1: '',
            value2: ''
          };
          this.dialogFormVisible = true;
        },
        handlefind(value1,value2) {
          console.log(index, row);
        },
        cancel(){
          this.dialogFormVisible = false;
        },
        borrow(){
          this.dialogFormVisible = false;
        }
      }
    }
</script>

<style scoped>

</style>
