<template>
  <div>
    <el-button @click="clearFilter" style="margin: 5px 15px 0 15px">清除筛选</el-button>
    <el-table ref="filterTable" :data="tableData2.slice((currentPage-1)*pagesize,currentPage*pagesize).filter(data => !search || data.labNum.toLowerCase().includes(search.toLowerCase()))" style="width: 100%">
      <!--<el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="lab-table-expand">
            <el-form-item class="labelColor" label="详细介绍">
              <span>{{ props.row.desc}}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>-->
      <el-table-column prop="labNum" label="实验室编号" sortable></el-table-column>
      <el-table-column prop="labName" label="实验室名称"></el-table-column>
      <el-table-column prop="isUsed" label="占用状态"
                       :filters="[{ text: '占用', value: '占用' }, { text: '空闲', value: '空闲' }]"
                       :filter-method="filterTag" filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag :type="scope.row.isUsed === '空闲' ? '占用' : 'danger'"
                  disable-transitions>{{scope.row.isUsed}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="lecturer" label="实验室负责人"></el-table-column>
      <el-table-column label="详情">
        <template slot-scope="scope">
          <el-button  v-if="role === 1" size="small" type="primary"><router-link tag="a" class="detail-link" :to="{path:'Teacher-lab-detail',query:{labId:scope.row.labId}}">查看详情</router-link></el-button>
          <el-button  v-if="role === 2" size="small" type="primary"><router-link tag="a" class="detail-link" :to="{path:'Student-lab-detail',query:{labId:scope.row.labId}}">查看详情</router-link></el-button>
          <!--<router-link tag="a" target="_blank" :to="{name:'lab-detail',query:{labId:scope.row.labId}}">查看详情</router-link>-->
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
                   :total="tableData2.length">
    </el-pagination>
  </div>
</template>

<script>
    export default {
        name: "labshow",
      data() {
        return {
          currentPage:1,
          pagesize:10,
          search:'',
          role:'',
          tableData2: []
        }
      },

      mounted(){
        const userrole = JSON.parse(sessionStorage.getItem('用户角色'));
        this.role = userrole;

        var vm = this;
        this.$axios({
          method: 'get',
          url: 'http://47.101.137.101:8080/exper_front/lab/list'
        }).then(response => {
          if(response.data === ''){
          this.$router.push({path: '/Login'})
        }else{
          vm.tableData2 = response.data.data;
          let tableData2 = response.data.data[0];
          console.log(tableData2)
        }
      }).catch(function (err) {
          console.log(err)
        })
      },
      methods: {
        clearFilter() {
          this.$refs.filterTable.clearFilter();
        },
        filterTag(value, row) {
          return row.isUsed === value;
        },
        handleSizeChange: function (size) {
          this.pagesize = size;
          console.log(this.pagesize);
        },
        handleCurrentChange: function(currentPage){
          this.currentPage = currentPage;
          console.log(this.currentPage);
        }
        // handlelook(index,row){
        //   this.$router.push({path: 'lab-detail'});
        // }
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
  .lab-table-expand {
    font-size: 0
  }
  .labelColor .el-form-item__label{
    width: 90px;
    color: #99a9bf
  }
  .lab-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%
  }
</style>
