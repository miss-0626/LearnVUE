<template>
  <div>
    <el-row>
      <el-col class="head">
        <span >实验室管理</span>
      </el-col>
    </el-row>
    <el-table :data="tableData17.slice((currentPage-1)*pagesize,currentPage*pagesize)" height="450"  border style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="lab-table-expand">
            <el-form-item class="labelColor" label="实验室用途">
              <span>{{ props.row.use}}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column sortable prop="labNum" label="实验室编号" ></el-table-column>
      <el-table-column sortable prop="labName" label="实验室名称" ></el-table-column>
      <el-table-column label="申请学生信息">
        <el-table-column sortable prop="number" label="学号"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="msg" label="用途说明"></el-table-column>
      </el-table-column>
      <el-table-column sortable prop="data" label="借用日期" ></el-table-column>
      <el-table-column sortable prop="time" label="借用时间" ></el-table-column>
      <el-table-column label="状态" prop="state" sortable align="center">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.state==='已允许'">{{scope.row.state}}</el-tag>
          <el-tag type="danger" v-else-if="scope.row.state==='已拒绝'">{{scope.row.state}}</el-tag>
          <el-tag v-else="scope.row.state==='待处理'">{{scope.row.state}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="handlepass(scope.$index, scope.row)">允许</el-button>
          <el-button size="small" type="danger" @click="handlenot(scope.$index, scope.row)">拒绝</el-button>
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
                   :total="tableData17.length">
    </el-pagination>
  </div>
</template>

<script>
    export default {
        name: "deal-labstate",
      data() {
        return {
          currentPage:1,
          pagesize:5,
          tableData17: [{
            labNum:'8-213',
            labName: '硬件实验室',
            number: '20153100001',
            name: '小明',
            msg: '展开查看',
            data: '2019-03-01',
            time: '整天',
            state: '待处理',
            use: '用于做课程设计'
          },
            {
              labNum:'6-202',
              labName: '物理实验室',
              number: '20153100034',
              name: '小黄',
              msg: '展开查看',
              data: '2019-03-01',
              time: '整天',
              state: '待处理',
              use: '用于做课程设计'
            },{
              labNum:'6-230',
              labName: '电子实验室',
              number: '20153100051',
              name: '小红',
              msg: '展开查看',
              data: '2019-03-01',
              time: '整天',
              state: '待处理',
              use: '用于做课程设计'
            },{
              labNum:'8-210',
              labName: '光学实验室',
              number: '20153100121',
              name: '小明',
              msg: '展开查看',
              data: '2019-03-01',
              time: '整天',
              state: '待处理',
              use: '用于做课程设计'
            },{
              labNum:'8-203',
              labName: '物理实验室',
              number: '20153100005',
              name: '小明',
              msg: '展开查看',
              data: '2019-03-01',
              time: '整天',
              state: '待处理',
              use: '用于做课程设计'
            },{
              labNum:'8-205',
              labName: '物理实验室',
              number: '20153100011',
              name: '小明',
              msg: '展开查看',
              data: '2019-03-01',
              time: '整天',
              state: '待处理',
              use: '用于做课程设计'
            }],
          form: {},
          currentIndex: ''
        };
      },
      methods: {
        handleSizeChange: function (size) {
          this.pagesize = size;
          console.log(this.pagesize);
        },
        handleCurrentChange: function(currentPage){
          this.currentPage = currentPage;
          console.log(this.currentPage);
        },
        handlepass(index, row) {
          var that = this;
          this.$confirm('确认允许该学生的申请吗?', '提示', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'info'
          }).then(function () {//编辑保存
            row.state = '已允许';
            that.$message({
              type: 'success',
              message: '成功!'
            })
          }).catch(function () {  //编辑取消
            that.$message({
              type: 'info',
              message: '放弃决定.'
            });
          });
        },
        handlenot(index, row) {
          var that = this;
          this.$confirm('确认拒绝该学生的申请吗?', '提示', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(function () {//编辑保存
            row.state = '已拒绝';
            that.$message({
              type: 'success',
              message: '已拒绝该学生的申请!'
            })
          }).catch(function () {  //编辑取消
            that.$message({
              type: 'info',
              message: '放弃拒绝.'
            });
          });
        },
      }
    }
</script>

<style>
  .head{
    font-weight: normal;
    font-size: x-large;
    color: dimgray;
    background-color: aliceblue;
    margin: 0;
    padding: 5px 15px;
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
