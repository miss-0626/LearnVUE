<template>
  <div class="Student">
    <div class="wrapper">
    <show @transferUser="getUser"></show>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" router style=";box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
    <el-menu-item index="StudentHome">首页</el-menu-item>
    <el-submenu index="2">
      <template slot="title">实验室介绍</template>
      <el-menu-item index="Studentlabshow">基本信息</el-menu-item>
      <el-menu-item index="Studentlabstate">状态和预约</el-menu-item>
    </el-submenu>
    <el-submenu index="3">
        <template slot="title">设备介绍</template>
        <el-menu-item index="Studentqueshow">基本信息</el-menu-item>
        <el-menu-item index="Studentquestate">状态和预约</el-menu-item>
        <el-menu-item index="Studentqueservice">维修申报</el-menu-item>
      </el-submenu>
    <el-submenu index="4">
      <template slot="title">教学资源</template>
      <el-menu-item index="Studentteachcourse">教学课程</el-menu-item>
      <el-menu-item index="Studentteachproject">科研项目</el-menu-item>
      <el-menu-item index="Studentteachers">指导老师</el-menu-item>
      <el-submenu index="4-4">
        <template slot="title">相关资料</template>
        <el-menu-item index="Studentteachbook">实验指导书</el-menu-item>
        <el-menu-item index="Studentteachrule">实验室规章制度</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-submenu index="5">
      <template slot="title">信息查询与维护</template>
      <el-menu-item index="Studentpmessage">个人信息</el-menu-item>
      <el-menu-item index="Studentpassword">修改密码</el-menu-item>
      <el-menu-item index="Studentpscore">成绩查询</el-menu-item>
      <el-submenu index="5-4">
        <template slot="title">申请信息</template>
      <el-menu-item index="Studentpproject">项目申报情况</el-menu-item>
      <el-menu-item index="p-lab-que">预约情况</el-menu-item>
      </el-submenu>
      <el-menu-item index="Studentpreport">实验报告</el-menu-item>
    </el-submenu>
    <el-menu-item index="Studentstudy">学习探讨区</el-menu-item>
  </el-menu>
      <router-view></router-view>
    </div>
  <foot></foot>
  </div>
</template>

<script>
/*  import  from './'*/
  import show from './show.vue'
  import foot from './foot.vue'
import LabDetail from "./showComponents/lab-detail";

    export default {
        name: "Student",
      components:{
        LabDetail,
          show,
          foot
      },
      data() {
        return {
          activeIndex: 'StudentHome',
          Home: '1',
          username:''
        };
      },
      methods: {
          getUser (msg) {
            this.username = msg;
          },
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
