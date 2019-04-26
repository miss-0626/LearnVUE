<template>
  <div class="Teacher">
    <div class="wrapper">
      <show></show>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" router style=";box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
      <el-menu-item index="TeacherHome">首页</el-menu-item>
      <el-submenu index="2">
        <template slot="title">实验室介绍</template>
        <el-menu-item index="Teacherlabshow">基本信息</el-menu-item>
        <el-menu-item index="Teacherlabstate">状态和预约</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">设备介绍</template>
        <el-menu-item index="Teacherqueshow">基本信息</el-menu-item>
        <el-menu-item index="Teacherquestate">状态和预约</el-menu-item>
        <el-menu-item index="Teacherqueservice">维修申报</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">教学资源</template>
        <el-menu-item index="Teacherteachcourse">教学课程</el-menu-item>
        <el-menu-item index="Teacherteachproject">科研项目</el-menu-item>
        <el-menu-item index="Teacherteachers">指导老师</el-menu-item>
        <el-submenu index="4-4">
          <template slot="title">相关资料</template>
          <el-menu-item index="Teacherteachbook">实验指导书</el-menu-item>
          <el-menu-item index="Teacherteachrule">实验室规章制度</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">信息查询与维护</template>
        <el-submenu index="5-1">
          <template slot="title">账号信息</template>
        <el-menu-item index="Teacherpmessage">个人信息</el-menu-item>
        <el-menu-item index="Teacherpassword">修改密码</el-menu-item>
        </el-submenu>
        <el-submenu index="5-2">
          <template slot="title">课程讨论</template>
          <el-menu-item index="Teacher-ptalk">我的评论</el-menu-item>
          <el-menu-item index="Teacher-preply">我的回复</el-menu-item>
          <el-menu-item index="Teacher-p-to-reply">回复我的</el-menu-item>
        </el-submenu>
        <el-menu-item index="read-report">批改实验报告</el-menu-item>
        <el-menu-item index="Teacher-p-lab-que">我的预约</el-menu-item>
        <el-menu-item index="add-score">上传成绩</el-menu-item>
        <el-menu-item index="add-project">项目上传与审核</el-menu-item>
      </el-submenu>
      <el-menu-item index="Teacherstudy">学习探讨区</el-menu-item>
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
    name: "Teacher",
    components:{
      show,
      foot
    },
    data() {
      return {
        activeIndex: 'TeacherHome',
        activeIndex2: '1',
        username:''
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
