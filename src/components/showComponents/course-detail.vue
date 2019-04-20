<template>
  <div class="back">
    <el-row :span="24" class="back">
      <div class="detail" style="margin:10px 25px 10px 20px;padding:1px 15px 55px 15px;border:1px;border-width:5px; background-color: white; border-radius: 4px;">
        <p style="text-align: center;color: royalblue;font-size: x-large"> {{head}} </p>
        <p> <hr size="2px"/> </p>
        <div style="font-size: large;white-space:pre-wrap;margin: 0 35px;">
          <p><a>教学课程</a>      {{course}} </p>
          <p><a>教学老师</a>      {{teacher}} </p>
          <p><a>类型</a>      {{type}} </p>
        </div>

        <div>
          <button  @click="getAnswer">测试</button>
          <p>{{answer}}</p>
          <img :src="image" />
        </div>

      </div>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "course-detail",
    data(){
      return {
        head: '课程详情',
        course:'通信技术',
        teacher:'钟老师',
        type:'必修',
        answer:'11',
        image:''
      }
    },
    methods:{
      getAnswer:function(){
        var vm = this;
        this.$axios({
          method: 'get',
          /*url: 'https://yesno.wtf/api'*/
          url: '/api/exper_front/lab/list'
        }).then(response=>{
          vm.answer = response.data.answer;
          vm.image =  response.data.image;
          let _data=response.data;
        console.log(_data)
      }).catch(function(err){
          console.log(err)
        })
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
