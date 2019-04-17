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
      <el-form-item class="labelColor" label="密码"  prop="pass">
        <el-input v-model="user.pass" placeholder="请输入密码" :type="user.show.pass?'text':'password'">
          <i slot="suffix" class="el-input__icon el-icon-view" @click="user.show.pass=!user.show.pass"></i>
        </el-input>
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
      <el-form ref="loginForm2" :model="user" :rules="rules" status-icon label-width="100px">
        <el-row type="flex" justify="center">
          <el-col :span="10">
            <el-form-item label-width="70px">
              <span><font color="#1e90ff" size="4">注册</font></span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" justify="center">
          <el-col :span="14">
            <el-form-item class="labelColor" label="用户名" prop="newName">
              <el-input v-model="user.newName" placeholder="请输入用户名"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" justify="center">
          <el-col :span="14">
            <el-form-item class="labelColor" label="密码" prop="newPass">
              <el-input v-model="user.newPass" placeholder="请输入密码" :type="user.show.pass?'text':'password'">
                <i slot="suffix" class="el-input__icon el-icon-view" @click="user.show.pass=!user.show.pass"></i>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" justify="center">
          <el-col :span="14">
            <el-form-item class="labelColor" label="确认密码" prop="checkPass">
              <el-input v-model="user.checkPass" placeholder="请再次输入密码" :type="user.show.checkpass?'text':'password'">
                <i slot="suffix" class="el-input__icon el-icon-view" @click="user.show.checkpass=!user.show.checkpass"></i>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" justify="center">
          <el-col :span="14">
            <el-form-item class="labelColor" label="手机" prop="phone">
              <el-input v-model="user.phone" placeholder="请输入手机号码"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" justify="center">
          <el-col :span="14">
            <el-form-item class="labelColor" label="邮箱" prop="email">
              <el-input v-model="user.email" placeholder="请输入邮箱地址"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" justify="center">
          <el-col :span="14">
            <el-form-item class="labelColor" label="身份" placeholder="请选择你的身份" prop="role">
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
      var validatePass = (rule, value, callback) =>{
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.user.checkPass !== '') {
            this.$refs.user.validateField('checkPass');
          } else {
            callback();
          }
        }
      }
      var validatePass2 = (rule, value, callback) =>{
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.user.newPass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      }
      var validatePhone = (rule, value,callback) => {
        const reg =/^[1][3,4,5,7,8][0-9]{9}$/;
        if(value==''||value==undefined||value==null){
          callback();
        }else {
          if ((!reg.test(value)) && value != '') {
            callback(new Error('请输入正确的电话号码'));
          } else {
            callback();
          }
        }
      }
      var validateEmail = (rule, value,callback)=> {
        const reg =/^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/;
        if(value==''||value==undefined||value==null){
          callback();
        }else{
          if (!reg.test(value)){
            callback(new Error('请输入正确的邮箱地址'));
          } else {
            callback();
          }
        }
      }
      return {
        mounted() {
          /*页面挂载获取cookie，如果存在username的cookie，则跳转到主页，不需登录*/
          if (getCookie('username')) {
            if (this.user.role === 1) {
              this.$router.push({path: 'TeacherHome'})
            }
            else if (this.user.role === 2) {
              this.$router.push({path: 'StudentHome'})
            }
            else {
              this.$router.push({path: 'ManagerHome'})
            }
          }
        },
        user: {
          show: {
            pass: false,
            checkpass:false
          },
          name: '',
          pass: '',
          role: 2,
          newName: '',
          newPass: '',
          checkPass: '',
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
        showRegister: false,

        rules: {
          name: [{required: true, message: '用户名不能为空', trigger: 'blur'}],
          pass: [{required: true, message: '密码不能为空', trigger: 'blur'}],
          newName: [{required: true, message: '用户名不能为空', trigger: 'blur'}],
          newPass: [{required: true, validator: validatePass, trigger: 'blur'}],
          checkPass: [{required: true, validator: validatePass2, trigger: 'blur'}],
          phone: [{validator: validatePhone, trigger: 'blur'}],
          email: [{ validator: validateEmail, trigger: 'blur'}],
          role: [{required: true, message: '请选择角色', trigger: 'blur', type: 'number'}]
        }
      };
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

              setCookie('username',this.user.name,7*60*60*24)

              if(this.user.role===1){   this.$router.push({path: 'TeacherHome'})  }
              else if(this.user.role===2){  this.$router.push({path: 'StudentHome'})  }
              else{  this.$router.push({
                path: 'ManagerHome',
                query:{role:this.user.role}
              })  }
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
        })
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
        if(this.user.newName === "" || this.user.newPass === ""|| this.user.checkPass === ""|| this.user.value === ""){
          alert("请输入用户名或密码并确认身份")
        }else{
          let data = {'user.name':this.user.newName,'user.pass':this.user.newPass,'user.role':this.user.value};
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
