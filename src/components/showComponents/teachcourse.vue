<template>
  <div>
    <el-button @click="clearFilter" style="margin: 5px 15px 0 15px">清除筛选</el-button>
    <el-table :data="tableData7.slice((currentPage-1)*pagesize,currentPage*pagesize).filter(data => !search || data.courseName.toLowerCase().includes(search.toLowerCase()))" style="width: 100%">
      <el-table-column prop="courseName" label="教学课程" sortable></el-table-column>
      <el-table-column prop="teacher" label="教学老师" sortable></el-table-column>
      <el-table-column prop="type" label="类型" sortable  column-key="date"
                       :filters="[{text: '必修', value: '必修'},
                   {text: '选修', value: '选修'}]" :filter-method="filterHandler">
      </el-table-column>
      <el-table-column label="详情">
        <template slot-scope="scope">
          <router-link tag="a" :to="{name:'course-detail',query:{courseId:scope.row.courseId}}">查看详情</router-link>
          <!--<router-link tag="a" target="_blank" :to="{name:'course-detail',query:{courseId:scope.row.courseId}}">查看详情</router-link>-->
        </template>
      </el-table-column>
      <el-table-column align="right" width="220">
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
                   :total="tableData7.length">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: "teachcourse",
    data() {
      return {
        currentPage:1,
        pagesize:5,
        tableData7: [{
          courseId:'1',
          courseName:'通信技术',
          teacher:'崔老师',
          type:'必修'
        },
          {
            courseId:'12',
            courseName:'图像处理',
            teacher:'崔老师',
            type:'必修'
          },{
            courseId:'13',
            courseName:'通信技术',
            teacher:'崔老师',
            type:'必修'
          },{
            courseId:'17',
            courseName:'通信技术',
            teacher:'崔老师',
            type:'必修'
          },{
            courseId:'14',
            courseName:'计算机基础',
            teacher:'崔老师',
            type:'必修'
          },{
            courseId:'15',
            courseName:'通信技术',
            teacher:'崔老师',
            type:'必修'
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
