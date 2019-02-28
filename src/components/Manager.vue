<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item index="1">首页</el-menu-item>
    <el-submenu index="2">
      <template slot="title">实验室管理</template>
      <el-menu-item index="2-1">基本信息</el-menu-item>
      <el-menu-item index="2-2">设备</el-menu-item>
      <el-menu-item index="2-3">状态</el-menu-item>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">设备管理</template>
      <el-menu-item index="3-1">基本信息</el-menu-item>
      <el-menu-item index="3-2">所属实验室及编号</el-menu-item>
      <el-menu-item index="3-3">状态</el-menu-item>
      <el-menu-item index="3-4">维修处理</el-menu-item>
    </el-submenu>
    <el-submenu index="4">
      <template slot="title">教学资源管理</template>
      <el-menu-item index="4-1">教学课程</el-menu-item>
      <el-menu-item index="4-2">科研项目</el-menu-item>
      <el-menu-item index="4-3">指导老师</el-menu-item>
      <el-submenu index="4-4">
        <template slot="title">相关资料</template>
        <el-menu-item index="4-4-1">实验指导书</el-menu-item>
        <el-menu-item index="4-4-2">实验室规章制度</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-submenu index="5">
      <template slot="title">信息查询与维护</template>
      <el-menu-item index="5-1">个人信息</el-menu-item>
      <el-menu-item index="5-2">成绩上传</el-menu-item>
      <el-menu-item index="5-3">发布项目</el-menu-item>
      <el-menu-item index="5-4">批改实验报告</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
  export default {
    name: "Student",
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>


<style scoped>


</style>
