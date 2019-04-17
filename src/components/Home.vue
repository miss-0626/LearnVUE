<template>
  <div class="home">
    <h3 style="padding: 5px 15px;margin-top: 5px">{{msg}}</h3>
    <el-container>
      <el-aside width="600px">
        <div id="slider" style=";margin:40px 10px;">
          <div class="window" @mouseover="stop" @mouseleave="play">
            <ul class="container" :style="containerStyle">
              <li><img :style="{width:imgWidth+'px'}" :src="sliders[sliders.length - 1].img" alt=""></li>
              <li  v-for="(item, index) in sliders" :key="index">
                <img :style="{width:imgWidth+'px'}" :src="item.img" alt="">
              </li>
              <li><img :style="{width:imgWidth+'px'}" :src="sliders[0].img" alt=""></li>
            </ul>
            <ul class="direction">
              <li class="left" @click="move(550, 1, speed)">
                <svg class="icon" width="30px" height="30.00px" viewBox="0 0 1024 720" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#ffffff" d="M481.233 904c8.189 0 16.379-3.124 22.628-9.372 12.496-12.497 12.496-32.759 0-45.256L166.488 512l337.373-337.373c12.496-12.497 12.496-32.758 0-45.255-12.498-12.497-32.758-12.497-45.256 0l-360 360c-12.496 12.497-12.496 32.758 0 45.255l360 360c6.249 6.249 14.439 9.373 22.628 9.373z"  /></svg>
              </li>
              <li class="right" @click="move(550, -1, speed)">
                <svg class="icon" width="30px" height="30.00px" viewBox="0 0 1024 720" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#ffffff" d="M557.179 904c-8.189 0-16.379-3.124-22.628-9.372-12.496-12.497-12.496-32.759 0-45.256L871.924 512 534.551 174.627c-12.496-12.497-12.496-32.758 0-45.255 12.498-12.497 32.758-12.497 45.256 0l360 360c12.496 12.497 12.496 32.758 0 45.255l-360 360c-6.249 6.249-14.439 9.373-22.628 9.373z"  /></svg>
              </li>
            </ul>
            <ul class="dots">
              <li v-for="(dot, i) in sliders" :key="i"
                  :class="{dotted: i === (currentIndex-1)}" @click = jump(i+1)>
              </li>
            </ul>
          </div>
        </div>
      </el-aside>

      <el-main>
        <div style="margin-top: 20px">
          <div v-if="role === 3">
          <el-button type="primary"  size="medium" @click="add" style="float:right;margin-right:30px">新增通知</el-button>
          </div>
        <el-table :data="tableData1" height="400" border style="width: 100%" >
          <el-table-column prop="inform" label="通知" show-overflow-tooltip="true">
            <template slot-scope="scope">
              <a :href="scope.row.url" target="_blank" class="buttonText">{{scope.row.inform}}</a>
            </template>
          </el-table-column>
          <el-table-column prop="unit" label="发布单位" width="150" show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="uptime" label="发布时间" width="110" show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="deadline" label="有效期限" width="110" show-overflow-tooltip="true"></el-table-column>
        </el-table>

          <el-dialog :title="新增通知" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="标题" :label-width="formLabelWidth">
              <el-input v-model="form.inform" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="发布单位" :label-width="formLabelWidth">
              <el-input v-model="form.unit" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="发布时间" :label-width="formLabelWidth">
              <el-input v-model="form.uptime" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="有效期限" :label-width="formLabelWidth">
              <el-input v-model="form.deadline" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="内容" :label-width="formLabelWidth">
              <el-input type="textarea" :rows="4" v-model="form.main" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="danger" @click="cancel" size="medium">取 消</el-button>
            <el-button type="primary" @click="upinform" size="medium">新 增</el-button>
          </div>
        </el-dialog>

        </div>
      </el-main>
    </el-container>

    <div class="projects">
      <h2 style="padding: 5px 15px;margin-top: 5px">科研项目</h2>
      <ul>
        <li v-for="item in projectList"> <img :src="item.imgSrc" /> </li>
      </ul>
    </div>

     <div class="teachers">
       <h2 style="padding: 5px 15px;margin-top: 5px">优秀教师</h2>
       <ul>
         <li v-for="item in teacherList"> <img :src="item.imgSrc" /> </li>
       </ul>
     </div>
  </div>
