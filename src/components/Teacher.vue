<template>
  <div class="Teacher">
    <show></show>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" router>
      <el-menu-item index="TeacherHome">首页</el-menu-item>
      <el-submenu index="2">
        <template slot="title">实验室介绍</template>
        <el-menu-item index="labshow">基本信息</el-menu-item>
        <el-menu-item index="labstate">状态和预约</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">设备介绍</template>
        <el-menu-item index="queshow">基本信息</el-menu-item>
        <el-menu-item index="quenumber">所属实验室及编号</el-menu-item>
        <el-menu-item index="questate">状态和预约</el-menu-item>
        <el-menu-item index="queservice">维修申报</el-menu-item>
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
        <el-menu-item index="add-score">上传成绩</el-menu-item>
        <el-menu-item index="add-project">项目上传与审核</el-menu-item>
        <el-menu-item index="read-report">批改实验报告</el-menu-item>
      </el-submenu>
    </el-menu>

    <router-view/>
  </div>
</template>

<script>
  import show from './show.vue'

  export default {
    name: "Teacher",
    components:{
      show
    },
    data() {
      return {
        activeIndex: 'TeacherHome',
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
