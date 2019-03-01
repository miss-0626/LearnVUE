<template>
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-row :gutter="20">
        <el-col :span="16"><div class="grid-content bg-purple">
          <img src="../assets/logo_school.png">
          <img src="../assets/word.png">
        </div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>注册</el-dropdown-item>
            <el-dropdown-item>登录</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span style="margin-right: 15px">游客</span>
      </el-row>
    </el-header>

<!--    <el-main>
      <img src="../assets/logo.png">
      <router-view/>
    </el-main>-->

  </el-container>
</template>

<script>
    export default {
        name: "show"
    }
</script>

<style scoped>
  .el-header {
    background-color: #5F9F9F;
    color: #333;
    line-height: 60px;
  }
</style>
