<template>
  <div class="study" style="padding:10px 5px 30px 5px;margin:1px 0">

    <div class="title">
      <i style="font-size: 28px; font-weight: bold;padding-right: 5px" class="el-icon-tickets"></i>
      <span style="font-size: 25px; font-weight: bold;">我的评论</span>
    </div>

    <div class="container" style="margin:5px 8px">
      <div class="comment" v-for="(item,index) in reversecomments" :index="item.index">

        <div class="info">
          <div class="name">{{item.user}}
            <span  @click="handleget(item,index)">
              <el-button style="float: right;margin: 5px 15px" type="danger" size="mini" @click="handlerdelete">删 除</el-button>
            </span></div>
          <div class="date">{{item.deliverDate}}</div>
        </div>

        <div class="content">{{item.word}}</div>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ptalk",
    inject: ['reload'],
    data(){
      return{
        Id:'',
        comments:[]
      }
    },
    mounted(){
      var vm = this;
      this.$axios({
        method: 'post',
        url: 'http://192.168.1.235:8080/exper_front/info/mycomment',
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
    computed: {
      reversecomments() {
        return this.comments.reverse();
      }
    },
    methods: {
      handleget:function(item,index) {
        this.Id = item.commentId;
        console.log(index);
      },
      handlerdelete(index,row) {
        this.$confirm('确认删除该条评论吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios({
          method: 'get',
          url: 'http://192.168.1.235:8080/exper_front/comment/delete/' + this.Id,
        }).then(response => {
        this.$message({
          type: 'success',
          message: '已删除!'
        })
        this.reload()
        let res = response.data;
        console.log(res)
      }).catch(function (err) {
          console.log(err)
        });
      }).catch(() => {
          this.$message({
          type: 'info',
          message: '取消'
        })
      });
      }
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
</style>
