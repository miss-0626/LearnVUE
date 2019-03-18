<template>
  <div>
    <el-row>
      <el-col class="head">
        <span>设备管理</span>
      </el-col>
    </el-row>
    <el-table :data="tableData10" height="450"  border style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="lab-table-expand">
            <el-form-item class="labelColor" label="设备用途">
              <span>{{ props.row.use}}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column sortable prop="quename" label="设备名称" ></el-table-column>
      <el-table-column sortable prop="quenumber" label="设备编号" ></el-table-column>
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
      <el-table-column label="操作"  width="180">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="handlepass(scope.$index, scope.row)">允许</el-button>
          <el-button size="small" type="danger" @click="handlenot(scope.$index, scope.row)">拒绝</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "deal-questate",
    data() {
      return {
        tableData10: [{
          quename: '示波器',
          quenumber:'100-01',
          number: '20153100001',
          name: '小明',
          msg: '展开查看',
          data: '2019-03-01',
          time: '整天',
          state: '待处理',
          use: '用于做课程设计'
        },
          {
            quename: '示波器',
            quenumber:'100-01',
            number: '20153100001',
            name: '小明',
            msg: '展开查看',
            data: '2019-03-01',
            time: '整天',
            state: '待处理',
            use: '用于做课程设计'
          },
          {
            quename: '示波器',
            quenumber:'100-01',
            number: '20153100001',
            name: '小明',
            msg: '展开查看',
            data: '2019-03-01',
            time: '整天',
            state: '待处理',
            use: '用于做课程设计'
          },
          {
            quename: '示波器',
            quenumber:'100-01',
            number: '20153100001',
            name: '小明',
            msg: '展开查看',
            data: '2019-03-01',
            time: '整天',
            state: '待处理',
            use: '用于做课程设计'
          },
          {
            quename: '示波器',
            quenumber:'100-01',
            number: '20153100001',
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
  .que-table-expand {
    font-size: 0
  }
  .labelColor .el-form-item__label{
    width: 90px;
    color: #99a9bf
  }
  .que-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%
  }
</style>
