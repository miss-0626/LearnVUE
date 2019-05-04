<template>
  <div class="back">
    <el-row :span="24" class="back">
      <div class="detail" style="margin:10px 25px 10px 20px;padding:1px 15px 55px 15px;border:1px;border-width:5px; background-color: white; border-radius: 4px;">
        <p style="text-align: center;color: royalblue;font-size: x-large"> {{head}} </p>
        <p> <hr size="2px"/> </p>
        <div style="font-size: large;white-space:pre-wrap;margin: 0 100px;">
          <img :src="imgUrl" style="max-width:300px;max-height:300px"/>
          <p><a>设备编号</a>      {{equiNum}} </p>
          <p><a>设备名称</a>      {{equiName}} </p>
          <p><a>所属实验室编号</a>      {{labNum}} </p>
          <p><a>状态</a>      {{state}} </p>
          <p><a>备注</a>      {{remark}} </p>
        </div>
        <p style="text-align: center;" v-if="state==='可预约'"> <el-button type="primary" @click="handleuse()">预约</el-button></p>
        <p style="text-align: center;" v-if="!(state==='可预约')"> <el-button type="danger" disabled>不可预约</el-button></p>
      </div>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "que-detail",
    inject: ['reload'],
    data(){
      return {
        id:'',
        head: '设备详情',
        imgUrl:'',
        equiNum:'',
        equiName:'',
        labNum:'',
        state:'',
        remark:''
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
      getParams:function(){
        var routerParams = this.$route.query.equiId;
        console.log("传来的参数=="+routerParams);
        this.id = routerParams
      },
      handleuse() {
        if (this.state === '占用') {
          this.$message({
            type: 'error',
            message: '该实验设备已被占用！',
            showClose: true
          })
        } else {
          this.$axios({
            method: 'get',
            url: 'http://47.101.137.101:8080/exper_front/equi/book/' + this.id
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
        url: 'http://47.101.137.101:8080/exper_front/equi/detail/'+this.id
      }).then(response=>{
        if(response.data === ''){
        this.$router.push({path: '/Login'})
      }else
      {
        let res = response.data;
        console.log(res);
        vm.imgUrl = response.data.data.imgUrl;
        vm.equiNum = response.data.data.equiNum;
        vm.equiName = response.data.data.equiName;
        vm.labNum = response.data.data.labNum;
        vm.state = response.data.data.state;
        vm.remark = response.data.data.remark;
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
 /*   position:fixed;*/
/*    overflow-y:scroll;
    overflow-x:hidden;*/
  }
  a{
    color: #99a9bf
  }
</style>
