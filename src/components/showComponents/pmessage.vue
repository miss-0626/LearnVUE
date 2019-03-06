<template>
  <el-row>
    <el-col :span="24">
      <div v-if="Teacherform">
        <h2 class="title" style="text-align: center">教师信息</h2>
        <!--　　　　渲染教师信息-->
        <el-table :data="teacherData" height="400" border style="width: 100%">
          <el-table-column prop="id" label="账号"></el-table-column>
          <el-table-column prop="tname" label="姓名"></el-table-column>
          <el-table-column prop="tsex" label="性别"></el-table-column>
          <el-table-column prop="tdepart" label="部门"></el-table-column>
          <el-table-column prop="class_cno" label="课程名"></el-table-column>
          <el-table-column prop="passwd" label="密码"></el-table-column>
          <el-table-column prop="role" label="角色"></el-table-column>
        </el-table>
      </div>
      <div v-if="Studentform">
        <h2 class="title" style="text-align: center">学生信息</h2>
        <!--　　　　渲染学生信息-->
        <el-table :data="studentData" height="400" border style="width: 100%" >
          <el-table-column prop="id" label="学号"></el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="age" label="年龄"></el-table-column>
          <el-table-column prop="sex" label="性别"></el-table-column>
          <el-table-column prop="major" label="专业"></el-table-column>
          <el-table-column prop="depart" label="院系"></el-table-column>
          <el-table-column prop="term" label="学期"></el-table-column>
          <el-table-column prop="year" label="年级"></el-table-column>
          <el-table-column prop="passwd" label="密码"></el-table-column>
          <el-table-column prop="role" label="角色"></el-table-column>
        </el-table>
      </div>
      <div v-if="Managerform">
      <h2 class="title" style="text-align: center">管理员信息</h2>
      <!--　　　　渲染管理员信息-->
      <el-table :data="managerData" height="400" border style="width: 100%" >
        <el-table-column prop="id" label="账号"></el-table-column>
        <el-table-column prop="mname" label="姓名"></el-table-column>
        <el-table-column prop="msex" label="性别"></el-table-column>
        <el-table-column prop="mdepart" label="部门"></el-table-column>
        <el-table-column prop="passwd" label="密码"></el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
      </el-table>
      </div>
    </el-col>
  </el-row>
</template>

<script>
 /* import Main from '../api.js';*/

    export default {
        name: "pmessage",
      data(){
        return{
          teacherData:[],
          studentData:[
            {id:'201500000',name:'admin',age:18,sex:'male',major:'xx', depart:'物理与电信工程学院',year:'4',passwd:'123',role:'2'},
            {id:'201500000',name:'admin',age:18,sex:'male',major:'xx', depart:'物理与电信工程学院',year:'4',passwd:'123',role:'2'},
            {id:'201500000',name:'admin',age:18,sex:'male',major:'xx', depart:'物理与电信工程学院',year:'4',passwd:'123',role:'2'},
            {id:'201500000',name:'admin',age:18,sex:'male',major:'xx', depart:'物理与电信工程学院',year:'4',passwd:'123',role:'2'},
            {id:'201500000',name:'admin',age:18,sex:'male',major:'xx', depart:'物理与电信工程学院',year:'4',passwd:'123',role:'2'},
            {id:'201500000',name:'admin',age:18,sex:'male',major:'xx', depart:'物理与电信工程学院',year:'4',passwd:'123',role:'2'},
            {id:'201500000',name:'admin',age:18,sex:'male',major:'xx', depart:'物理与电信工程学院',year:'4',passwd:'123',role:'2'},
            {id:'201500000',name:'admin',age:18,sex:'male',major:'xx', depart:'物理与电信工程学院',year:'4',passwd:'123',role:'2'},
            {id:'201500000',name:'admin',age:18,sex:'male',major:'xx', depart:'物理与电信工程学院',year:'4',passwd:'123',role:'2'},
          ],
          managerData:[],
          Teacherform:false,
          Studentform:false,
          Managerform:false
        }
      },
      mounted(){
        this.init();   //页面初始化加载
      },
      methods:{
        init(){
/*          var id = sessionStorage.getItem('userId');   //获得用户登录信息的id和role
          var role = sessionStorage.getItem('userRole');
          //传id和role给后台
          this.$http.get(Main.getPersonmsg(id,role)).then(res => {
            let {errCode,errMsg,dataList}= res.data;*/
           var role = '2';
          // if(errCode==0){
            //如果是教师，显示教师信息
            if(role==1){
              this.Teacherform = true;
              const teacherArray=dataList;
              this.teacherData=teacherArray;
            }else if(role==2){
              this.Studentform = true;
              const studentArray=dataList;
              this.studentData = studentArray;
            }else{
              this.Managerform = true;
              const managerArray=dataList;
              this.managerData = managerArray;
            }
          }
/*          else{
            this.$message.error(errMsg)
          }
         }, response => {
            this.$message.error('error submit!!');
            return false;
          });
        }*/
      }
    }
</script>

<style scoped>

</style>
