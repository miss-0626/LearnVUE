<template>
  <div>
    <el-button @click="clearFilter" style="margin: 5px 15px 0 15px">清除筛选</el-button>
    <el-table :data="tableData2.slice((currentPage-1)*pagesize,currentPage*pagesize).filter(data => !search || data.labNum.toLowerCase().includes(search.toLowerCase()))" style="width: 100%">
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
      <el-table-column prop="state" label="占用状态"
                       :filters="[{ text: '占用', value: '占用' }, { text: '空闲', value: '空闲' }]"
                       :filter-method="filterTag" filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag :type="scope.row.state === '占用' ? '空闲' : 'success'"
                  disable-transitions>{{scope.row.state}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="lecturer" label="实验室负责人"></el-table-column>
      <el-table-column label="详情">
        <template slot-scope="scope">
          <router-link tag="a" :to="{name:'lab-detail',query:{labId:scope.row.labId}}">查看详情</router-link>
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
          tableData2: [{
              labId:'1',
              labNum:'6-207',
              labName: '物理实验室',
              state: '空闲',
              lecturer: '钟老师'
            },
            {
              labId:'2',
              labNum:'8-212',
              labName: '物理实验室',
              state: '空闲',
              lecturer: '张老师'
            },{
              labId:'3',
              labNum:'8-202',
              labName: '物理实验室',
              state: '占用',
              lecturer: '张老师'
            },{
              labId:'4',
              labNum:'6-210',
              labName: '物理实验室',
              state: '空闲',
              lecturer: '钟老师'
            },{
              labId:'5',
              labNum:'6-201',
              labName: '物理实验室',
              state: '空闲',
              lecturer: '钟老师'
            },{
              labId:'6',
              labNum:'8-207',
              labName: '物理实验室',
              state: '占用',
              lecturer: '张老师'
            },{
              labId:'7',
              labNum:'8-208',
              labName: '物理实验室',
              state: '空闲',
              lecturer: '张老师'
            }]
        }
      },
      methods: {
        clearFilter() {
          this.$refs.filterTable.clearFilter();
        },
        formatter(row, column) {
          return row.address;
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
        // handlelook(index,row){
        //   this.$router.push({path: 'lab-detail'});
        // }
      }
    }
</script>

<style>
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
