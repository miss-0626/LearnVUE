<template>
  <div class="back">
    <el-row :span="24" class="back">
      <div class="detail" style="margin:10px 25px 10px 20px;padding:1px 15px 55px 15px;border:1px;border-width:5px; background-color: white; border-radius: 4px;">
        <p style="text-align: center;color: royalblue;font-size: x-large"> {{head}} </p>
        <p> <hr size="2px"/> </p>
        <div style="font-size: large;white-space:pre-wrap;margin: 0 35px;">
          <img :src="img" style="max-width:300px;max-height:300px"/>
          <p><a>姓名</a>      {{name}} </p>
          <p><a>职称</a>      {{identity}} </p>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "teacher-detail",
    data(){
      return {
        head: '教师详情',
        img: '../static/image/tzl.png',
        name:'唐志列',
        identity:'物理与电信工程学院院长，博士生导师'
      }
    }
  }
</script>

<style scoped>
  .back{
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
/*    position: fixed;*/
  }
  a{
    color: #99a9bf
  }
</style>
