<template>
  <div class="back">
    <el-row :span="24" class="back">
    <div class="detail" style="margin:10px 25px 10px 20px;padding:1px 15px 55px 15px;border:1px;border-width:5px; background-color: white; border-radius: 4px;">
      <p style="text-align: center;color: royalblue;font-size: x-large"> {{head}} </p>
      <p> <hr size="2px"/> </p>
      <div style="font-size: large;white-space:pre-wrap;margin: 0 100px;">
        <p><a>实验室编号</a>     {{labNum}} </p>
        <p><a>实验室名称</a>      {{labName}} </p>
        <p><a>实验室简介</a>      {{labSum}} </p>
        <p><a>实验室开放时间</a>      {{openDate}}-{{closeDate}} </p>
        <p><a>占用状态</a>      {{isUsed}} </p>
        <p><a>实验室负责人</a>      {{lecturer}} </p>
      </div>
      <p style="text-align: center;"><el-button v-show="this.isUsed === '空闲'" type="primary" @click="handleuse">借用</el-button>
                     <el-button v-show="this.isUsed === '占用'" disabled type="danger" >占用中</el-button>
      </p>

    </div>
      <p> <hr size="2px"/> </p>
      <div class="table" style="margin: 20px 250px">
        <el-table :data="equiData" style="width: 100%" border>
          <el-table-column prop="equiNum" label="设备编号" width="150" sortable></el-table-column>
          <el-table-column prop="equiName" label="设备名称" width="150"></el-table-column>
          <el-table-column prop="labNum" label="所属实验室"></el-table-column>
          <el-table-column prop="state" label="状态"
                           :filters="[{ text: '占用', value: '占用' },
                                  { text: '可预约', value: '可预约' }]"
                           :filter-method="filterTag" filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-tag type="success" v-if="scope.row.state==='可预约'">{{scope.row.state}}</el-tag>
              <el-tag type="danger" v-else-if="scope.row.state==='占用'">{{scope.row.state}}</el-tag>
              <el-tag v-else="scope.row.state==='待审核'">{{scope.row.state}}</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: "lab-detail",
      inject: ['reload'],
      data(){
        return {
          head: '实验室详情',
          id:'',
          labNum:'',
          labName:'',
          labSum:'',
          openDate:'',
          closeDate:'',
          isUsed:'',
          lecturer:'',
          equiData:[]
        }
      },
      created:function(){
        this.getParams();
      },
      watch: {
        // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
        '$route': 'getParams'
      },
      methods:{
        filterTag(value, row) {
          return row.state === value;
        },
        getParams:function(){
          var routerParams = this.$route.query.labId;
          this.id = routerParams
        },
        handleuse() {
          if (this.isUsed === '占用') {
            this.$message({
              type: 'error',
              message: '该实验室已被占用！',
              showClose: true
            })
          } else {
            this.$axios({
              method: 'get',
              url: 'http://47.101.137.101:8080/exper_front/lab/book/' + this.id
            }).then(response => {
              this.$message({
              type: 'success',
              message: response.data.meta.message,
              showClose: true
            })
            this.reload()
          }).
            catch(function (err) {
              console.log(err)
            });
          }
        }
      },
      mounted(){
        var vm = this;
        this.$axios({
          method: 'get',
          url: 'http://47.101.137.101:8080/exper_front/lab/detail/'+this.id
        }).then(response=>{
          if(response.data === ''){
          this.$router.push({path: '/Login'})
        }else{
          let res = response.data;
          console.log(res);
          vm.labNum = response.data.data.lab.labNum;
          vm.labName = response.data.data.lab.labName;
          vm.labSum = response.data.data.lab.labSum;
          vm.lecturer = response.data.data.lab.lecturer;
          vm.isUsed = response.data.data.lab.isUsed;
          vm.openDate = response.data.data.lab.openDate;
          vm.closeDate = response.data.data.lab.closeDate;
          vm.equiData = response.data.data.equiList;
        }
      }).catch(function(err){
          console.log(err)
        })
      }
    }
</script>

<style scoped>
.back{
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  /*position: fixed;*/
}
  a{
    color: #99a9bf
  }
</style>
