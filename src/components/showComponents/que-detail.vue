<template>
  <div class="back">
    <el-row :span="24" class="back">
      <div class="detail" style="margin:10px 25px 10px 20px;padding:1px 15px 55px 15px;border:1px;border-width:5px; background-color: white; border-radius: 4px;">
        <p style="text-align: center;color: royalblue;font-size: x-large"> {{head}} </p>
        <p> <hr size="2px"/> </p>
        <div style="font-size: large;white-space:pre-wrap;margin: 0 35px;">
          <img :src="img" style="max-width:300px;max-height:300px"/>
          <p><a>设备编号</a>      {{equiNum}} </p>
          <p><a>设备名称</a>      {{equiName}} </p>
          <p><a>所属实验室</a>      {{labNum}} </p>
          <p><a>状态</a>      {{state}} </p>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "que-detail",
    data(){
      return {
        img:'../static/image/示波器.jpg',
        head: '设备详情',
        equiNum:'1-201',
        equiName:'物理实验室',
        labNum:'8-201',
        state:'占用'
      }
    }
  }
</script>

<style scoped>
  .back{
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
 /*   position:fixed;*/
/*    overflow-y:scroll;
    overflow-x:hidden;*/
  }
  a{
    color: #99a9bf
  }
</style>
