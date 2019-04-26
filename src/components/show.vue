<template>
  <el-container>
    <el-header style="text-align: right; font-size: 13px">
      <el-row :gutter="20">
        <el-col :span="16"><div class="grid-content bg-purple">
          <img src="../assets/logo_school.png">
          <img src="../assets/word.png">
        </div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
        <span style="margin-right: 15px;font-weight:bold">欢迎 {{username}}</span>
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
           <!-- <el-dropdown-item><el-label  @click="loginout">退出登录</el-label></el-dropdown-item>-->
            <el-dropdown-item @click.native="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
    </el-header>
  </el-container>
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
            url: 'http://192.168.1.235:8080/exper_front/front/logout'
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
  .el-header {
    background-color: #2D8AB8;
    color: #333;
    line-height: 60px;
  }
</style>
