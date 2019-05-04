<template>
  <div class="header">
  <el-container>
<!--    <el-header style="text-align: right; font-size: 13px">
      <el-row :gutter="20">
        <el-col :span="1">
          <div class="picture"><img src="../assets/hslogo.jpg" style="width:95px;height:100px"></div>
          &lt;!&ndash;<div class="picture"><img src="../assets/logo_school.png" style="width:350px;height:80px"></div>&ndash;&gt;
        </el-col>
          &lt;!&ndash;<img src="../static/image//word.png">&ndash;&gt;
          <el-col :span="12">
            <div class="title"><span style="font-size: 50px;font-family: 楷体;color: black;">综合实验教学管理平台</span></div>
          </el-col>
        <el-col :span="11"><div class="welcome">
        <span style="margin-right: 15px;font-weight:bold">欢迎 {{username}}</span>
        <el-dropdown>
          <i class="el-icon-setting" ></i>
          <el-dropdown-menu slot="dropdown">
           &lt;!&ndash; <el-dropdown-item><el-label  @click="loginout">退出登录</el-label></el-dropdown-item>&ndash;&gt;
            <el-dropdown-item @click.native="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        </div>
        </el-col>
      </el-row>
    </el-header>-->
    <el-header style="text-align: right; font-size: 13px">
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="picture"><img src="../../static/image/logo_school.png"></div>
        </el-col>
        <!--<img src="../assets/word.png">-->
        <el-col :span="12">
          <div class="title"><span style="font-size: 50px;font-family: 楷体;color: white;">综合实验教学管理平台</span></div>
        </el-col>
        <el-col :span="8"><div class="welcome" style="margin-bottom: 5px">
          <span style="margin-right: 15px;font-weight:bold">欢迎 {{username}}</span>
          <el-dropdown>
            <i class="el-icon-setting" ></i>
            <el-dropdown-menu slot="dropdown">
              <!-- <el-dropdown-item><el-label  @click="loginout">退出登录</el-label></el-dropdown-item>-->
              <el-dropdown-item @click.native="loginout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        </el-col>
      </el-row>
    </el-header>
  </el-container>
  </div>
</template>

<script>
  // import { setCookie,getCookie,delCookie } from '../common/cookie.js'

    export default {
        name: "show",
      data(){
          return{
            username:''
          }
      },
      mounted(){
        const name = JSON.parse(sessionStorage.getItem('用户名称'))
        this.username = name;
/*        /!*页面挂载获取保存的cookie值，渲染到页面上*!/
        let uname = getCookie('username');
        this.username = uname;
        this.$emit('transferUser',this.username);
        /!*如果cookie不存在，则跳转到登录页*!/
        if(uname === ""){
          this.$router.push({path: '/Login'})
        }*/
      },
      methods:{
        loginout(){
          this.$confirm('确认要退出系统吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$axios({
            method: 'get',
            url: 'http://47.101.137.101:8080/exper_front/front/logout'
          }).then(response => {
            if(response.data.meta.success === true){
            this.$router.push({path: '/Login'});
            this.$message({
              type: 'success',
              message: '已退出登录'
            })
          }
        }).catch(function (err) {
            console.log(err)
          })
        }).catch(() => {
        })
        }

      }
    }
</script>

<style scoped>
  .header{
    height: 105px;
    color: #333;
    /*background-color: #ffffff;*/
    background-color: #2D8AB8;
  }
  .el-header {
    background-color: #2D8AB8;
    /*background-color: #ffffff;*/
    color: #333;
    line-height: 65px;
  }
  .picture{
    margin:18px;
  }
  .title{
    margin:20px;
  }
  .welcome{
    margin:50px 15px;
  }
</style>
