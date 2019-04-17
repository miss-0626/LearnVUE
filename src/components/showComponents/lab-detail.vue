<template>
  <div class="back">
    <el-row :span="24" class="back">
    <div class="detail" style="margin:10px 25px 10px 20px;padding:1px 15px 55px 15px;border:1px;border-width:5px; background-color: white; border-radius: 4px;">
      <p style="text-align: center;color: royalblue;font-size: x-large"> {{head}} </p>
      <p> <hr size="2px"/> </p>
      <div style="font-size: large;white-space:pre-wrap;margin: 0 35px;">
        <p><a>实验室编号</a>      {{labNum}} </p>
        <p><a>实验室名称</a>      {{labName}} </p>
        <p><a>占用状态</a>      {{state}} </p>
        <p><a>实验室负责人</a>      {{lecturer}} </p>
      </div>
    </div>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: "lab-detail",
      data(){
        return {
          head: '实验室详情',
          labNum:'8-201',
          labName:'物理实验室',
          state:'占用',
          lecturer:'张老师'
        }
      }
    }
</script>

<style scoped>
.back{
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  /*position: fixed;*/
}
  a{
    color: #99a9bf
  }
</style>
