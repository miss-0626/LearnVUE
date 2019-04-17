<template>
    <div style=";margin:100px 400px 0px 400px;padding: 40px 40px 15px 15px; border:1px solid #3299cc;border-radius: 4px;">
      <el-form :model="user" status-icon :rules="rules" ref="user" label-width="100px">
        <el-form-item class="labelColor" label="旧密码" prop="pass">
          <el-input v-model="user.pass" placeholder="请输入密码" :type="user.show.pass?'text':'password'" autocomplete="off">
            <i slot="suffix" class="el-input__icon el-icon-view" @click="user.show.pass=!user.show.pass"></i>
          </el-input>
        </el-form-item>
        <el-form-item class="labelColor" label="新密码" prop="newPass">
          <el-input v-model="user.newPass" placeholder="请输入密码" :type="user.show.newpass?'text':'password'" autocomplete="off">
            <i slot="suffix" class="el-input__icon el-icon-view" @click="user.show.newpass=!user.show.newpass"></i>
          </el-input>
        </el-form-item>
        <el-form-item class="labelColor" label="确认密码" prop="checkPass">
          <el-input v-model="user.checkPass" placeholder="请再次输入密码" :type="user.show.checkpass?'text':'password'" autocomplete="off">
            <i slot="suffix" class="el-input__icon el-icon-view" @click="user.show.checkpass=!user.show.checkpass"></i>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('user')">提交</el-button>
          <el-button @click="resetForm('user')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
    export default {
       name: "password",
      data(){
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
        return{
          user: {
            show: {
              pass: false,
              newpass: false,
              checkpass:false
            },
            userId:'',
            pass: '',
            newPass: '',
            checkPass: ''
          },
          rules: {
            pass: [{required: true, message: '密码不能为空', trigger: 'blur'}],
            newPass: [{validator: validatePass, trigger: 'blur'}],
            checkPass: [{validator: validatePass2, trigger: 'blur'}]
          }
        }

      },
      methods: {
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              alert('submit!');
            } else {
              console.log('error submit!!');
          return false;
        }
        });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        }
      }
      }
</script>

<style scoped>

</style>
