<template>
  <div>
    <el-button @click="clearFilter" style="margin: 5px 15px 0 15px">清除筛选</el-button>
    <el-table ref="filterTable" :data="tableData7.slice((currentPage-1)*pagesize,currentPage*pagesize).filter(data => !search || data.courseName.toLowerCase().includes(search.toLowerCase()))" style="width: 100%">
      <el-table-column prop="courseName" label="教学课程" sortable></el-table-column>
      <el-table-column prop="lecturer" label="教学老师" sortable></el-table-column>
      <el-table-column prop="courseType" label="类型" sortable  column-key="date"
                       :filters="[{text: '必修', value: '必修'},
                                  {text: '选修', value: '选修'}]" :filter-method="filterTag">
      </el-table-column>
      <el-table-column label="详情">
        <template slot-scope="scope">
          <el-button v-if="role === 1" size="small" type="primary"><router-link tag="a" class="detail-link" :to="{path:'Teacher-course-detail',query:{courseId:scope.row.courseId}}">查看详情</router-link></el-button>
          <el-button v-if="role === 2" size="small" type="primary"><router-link tag="a" class="detail-link" :to="{path:'Student-course-detail',query:{courseId:scope.row.courseId}}">查看详情</router-link></el-button>
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
        tableData7: [],
        search:''
      }
    },
    mounted() {
      const userrole = JSON.parse(sessionStorage.getItem('用户角色'));
      this.role = userrole;

      var vm = this;
      this.$axios({
        method: 'get',
        url: 'http://192.168.1.235:8080/exper_front/course/list'
      }).then(response => {
        if(response.data === ''){
        this.$router.push({path: '/Login'})
      }else{
        vm.tableData7 = response.data.data;
        let tableData7 = response.data.data;
        console.log(tableData7)
      }
    }).catch(function (err) {
        console.log(err);
      })
    },
    methods: {
      clearFilter() {
        this.$refs.filterTable.clearFilter();
      },
      filterTag(value, row) {
        return row.courseType === value;
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
  .detail-link{
    color:white;
  }
  a {
    text-decoration: none;
  }
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
