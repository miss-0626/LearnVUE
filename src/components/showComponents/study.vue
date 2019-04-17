<template>
    <div class="study" style="padding:10px 5px 100px 5px;margin:3px 5px;border:1px solid #C0C0C0">
      <div class="write-comment" style="margin:5px 8px" @click="showinputbox()">
      <i class="el-icon-edit"></i>
      <span class="add-comment">发表新言论</span>
      </div>
      <!--<el-collapse-transition>-->
      <div class="input-wrapper" v-if="showbox === true" style="margin:5px 5%">
        <el-input v-model="inputComment" type="textarea" :rows="4" autofocus placeholder="请描述你的想法.."></el-input>
        <div class="btn-control" style="float:right; padding:5px 15px">
          <el-button class="cancel" type="danger" round @click="cancel">取消</el-button>
          <el-button class="btn" type="success" round @click="commitComment">确定</el-button>
        </div>
      </div>
      <!--</el-collapse-transition>-->
      <div class="container" style="margin:50px 8px">
        <div class="comment" v-for="(item,index) in comments" :index="item.index">

          <div class="info">
            <div class="name">{{item.fromName}}</div>
            <div class="date">{{item.date}}</div>
          </div>

          <div class="content">{{item.content}}</div>

          <div class="control">
         <span class="like" :class="{active: item.isLike}" @click="likeClick(item)">
          <i class="el-icon-star-on"></i>
          <span class="like-num">{{item.likeNum > 0 ? item.likeNum + '人点赞' : '赞'}}</span>
        </span>
         <span class="comment-reply" @click="showCommentinput(item,index)">
           <a><i class="el-icon-edit-outline"></i><span>回复</span></a>
        </span>
          </div>

          <div class="reply">
            <div class="item" v-for="reply in item.reply">

              <div class="reply-content">
                <span class="from-name">{{reply.fromName}}</span><span>: </span>
                <span class="to-name">@{{reply.toName}}</span>
                <span>{{reply.content}}</span>
              </div>

              <div class="reply-bottom">
                <span>{{reply.date}}</span>
                <span class="reply-text" @click="showCommentInput(item,reply,index)">
                 <a><i class="el-icon-edit-outline"></i><span>回复</span></a>
                </span>
              </div>

            </div>

            <div class="write-reply" v-if="item.reply.length > 0" @click="showCommentinput(item,index)">
              <a><i class="el-icon-edit"></i>
              <span class="add-comment">添加新评论</span></a>
            </div>

              <div class="input-wrapper" v-if="showItemId === item.id" style="margin:1px 3px">
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
</template>

<script>
    export default {
        name: "study",
      data(){
          return{
            comments:[{
                id:'1522822502',
                date:'2019-03-22 08:30',
                fromId:'00001',
                fromName:'爱学习的小明',
                content:'调制解调器的调制方式有哪些？',
                likeNum: 33,
                reply:[{
                    id:'4212721621',
                    commentId:'1152562282',
                    fromId:'00002',
                    fromName:'热心网友',
                    toId:'00001',
                    toName:'爱学习的小明',
                    date:'2019-03-22 08:35',
                    content:'幅移键控（ASK），频移键控(FSK)，相位键控（PSK），三种'
                  },
                  {
                    id:'1234567',
                    commentId:'comment0001',
                    fromId:'reply0002',
                    fromName:'热心同学',
                    toId:'from0001',
                    toName:'爱学习的小明',
                    date:'2019-03-22 08:38',
                    content:'调频，调位，调相'
                  }]
              },
              {
                id:'0002',
                date:'2019-03-23 08:30',
                fromId:'from0002',
                fromName:'问题狂魔',
                content:'十万个为什么？？',
                likeNum: 8,
                reply:[]
              }],
            chosedIndex: -1,
            name:'',
            nowTime:'',
            itemid:'',
            inputComment: '',
            inputreply:'',
            showItemId: '',
            showbox:''
          }
      },
      mounted(){
        this.nowTimes();
      },
      methods: {
        likeClick(item) {
          if (item.isLike === null) {
            Vue.$set(item, "isLike", true);
            item.likeNum++;
          } else {
            if (item.isLike) {
              item.likeNum--;
            } else {
              item.likeNum++;
            }
            item.isLike = !item.isLike;
          }
        },
        showinputbox() {
          this.showbox = true;
        },
        showCommentinput:function(item,index) {
          this.inputreply = '';
          this.chosedIndex = index;
          this.showItemId = item.id;
          this.name = item.fromName;
          console.log(index);
        },
        showCommentInput:function(item,reply,index) {
          this.inputreply = '';
          this.chosedIndex = index;
          this.showItemId = item.id;
          this.name = reply.fromName;
          console.log(index);
        },
        cancel() {
          this.chosedIndex ='';
          this.showItemId = '';
          this.inputreply = '';
          this.showbox = '';
          this.inputComment = '';
        },
        commitComment: function () {
          if (this.inputComment !== '') {
            this.comments.splice(0, 0, {
              id: this.itemid,
              date: this.nowTime,
              fromId: 1001,
              fromName: this.$parent.$data.username,
              content: this.inputComment,
              likeNum: 0,
              reply: []
            });
          }else{
            alert('请输入您要发表的内容..')
        }
          this.inputComment = '';
        },
        commitreply: function () {
          if (this.inputreply !== '') {
          this.comments[this.chosedIndex].reply.push({
            id: this.itemid,
            commentId: 1234,
            fromId: 12345,
            fromName: this.$parent.$data.username,
            toId: 54321,
            toName: this.name,
            date: this.nowTime,
            content: this.inputreply
          });
          }else{
            alert('请输入您要回复的内容..')
          }
          this.inputreply = '';
        },
        timeFormate(timeStamp) {
          let year = new Date(timeStamp).getFullYear();
          let month = new Date(timeStamp).getMonth() + 1 < 10 ? "0" + (new Date(timeStamp).getMonth() + 1) : new Date(timeStamp).getMonth() + 1;
          let date = new Date(timeStamp).getDate() < 10 ? "0" + new Date(timeStamp).getDate() : new Date(timeStamp).getDate();
          let hh = new Date(timeStamp).getHours() < 10 ? "0" + new Date(timeStamp).getHours() : new Date(timeStamp).getHours();
          let mm = new Date(timeStamp).getMinutes() < 10 ? "0" + new Date(timeStamp).getMinutes() : new Date(timeStamp).getMinutes();
          let ss = new Date(timeStamp).getSeconds() < 10 ? "0" + new Date(timeStamp).getSeconds() : new Date(timeStamp).getSeconds();
          this.nowTime = year + "-" + month + "-" + date + " " + hh + ":" + mm;
          this.itemid = year + month + date + hh + mm + ss;
        },
        nowTimes() {
          this.timeFormate(new Date());
          setInterval(this.nowTimes,1000);
        }
      }
      }
</script>

<style scoped>
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
