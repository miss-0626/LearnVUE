<template>
  <div class="Manager">
    <div class="wrapper">
  <show></show>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" router style=";box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
      <el-menu-item index="ManagerHome">首页</el-menu-item>
      <el-submenu index="2">
        <template slot="title">实验室介绍</template>
        <el-menu-item index="deal-labshow">基本信息</el-menu-item>
        <el-menu-item index="deal-labstate">实验室预约处理</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">设备介绍</template>
        <el-menu-item index="deal-queshow">基本信息</el-menu-item>
        <el-menu-item index="deal-quenumber">所属实验室及编号</el-menu-item>
        <el-menu-item index="deal-questate">设备预约处理</el-menu-item>
        <el-menu-item index="deal-queservice">维修处理</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">教学资源</template>
        <el-menu-item index="deal-course">教学课程</el-menu-item>
        <el-menu-item index="deal-project">科研项目</el-menu-item>
        <el-menu-item index="deal-teacher">指导老师</el-menu-item>
        <el-submenu index="4-4">
          <template slot="title">相关资料</template>
          <el-menu-item index="Managerteachbook">实验指导书</el-menu-item>
          <el-menu-item index="Managerteachrule">实验室规章制度</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">信息查询与维护</template>
        <el-menu-item index="Managerpmessage">个人信息</el-menu-item>
        <el-menu-item index="Managerscore">成绩管理</el-menu-item>
      </el-submenu>
    </el-menu>

    <router-view/>
    </div>
    <foot></foot>
  </div>
</template>

<script>
  import show from './show.vue'
  import foot from './foot.vue'

  export default {
    name: "Manager",
    components:{
      show,
      foot
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
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
  }
  .Student{
    min-height: 100%;
  }
  .wrapper {
    min-height: calc(100vh - 70px);
  }

</style>
