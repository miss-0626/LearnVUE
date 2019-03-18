<template>
  <div class="login">
  <el-row :span="24" class="login">
    <div class="login-wrap" v-show="showLogin"
      style=";margin:120px 400px 0px 400px;border:2px solid #3299cc;border-radius: 4px;">
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
      <el-form-item class="labelColor" label="用户名" prop="name">
        <el-input v-model="user.name" placeholder="请输入用户名"></el-input>
      </el-form-item>
        </el-col>
      </el-row>

      <el-row type="flex" justify="center">
        <el-col :span="12">
      <el-form-item class="labelColor" label="密码" placeholder="请输入密码" prop="pass">
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
        <el-col :span="10">
          <el-form-item>
            <el-button type="primary" icon="el-icon-upload" @click="ToRegister">注册</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="14">
      <el-form-item>
        <el-button type="primary" icon="el-icon-upload" @click="login">登录</el-button>
      </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    </div>

    <div class="register-wrap" v-show="showRegister"
         style=";margin:120px 400px 0 400px;border:2px solid #3299cc;border-radius: 4px;">
      <el-form ref="loginForm" :model="user" :rules="rules" status-icon label-width="100px">
        <el-row type="flex" justify="center">
          <el-col :span="10">
            <el-form-item label-width="70px">
              <span><font color="#1e90ff" size="4">注册</font></span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" justify="center">
          <el-col :span="14">
            <el-form-item class="labelColor" label="用户名" prop="name">
              <el-input v-model="user.newname" placeholder="请输入用户名"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" justify="center">
          <el-col :span="14">
            <el-form-item class="labelColor" label="密码" placeholder="请输入密码" prop="pass">
              <el-input v-model="user.newpass" type="password" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" justify="center">
          <el-col :span="14">
            <el-form-item class="labelColor" label="身份" placeholder="请选择你的身份" prop="pass">
          <el-select v-model="user.value">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="14">
            <el-form-item>
              <el-button type="primary" icon="el-icon-upload" @click="register">注册</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="18">
            <el-form-item>
              <span v-on:click="ToLogin">已有账号？马上登录</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </el-row>
  </div>
</template>

<<script>
  import {setCookie,getCookie} from '../common/cookie.js'

  export default {
    name:'login',

    data () {
      return {
        /*    mounted(){
              /!*页面挂载获取cookie，如果存在username的cookie，则跳转到主页，不需登录*!/
              if(getCookie('username')){
                this.$router.push('/home')
              }
            },*/
        user: {
          name: '',
          pass: '',
          role: 2,
          newname: '',
          newpass: '',
          value: ''
                },
        options: [{
          value: '1',
          label: '教师'
        }, {
          value: '2',
          label: '学生'
        }, {
          value: '3',
          label: '管理员'
        }],
        showLogin: true,
        showRegister: false
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
      login () {
        this.$refs.loginForm.validate((valid) => {
          if(valid) {
            if (this.user.name === 'admin' && this.user.pass === '123' ) {
              this.$notify({
                type: 'success',
                message: '欢迎,' + this.user.name + '登录大数据实验教学管理系统!',
                duration: 3500
              })
             /* setCookie('username',this.username,1000*60)*/
              /*this.$router.push({path: 'show'})*/
              if(this.user.role===1){   this.$router.push({path: 'TeacherHome'})  }
              else if(this.user.role===2){  this.$router.push({path: 'StudentHome'})  }
              else{  this.$router.push({path: 'ManagerHome'})  }
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
      },
      ToRegister(){
        this.showRegister = true;
        this.showLogin = false
      },
      ToLogin(){
        this.showRegister = false;
        this.showLogin = true
      },
      register(){
        if(this.user.newname === "" || this.user.newpass === ""|| this.user.value === ""){
          alert("请输入用户名或密码并确认身份")
        }else{
          let data = {'user.name':this.user.newname,'user.pass':this.user.newpass,'user.role':this.user.value};
          this.$http.post('http://localhost/vueapi/index.php/Home/user/register',data).then((res)=>{
            console.log(res)
          if(res.data === "ok"){
            this.$notify({
              type: 'success',
              message: '注册成功',
              duration: 3500
            })
            this.user.name = '';
            this.user.pass = '';
            /*注册成功之后再跳回登录页*/
            setTimeout(function(){
              this.showRegister = false;
              this.showLogin = true;
            }.bind(this),1000)
          }
        })
        }
      }
      }
  }
</script>


<style>
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
.labelColor .el-form-item__label{
  width: 90px;
  color: #1e90ff
}
</style>
