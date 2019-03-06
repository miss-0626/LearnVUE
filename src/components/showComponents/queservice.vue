<template>
  <div  style="padding:20px;margin:5% 10%;border:1px solid #3299cc">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="que-ruleForm">
    <el-form-item label="设备名称" prop="quename">
      <el-input v-model="ruleForm.quename" placeholder="请输入设备名称"></el-input>
    </el-form-item>
    <el-form-item label="设备编号" prop="number">
      <el-input v-model="ruleForm.number" placeholder="请输入设备编号"></el-input>
    </el-form-item>
    <el-form-item label="设备问题" prop="problem">
      <el-input type="textarea" v-model="ruleForm.problem" placeholder="请描述设备出现的问题"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">立即申报</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

<script>
    export default {
        name: "queservice",
      data() {
        return {
          ruleForm: {
            quename: '',
            number: '',
            problem: ''
          },
          rules: {
            quename: [
              { required: true, message: '请输入设备名称', trigger: 'blur' }
            ],
            number: [
              { required: true, message: '请输入设备编号', trigger: 'blur' }
            ],
            problem: [
              { required: true, message: '请描述设备出现的问题', trigger: 'blur' }
            ]
          }
        };
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
