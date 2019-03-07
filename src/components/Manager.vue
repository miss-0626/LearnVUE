<template>
  <div class="Manager">
  <show></show>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" router>
      <el-menu-item index="ManagerHome">首页</el-menu-item>
      <el-submenu index="2">
        <template slot="title">实验室介绍</template>
        <el-menu-item index="labshow">基本信息</el-menu-item>
        <el-menu-item index="deal-labstate">实验室预约处理</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">设备介绍</template>
        <el-menu-item index="queshow">基本信息</el-menu-item>
        <el-menu-item index="quenumber">所属实验室及编号</el-menu-item>
        <el-menu-item index="deal-questate">设备预约处理</el-menu-item>
        <el-menu-item index="deal-queservice">维修处理</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">教学资源</template>
        <el-menu-item index="teachcourse">教学课程</el-menu-item>
        <el-menu-item index="teachproject">科研项目</el-menu-item>
        <el-menu-item index="teachers">指导老师</el-menu-item>
        <el-submenu index="4-4">
          <template slot="title">相关资料</template>
          <el-menu-item index="teachbook">实验指导书</el-menu-item>
          <el-menu-item index="teachrule">实验室规章制度</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">信息查询与维护</template>
        <el-menu-item index="pmessage">个人信息</el-menu-item>
        <el-menu-item index="pscore">成绩查询</el-menu-item>
        <el-menu-item index="pproject">项目申报情况</el-menu-item>
        <el-menu-item index="preport">实验报告</el-menu-item>
      </el-submenu>
    </el-menu>

    <router-view/>

  </div>
</template>

<script>
  import show from './show.vue'

  export default {
    name: "Manager",
    components:{
      show
    },
    data() {
      return {
        activeIndex: 'ManagerHome',
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
