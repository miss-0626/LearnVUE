<template>
  <el-row>
    <el-col :span="24">
      <h2 class="title" style="text-align: center">个人信息</h2>

      <div v-if="Teacherform" style="font-size: large;margin: 50px 400px;border:1px solid #99a9bf;border-radius: 2px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)">
        <p><a>用户名</a>  &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp    {{userName}} </p>
        <p><a>手机</a>   &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp   {{number}} </p>
        <p><a>邮箱</a>   &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp   {{email}} </p>
        <p><a>角色</a>   &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp   {{role}} </p>
        <p><a>注册时间</a>   &nbsp&nbsp&nbsp&nbsp&nbsp   {{registerTime}} </p>
      </div>

      <div v-if="Studentform"  style="font-size: large;margin: 50px 400px;border:1px solid #99a9bf;border-radius: 2px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)">
        <div style="padding:5px 0px 5px 100px">
          <p><a>用户名</a>  &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp    {{userName}}</p>
          <p><a>学号</a>  &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp    {{number}}</p>
          <p><a>邮箱</a>  &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp    {{email}}</p>
          <p><a>角色</a>  &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp   {{role}}</p>
          <p><a>注册时间</a>   &nbsp&nbsp&nbsp&nbsp&nbsp   {{registerTime}}</p>
        </div>
      </div>

    </el-col>
  </el-row>
</template>

<script>

  export default {
    name: "pmessage",
    data(){
      return{
        userName:'',
        number:'',
        email:'',
        role:'',
        registerTime:'',
        Teacherform:false,
        Studentform:false,
        Managerform:false
/*        dialogFormVisible: false,
        formLabelWidth: '100px',
        form: {}*/
      }
    },
    mounted(){
      var vm = this;
      this.$axios({
        method: 'post',
        url: 'http://47.101.137.101:8080/exper_front/info/detail',
        data:{}
      }).then(response => {
        let res = response.data
        console.log(res)
        if(response.data === ''){
        this.$router.push({path: '/Login'})
      }else{
          vm.userName = response.data.data.userName;
          vm.number = response.data.data.number;
          vm.email = response.data.data.email;
          vm.role = response.data.data.role;
          vm.registerTime = response.data.data.registerTime;
      if(response.data.data.role === "student") {
        this.Studentform = true;
      }else{
        this.Teacherform = true;
      }
    }
    }).catch(function (err) {
        console.log(err);
      })
    }
  }
</script>

<style scoped>
  a{
    color: #99a9bf
  }
</style>
