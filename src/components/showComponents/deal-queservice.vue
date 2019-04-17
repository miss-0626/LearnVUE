<template>
  <div>
    <el-row>
      <el-col class="head">
        <span>设备维护管理</span>
      </el-col>
    </el-row>
    <el-table :data="tableData21.slice((currentPage-1)*pagesize,currentPage*pagesize)" height="450"  border style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="lab-table-expand">
            <el-form-item class="labelColor" label="设备问题">
              <span>{{ props.row.problem}}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column sortable prop="quename" label="设备名称" ></el-table-column>
      <el-table-column sortable prop="quenumber" label="设备编号" ></el-table-column>
      <el-table-column prop="msg" label="问题说明"></el-table-column>
      <el-table-column label="状态" prop="state" sortable align="center">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.state==='已维修'">{{scope.row.state}}</el-tag>
          <el-tag type="info" v-else-if="scope.row.state==='待维修'">{{scope.row.state}}</el-tag>
          <el-tag v-else="scope.row.state==='待处理'">{{scope.row.state}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作"  width="180">
        <template slot-scope="scope">
          <el-button size="small" type="success" @click="handlepass(scope.$index, scope.row)">维修完成</el-button>
          <el-button size="small" type="primary" @click="handlenot(scope.$index, scope.row)">处理</el-button>
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
                   :total="tableData21.length">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: "deal-queservice",
    data() {
      return {
        currentPage:1,
        pagesize:5,
        tableData21: [{
          quename: '示波器',
          quenumber:'100-01',
          problem: '无法启动',
          state: '待处理',
          msg: '展开查看'
        },
          {
            quename: '示波器',
            quenumber:'100-01',
            problem: '无法启动',
            state: '待处理',
            msg: '展开查看'
          },
          {
            quename: '示波器',
            quenumber:'100-01',
            problem: '无法启动',
            state: '待处理',
            msg: '展开查看'
          },
          {
            quename: '示波器',
            quenumber:'100-01',
            problem: '无法启动',
            state: '待处理',
            msg: '展开查看'
          },
          {
            quename: '示波器',
            quenumber:'100-01',
            problem: '无法启动',
            state: '待处理',
            msg: '展开查看'
          },
          {
            quename: '示波器',
            quenumber:'100-01',
            problem: '无法启动',
            state: '待处理',
            msg: '展开查看'
          },
          {
            quename: '示波器',
            quenumber:'100-01',
            problem: '无法启动',
            state: '待处理',
            msg: '展开查看'
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
        this.$confirm('确认该设备已能正常使用吗?', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {//编辑保存
          row.state = '已维修';
          that.$message({
            type: 'success',
            message: '维修完成!'
          })
        }).catch(function () {  //编辑取消
          that.$message({
            type: 'info',
            message: '继续维修.'
          });
        });
      },
      handlenot(index, row) {
        var that = this;
        this.$confirm('确认开始维修该设备吗?', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'info'
        }).then(function () {//编辑保存
          row.state = '待维修';
          that.$message({
            type: 'success',
            message: '请尽快维修!'
          })
        }).catch(function () {  //编辑取消
          that.$message({
            type: 'info',
            message: '放弃处理.'
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
  .queservice-table-expand {
    font-size: 0
  }
  .labelColor .el-form-item__label{
    width: 90px;
    color: #99a9bf
  }
  .queservice-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%
  }
</style>
