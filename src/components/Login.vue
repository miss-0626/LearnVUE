<template>
  <div class="login">
  <el-row :span="24" class="login">
    <div style=";margin:120px 400px 0px 400px;border:2px solid #3299cc;border-radius: 4px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)">
    <el-form ref="loginForm" :model="user" :rules="rules" status-icon label-width="100px">
      <el-row type="flex" justify="center">
        <el-col :span="10">
          <el-form-item label-width="70px">
            <span><font color="#1e90ff" size="4">用户登录</font></span>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row type="flex" justify="center">
        <el-col :span="12">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="user.name" placeholder="请输入用户名"></el-input>
      </el-form-item>
        </el-col>
      </el-row>

      <el-row type="flex" justify="center">
        <el-col :span="12">
      <el-form-item label="密码" placeholder="请输入密码" prop="pass">
        <el-input v-model="user.pass" type="password" ></el-input>
      </el-form-item>
        </el-col>
      </el-row>

      <el-row type="flex" justify="center">
      <el-radio-group :span="12" v-model="user.role"  prop="role">
        <el-radio :label="1">教师</el-radio>
        <el-radio :label="2" >学生</el-radio>
        <el-radio :label="3">管理员</el-radio>
      </el-radio-group>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="8">
      <el-form-item>
        <el-button type="primary" icon="el-icon-upload" @click="login">登录</el-button>
      </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    </div>
  </el-row>
  </div>
</template>

<<script>
  export default {
    name:'login',
    data () {
      return {
          user: {
          name: '',
          pass: '',
          role: 2
                }
              }
    },

        rules: {
          name: [
            {required: true, message: '用户名不能为空', trigger: 'blur'}
          ],
          pass: [
            {required: true, message: '密码不能为空', trigger: 'blur'}
          ],
          role: [
            {required: true, message: '请选择角色', trigger: 'blur',type:'number'}
          ]
        },


    methods: {
      login ()
      {
        this.$refs.loginForm.validate((valid) => {
          if(valid) {
            if (this.user.name === 'admin' && this.user.pass === '123' ) {
              this.$notify({
                type: 'success',
                message: '欢迎,' + this.user.name + '登录大数据实验教学管理系统!',
                duration: 3500
              })
              /*this.$router.push({path: 'show'})*/
              if(this.user.role===1){   this.$router.push({path: 'Teacher'})  }
              else if(this.user.role===2){  this.$router.push({path: 'Home'})  }
              else{  this.$router.push({path: 'Manager'})  }
            }
            else {
              this.$message({
                type: 'error',
                message: '用户名或密码错误',
                showClose: true
              })
            }
          }
          else{
            return false
          }
        }
      )
      }
      }
  }
</script>


<style scoped>
.login {
    width: 100%;
    padding-bottom: 31%;
    height: 100%;
    background: url('../assets/login.jpg') no-repeat center center fixed;
    background-size: cover;
    background-color: #0C1424;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
  }
</style>