</template>

<script>
  import { reformat } from '../common/reformartDate'

export default {
  name: 'Home',
  props: {
    initialSpeed: {
      type: Number,
      default: 30
    },
    initialInterval: {
      type: Number,
      default: 4
    }
  },
  data () {
    return {
      msg: '通知与展示',
      role:'',
      projectList :[
        {'imgSrc':'../static/image/5.jpg'},
        {'imgSrc':'../static/image/5.jpg'},
        {'imgSrc':'../static/image/5.jpg'},
        {'imgSrc':'../static/image/5.jpg'},
        {'imgSrc':'../static/image/5.jpg'}
      ],
      teacherList :[
        {'imgSrc':'../static/image/tzl.png'},
        {'imgSrc':'../static/image/tzl.png'},
        {'imgSrc':'../static/image/tzl.png'},
        {'imgSrc':'../static/image/tzl.png'},
        {'imgSrc':'../static/image/tzl.png'}
      ],
      tableData1: [{
        inform:'这是一条最新通知这是一条最新通知这是一条最新通知',
        url:'http://www.baidu.com/',
        unit:'物理与电信工程学院通信7班',
        uptime: '2019-03-02',
        deadline: '2019-05-01'
      },
        {
          inform:'这是一条最新通知',
          url:'#showmsg',
          unit:'物理与电信工程学院',
          uptime: '2019-03-02',
          deadline: '2019-05-01'
        },
        {
          inform:'这是一条最新通知',
          unit:'物理与电信工程学院',
          uptime: '2019-03-02',
          deadline: '2019-05-01'
        },
        {
          inform:'这是一条最新通知',
          unit:'物理与电信工程学院',
          uptime: '2019-03-02',
          deadline: '2019-05-01'
        },
        {
          inform:'这是一条最新通知',
          unit:'物理与电信工程学院',
          uptime: '2019-03-02',
          deadline: '2019-05-01'
        },{
          inform:'这是一条最新通知',
          unit:'物理与电信工程学院',
          uptime: '2019-03-02',
          deadline: '2019-05-01'
        },{
          inform:'这是一条最新通知',
          unit:'物理与电信工程学院',
          uptime: '2019-03-02',
          deadline: '2019-05-01'
        },
        {
          inform:'这是一条最新通知',
          unit:'物理与电信工程学院',
          uptime: '2019-03-02',
          deadline: '2019-05-01'
        },
        {
          inform:'这是一条最新通知',
          unit:'物理与电信工程学院',
          uptime: '2019-03-02',
          deadline: '2019-05-01'
        }],
      sliders:[
        {img:'../static/image/1.jpg'},
        {img:'../static/image/2.jpg'},
        {img:'../static/image/3.jpg'},
        {img:'../static/image/4.jpg'},
        {img:'../static/image/5.jpg'}
      ],
      dialogFormVisible: false,
      formLabelWidth: '80px',
      form: {},
      imgWidth:550,
      currentIndex:1,
      distance:-550,
      transitionEnd: true,
      speed: this.initialSpeed
    }
  },
  created:function(){
    this.getParams();
  },
  watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
    '$route': 'getParams'
  },
  computed:{
    containerStyle() {
      return {
        transform:`translate3d(${this.distance}px, 0, 0)`
      }
    },
    interval() {
      return this.initialInterval * 1000
    }
  },
  mounted() {
    this.init()
  },
  methods:{
    add() {
      this.form = {
        inform: '',
        unit:'',
        uptime: '',
        deadline: '',
        main: ''
      };
      this.dialogFormVisible = true;
    },
    upinform() {
      this.form.date = reformat(this.form.date);
      // this.tableData1.push(this.form);
      this.tableData1.splice(0, 0,{
        inform: this.form.inform,
        unit:this.form.unit,
        uptime: this.form.uptime,
        deadline:this.form.deadline,
        main:this.form.main,
        url:'#showmsg'
      });
      this.dialogFormVisible = false;
    },
    cancel(){
      this.dialogFormVisible = false;
    },
    getParams:function(){
      // 取到路由带过来的参数
      var a = this.$route.query.role;
      // 将数据放在当前组件的数据内
/*      console.log("传来的参数=="+routerParams);*/
      this.role = a;
    },
    init() {
      this.play();
      window.onblur = function() { this.stop() }.bind(this);
      window.onfocus = function() { this.play() }.bind(this)
    },
    move(offset, direction, speed) {
      console.log(speed)
      if (!this.transitionEnd) return
      this.transitionEnd = false
      direction === -1 ? this.currentIndex += offset/550 : this.currentIndex -= offset/550
      if (this.currentIndex > 5) this.currentIndex = 1
      if (this.currentIndex < 1) this.currentIndex = 5
      const destination = this.distance + offset * direction
      this.animate(destination, direction, speed)
    },
    animate(des, direc, speed) {
      if (this.temp) {
        window.clearInterval(this.temp);
        this.temp = null ;
      }
      this.temp = window.setInterval(() => {
        if ((direc === -1 && des < this.distance) || (direc === 1 && des > this.distance)) {
        this.distance += speed * direc
      } else {
        this.transitionEnd = true
        window.clearInterval(this.temp)
        this.distance = des
        if (des < -2750) this.distance = -550
        if (des > -550) this.distance = -2750
      }
    }, 20)
    },
    jump(index) {
      const direction = index - this.currentIndex >= 0 ? -1 : 1;
      const offset = Math.abs(index - this.currentIndex) * 550;
      const jumpSpeed = Math.abs(index - this.currentIndex) === 0 ? this.speed : Math.abs(index - this.currentIndex) * this.speed ;
      this.move(offset, direction, jumpSpeed)
    },
    play() {
      if (this.timer) {
        window.clearInterval(this.timer)
        this.timer = null
      }
      this.timer = window.setInterval(() => {
        this.move(550, -1, this.speed)
    }, this.interval)
    },
    stop() {
      window.clearInterval(this.timer)
      this.timer = null
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3{
  font-weight: normal;
  background-color: aliceblue;
  margin: 0;
  padding: 2px 5px 2px 20px;
}
h2{
  font-weight:normal;
}
a {
  color: #42b983;
}
*{
  box-sizing: border-box;
  margin:0;
  padding:0;
}
ol,ul{
  list-style: none;
}
#slider{
  text-align: center;
  width: auto;
}
.window{
  position:relative;
  width:550px;
  height:350px;
  margin:0 auto;
  overflow:hidden;
}
.container{
  display:flex;
  position:absolute;
}
.left, .right{
  position:absolute;
  top:50%;
  transform:translateY(-50%);
  width:50px;
  height:50px;
  background-color:rgba(0,0,0,.3);
  border-radius:50%;
  cursor:pointer;
}
.left{
  left:3%;
  padding-left:12px;
  padding-top:10px;
}
.right{
  right:3%;
  padding-right:12px;
  padding-top:10px;
}
img{
  user-select: none;
}
.dots{
  position:absolute;
  bottom:10px;
  left:50%;
  transform:translateX(-50%);
}
.dots li{
  display:inline-block;
  width:15px;
  height:15px;
  margin:0 3px;
  border:1px solid white;
  border-radius:50%;
  background-color:#333;
  cursor:pointer;
}
.dots .dotted{
  background-color:orange;
}
.projects{
  width:100%;
  height:auto;
}
.teachers{
  width:100%;
  height:auto;
}
.teachers ul,.projects ul{
  margin:10px 30px;
  width: 100%;
  height:auto;
  float: left;
}
.teachers ul li,.projects ul li{
  width:230px;
  height:auto;
  margin:10px;
  display: block;
  float:left;
}
.teachers ul li img,.projects ul li img{
  width: 230px;
  height: 200px;
}

</style>
