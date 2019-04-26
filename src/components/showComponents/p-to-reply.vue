<template>
  <div class="study" style="padding:10px 5px 30px 5px;margin:1px 0">

    <div class="title">
      <i style="font-size: 28px; font-weight: bold;padding-right: 5px" class="el-icon-tickets"></i>
      <span style="font-size: 25px; font-weight: bold;">回复我的</span>
    </div>

    <div class="container" style="margin:5px 8px">
      <div class="comment" v-for="(item,index) in comments" :index="item.index">

        <div class="info">
          <div class="name">我</div>
        </div>

        <div class="content">{{item.word}}</div>

        <div class="reply">
          <div class="item">

            <div class="reply-content">
              <span class="from-name">{{item.replier}}</span><span>回复:   </span>
              <span>{{item.content}}</span>
            </div>

            <div class="reply-bottom">
              <span>{{item.deliverDate}}</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "p-to-reply",
    data(){
      return{
        comments:[]
      }
    },
    mounted(){
      var vm = this;
      this.$axios({
        method: 'get',
        url: 'http://192.168.1.235:8080/exper_front/info/myhammer',
        data:{}
      }).then(response => {
        let res = response.data
        console.log(res)
      if(response.data === ''){
        this.$router.push({path: '/Login'})
      }else{
        vm.comments = response.data.data;
        let comments = response.data.data;
        console.log(comments)
      }
    }).catch(function (err) {
        console.log(err);
      })
    },
    methods: {

    }
  }
</script>

<style scoped>
  .study{
    background-color:#CCCCCC ;
  }
  .title{
    margin:0 5px 10px 15px;
    /*    background-color:#ffffff;*/
  }
  .comment {
    display: flex;
    flex-direction: column;
    padding: 10px 10px 20px 10px;
    border-bottom: 15px solid #CCCCCC;
    background-color:#ffffff;
  }
  .info {
    display: flex;
    flex-direction: column;
  }
  .name {
    font-size: 17px;
    color: #303133;
    margin-bottom: 5px;
    font-weight:bold;
  }
  .date {
    font-size: 12px;
    color: #909399;
  }
  .content {
    font-size: 16px;
    color: #555555;
    line-height: 20px;
    padding: 10px 0;
    margin-top: 5px;
  }
  .reply {
    margin: 10px 0;
    border-left: 2px solid #DCDFE6;
  }
  .reply-bottom {
    display: flex;
    align-items: center;
    margin-top: 6px;
    font-size: 12px;
    color:  #909399;
  }
  .item {
    margin: 0 10px;
    padding: 10px 0;
    border-bottom: 1px dashed #EBEEF5;
  }
  .reply-content {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #555555;
  }
  .from-name {
    color: #409EFF;
  }
</style>
