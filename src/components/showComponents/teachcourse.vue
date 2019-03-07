<template>
  <div>
    <el-button @click="clearFilter" style="margin: 5px 15px 0 15px">清除筛选</el-button>
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
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入教学课程搜索"/>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "teachcourse",
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
