<template>
  <div class="background">
    <el-row :span="24" class="background">
      <div class="inform" style="border-style:inset;border-width:5px; background-color: white; margin:100px 180px 50px 180px;border:4px; border-radius: 4px;">
        <p style="text-align: center;color: royalblue;font-size: xx-large"> {{head}} </p>
        <p> <hr size="5px"/> </p>
        <p style="font-size: x-large;white-space:pre-wrap;margin: 0 35px;"> {{main}} </p>
      </div>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "teachrule",
    data() {
      return {
        head:'实验室规章制度',
        main:'1、本科基础实验室：实验用品、实验仪器、实验试剂、耗材等由实验中心提供。课时安排按照教学计划进行，本科教学外的课室使用需要提前（至少1周）向负责的实验室教师申请。\n' +
          '\n' +
          '2、科研型专用实验室：所需实验用品、实验仪器、实验试剂、耗材等由科研项目申购人自行购买、保管、使用、维修等，以上费用由相应的科研经费支出。科研型仪器的购买型号、参考厂家、价格，论证报告，验收、使用记录由科研教师提供。购买科研仪器的网上计划申报、采购，合同，财务报销，固定资产报账，仪器培训，填写资产管理情况由实验中心负责。科研型实验室由相应主管导师派出研究生管理该实验室日常事务，包括掌握此实验室的钥匙，掌握仪器操作并把技术传承给低年级的同学。平时管理的学生可以在里面学习，摸索实验技术及开发实验仪器的更广范的用途和技术，维护实验室的日常整洁。学院公共资源大家都可以使用，但如果与其他老师实验有冲突，负责导师有优先使用权利。管理学生禁止把钥匙私配给其他同学，利用管理同学钥匙打开实验室使用须其整过程在场。其他借用按正常借用实验室程序到相应实验管理老师处办理。\n' +
          '\n' +
          '3、科研型共用实验室：所需实验用品、实验仪器、由实验中心购买，尽量满足教师、学生实验所需。仪器维修、保养由相应的实验教师联系，管理学生协助完成。\n' +
          '\n' +
          '                                          实验中心'+'\n'+'\n'+'\n' ,
      }
    }
  }
</script>

<style scoped>
  .background{
    width: 100%;
    padding-bottom: 10%;
    height: 100%;
    background-size: cover;
    background-color: #0C1424;
  }
</style>
