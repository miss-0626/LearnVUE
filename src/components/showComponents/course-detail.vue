<template>
  <div>
  <div class="back">
    <el-row :span="24" class="back">
      <div class="detail" style="margin:10px 25px 10px 20px;padding:1px 15px 55px 15px;border:1px;border-width:5px; background-color: white; border-radius: 4px;">
        <p style="text-align: center;color: royalblue;font-size: x-large"> {{head}} </p>
        <p> <hr size="2px"/> </p>
        <div style="font-size: large;white-space:pre-wrap;margin: 0 100px;">
          <p><a>教学课程</a>      {{courseName}} </p>
          <p><a>教学老师</a>      {{lecturer}} </p>
          <p><a>课程简介</a>      {{courseSum}} </p>
          <p><a>课程类型</a>      {{courseType}} </p>
          <p><a>选课人数/人数上限</a>      {{count}}/{{limit}} </p>
          <p><a>备注</a>      {{remark}} </p>
        </div>
        <p v-if="role === 2" style="text-align: center;">
          <el-button v-show="!choose" type="primary" @click="handlechoose">选课</el-button>
          <el-button v-show="choose" disabled type="primary" >已选课</el-button>
          <el-button v-show="!choose" disabled type="danger" >退课</el-button>
          <el-button v-show="choose" type="danger" @click="handledrop">退课</el-button>
        </p>
      </div>
    </el-row>
  </div>

    <div class="study" style="padding:10px 5px 100px 5px;margin:3px 5px;border:1px solid #C0C0C0">
      <p class="write-comment" style="margin:5px 8px" @click="showinputbox()">
        <i class="el-icon-edit"></i>
        <span class="add-comment">发表评论</span>
      </p>
      <!--<el-collapse-transition>-->
      <div class="input-wrapper" v-if="showbox === true" style="margin:5px 5%">
        <el-input v-model="inputComment" type="textarea" :rows="4" autofocus placeholder="请写下你的评论.."></el-input>
        <div class="btn-control" style="float:right; padding:5px 15px">
          <el-button class="cancel" type="danger" round @click="cancel">取消</el-button>
          <el-button class="btn" type="success" round @click="commitComment">确定</el-button>
        </div>
      </div>
      <!--</el-collapse-transition>-->
      <div class="container" style="margin:50px 8px">
        <div class="comment" v-for="(item,index) in reversecomments" :index="item.index">

          <div class="info">
            <div class="name">{{item.user}}</div>
            <div class="date">{{item.deliverDate}}</div>
          </div>

          <div class="content">{{item.word}}</div>

          <div class="control">
            <span class="like" @click="showreply(item,index)">
           <a><i class="el-icon-caret-bottom"></i><span>查看所有回复</span></a>
          </span>
          <span class="comment-reply" @click="showCommentinput(item,index)">
           <a><i class="el-icon-edit-outline"></i><span>回复</span></a>
        </span>
          </div>

          <div class="reply">
            <div class="item" v-for="reply in reversereplys"  v-if="showReplyId === item.commentId">

              <div class="reply-content">
                <span class="from-name">{{reply.replier}}</span><span>: </span>
                <span class="to-name">@{{reply.hammer}}</span>
                <span>{{reply.word}}</span>
              </div>

              <div class="reply-bottom">
                <span>{{reply.deliverDate}}</span>
                <span class="reply-text" @click="showCommentInput(item,reply,index)">
                 <a><i class="el-icon-edit-outline"></i><span>回复</span></a>
                </span>
              </div>

            </div>

            <div class="input-wrapper" v-if="showItemId === item.commentId" style="margin:1px 3px">
              <el-input v-model="inputreply" type="textarea" :rows="3" autofocus placeholder="请输入您的回复.."></el-input>

              <div class="btn-control" style="float:right; padding:5px 15px">
                <el-button class="cancel" type="danger" size="small" round @click="cancel">取消</el-button>
                <el-button class="btn" type="success" size="small" round @click="commitreply(index)">确定</el-button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "course-detail",
    inject: ['reload'],
    data(){
      return {
        choose:'',
        head: '课程详情',
        courseName:'',
        lecturer:'',
        courseSum:'',
        courseType:'',
        remark:'',
        count:'',
        limit:'',
        role:'',
        comments:[],
        replys:[],
        chosedIndex: -1,
        name:'',
        itemid:'',
        inputComment: '',
        inputreply:'',
        showItemId: '',
        showReplyId:'',
        showbox:''
      }
    },
    created:function(){
      this.getParams();
    },
    watch: {
      // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
      '$route': 'getParams'
    },
    methods:{
      getParams:function(){
        var routerParams = this.$route.query.courseId;
        this.id = routerParams
      },
      handlechoose() {
          this.$axios({
            method: 'get',
            url: 'http://47.101.137.101:8080/exper_front/course/choose/' + this.id
          }).then(response => {
            this.$message({
            type: 'success',
            message: response.data.meta.message,
            showClose: true
          })
          this.reload()
        }).
          catch(function (err) {
            console.log(err)
          });
      },
      handledrop() {
          this.$axios({
            method: 'get',
            url: 'http://47.101.137.101:8080/exper_front/course/cancel/' + this.id
          }).then(response => {
            this.$message({
            type: 'success',
            message: response.data.meta.message,
            showClose: true
          })
          this.reload()
        }).
          catch(function (err) {
            console.log(err)
          });
      },

      showinputbox() {
        this.showbox = true;
      },
      showreply:function(item,index){
        var vm = this;
        this.commentId = item.commentId;
        this.showReplyId = this.commentId;
        let commentId = item.commentId;
        console.log(commentId);
        this.$axios({
          method: 'get',
          url: 'http://47.101.137.101:8080/exper_front/comment/reply/list/' + this.commentId
        }).then(response => {
          this.$message({
          type: 'success',
          message: response.data.meta.message,
          showClose: true
        })
        if(response.data.data.length === 0){
          this.$message({
            type: 'info',
            message: "该评论暂时没有回复",
            showClose: true
          })
          vm.replys = response.data.data;
        }else {
          let res = response.data;
          console.log(res);
          vm.replys = response.data.data;
        }
      }).catch(function (err) {
          console.log(err)
        });
      },
      showCommentinput:function(item,index) {
        this.inputreply = '';
        this.chosedIndex = index;
        this.showItemId = item.commentId;
        this.name = item.user;
        console.log(index);
      },
      showCommentInput:function(item,reply,index) {
        this.inputreply = '';
        this.chosedIndex = index;
        this.showItemId = item.commentId;
        this.name = reply.replier;
        console.log(index);
      },
      cancel() {
        this.chosedIndex ='';
        this.showItemId = '';
        this.inputreply = '';
        this.showbox = false;
        this.inputComment = '';
      },
      commitComment: function () {
        if (this.inputComment === '') {
          this.$message({
            type: 'error',
            message: '请输入您要评论的内容..',
            showClose: true
          })
        }else{
          this.$axios({
            method: 'post',
            url: 'http://47.101.137.101:8080/exper_front/comment/add',
            data:{
                courseId: this.id,
                word: this.inputComment
            }
          }).then(response=>{
            console.log(response.data)
          this.reload()
        }).catch(function(err){
            console.log(err)
          });
        }
        this.inputComment = '';
      },
      commitreply: function () {
        if (this.inputreply === '') {
          this.$message({
            type: 'error',
            message: '请输入您要回复的内容..',
            showClose: true
          })
        }else{
          this.$axios({
            method: 'post',
            url: 'http://47.101.137.101:8080/exper_front/comment/reply/add',
            data:{
              commentId: this.showItemId,
              word: this.inputreply,
              hammer:this.name
            }
          }).then(response=>{
            console.log(response.data)
           this.reload()
        }).catch(function(err){
            console.log(err)
          });
        }
        this.inputreply = '';
        }
    },
    computed: {
      reversecomments() {
        return this.comments.reverse();
      },
      reversereplys() {
        return this.replys.reverse();
      }
    },
    mounted(){
      const userrole = JSON.parse(sessionStorage.getItem('用户角色'));
      this.role = userrole;

        var vm = this;
        this.$axios({
          method: 'get',
          url: 'http://47.101.137.101:8080/exper_front/course/detail/'+this.id
        }).then(response=>{
          if(response.data === ''){
        this.$router.push({path: '/Login'})
      }else{
        let res = response.data;
        console.log(res);
        vm.courseName = response.data.data.course.courseName;
        vm.lecturer = response.data.data.course.lecturer;
        vm.courseSum = response.data.data.course.courseSum;
        vm.courseType = response.data.data.course.courseType;
        vm.remark = response.data.data.course.remark;
        vm.count = response.data.data.course.count;
        vm.limit = response.data.data.course.limit;
        vm.comments = response.data.data.commentList;
        vm.choose = response.data.data.course.chosen;
        let choose = response.data.data.course.chosen;
        console.log(choose)
      }
      }).catch(function(err){
          console.log(err)
        })
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
  a:hover {
    color: #409EFF;
  }
  .active{
    color: #409EFF;
  }
  .add-comment{
    color:dimgray;
  }
  .comment {
    display: flex;
    flex-direction: column;
    padding: 10px;
    border-bottom: 2px solid #F2F6FC;
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
  .control {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #909399;
  }
  .like {
    display: flex;
    align-items: center;
    margin-right: 20px;
    cursor: pointer;
  }
  .comment-reply {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .reply {
    margin: 10px 0;
    border-left: 2px solid #DCDFE6;
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
  .to-name {
    color: #409EFF;
    margin-left: 5px;
    margin-right: 5px;
  }
  .reply-bottom {
    display: flex;
    align-items: center;
    margin-top: 6px;
    font-size: 12px;
    color:  #909399;
  }
  .reply-text {
    display: flex;
    align-items: center;
    margin-left: 10px;
    cursor: pointer;
  }
  .write-reply {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #909399;
    padding: 10px;
    cursor: pointer;
  }
  .el-icon-edit {
    margin-right: 5px;
  }
</style>
