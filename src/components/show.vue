<template>
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-row :gutter="20">
        <el-col :span="16"><div class="grid-content bg-purple">
          <img src="../assets/logo_school.png">
          <img src="../assets/word.png">
        </div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
        <span style="margin-right: 15px">欢迎{{name}}</span>
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click="quit">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
    </el-header>
  </el-container>
</template>

<script>
  import { setCookie,getCookie,delCookie } from '../common/cookie.js'

    export default {
        name: "show",
      data(){
          return{
            name:''
          }
      },
      mounted(){
        /*页面挂载获取保存的cookie值，渲染到页面上*/
        let uname = getCookie('username');
        this.name = uname;
        /*如果cookie不存在，则跳转到登录页*/
        if(uname === ""){
          this.$router.push({path: 'Login'})
        }
      },
      methods:{
        quit(){
          /*删除cookie*/
          this.$router.push({path: 'Login'});
          delCookie('username')
        }
      }
    }
</script>

<style scoped>
  .el-header {
    background-color: #5F9F9F;
    color: #333;
    line-height: 60px;
  }
</style>
