<template>
    <div class="background">
      <el-row :span="24" class="background">
      <div class="inform" style="border-style:inset; background-color: white; margin:100px 180px 0px 180px; border-radius: 4px;">
        <p style="text-align: center;color: royalblue;font-size: xx-large"> {{title}} </p>
        <p> <hr size="5px"/> </p>
        <p style="font-size: x-large;white-space:pre-wrap;margin: 0 35px;"> {{detail}} </p>
      </div>
      </el-row>
    </div>
</template>

<script>
    export default {
        name: "showmsg",
      data() {
        return {
          title:'',
          detail:''
        }
      },
      mounted() {
        var vm = this;
        this.$axios({
          method: 'get',
          url: 'http://192.168.1.235:8080/exper_front/inform/detail/'+this.id
        }).then(response => {
          if(response.data === ''){
          this.$router.push({path: '/Login'})
        }else{
          vm.title= response.data.data.title;
          vm.detail = response.data.data.detail;
          let tableData1 = response.data.data[0];
          console.log(tableData1)
        }
      }).catch(function (err) {
          console.log(err);
        })
      },
      created:function(){
        this.getParams();
      },
      watch: {
        // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
        '$route': 'getParams'
      },
      methods: {
        getParams: function () {
          var routerParams = this.$route.query.Id;
          this.id = routerParams
        }
      }
    }
</script>

<style scoped>
  .background{
    width: 100%;
    padding-bottom: 10%;
    height: 100%;
    background: url('../assets/background.jpg') no-repeat center center fixed;
    background-size: cover;
    background-color: #0C1424;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
  }
</style>
