<template>
  <div class="back">
    <el-row :span="24" class="back">
      <div class="detail" style="margin:10px 25px 10px 20px;padding:1px 15px 55px 15px;border:1px;border-width:5px; background-color: white; border-radius: 4px;">
        <p style="text-align: center;color: royalblue;font-size: x-large"> {{head}} </p>
        <p> <hr size="2px"/> </p>
        <div style="font-size: large;white-space:pre-wrap;margin: 0 100px 50px 100px;">
          <img :src="imgUrl" style="max-width:300px;max-height:300px"/>
          <p><a>姓名</a>      {{lecturerName}} </p>
          <p><a>职称</a>      {{title}} </p>
          <p><a>简介</a>      {{introduce}} </p>
          <p><a>电话</a>      {{phone}} </p>
          <p><a>邮箱</a>      {{email}} </p>
        </div>
        <p> <hr size="2px"/> </p>
        <div class="table" style="margin: 20px 250px">
          <el-table :data="courseData" style="width: 100%" border>
            <el-table-column prop="courseName" label="课程名称" sortable></el-table-column>
            <el-table-column prop="courseType" label="类型" sortable  column-key="date"
                             :filters="[{text: '必修', value: '必修'},
                                  {text: '选修', value: '选修'}]" :filter-method="filterTag">
            </el-table-column>
          </el-table>
        </div>
          <p> <hr size="2px"/> </p>
        <div class="table" style="margin: 20px 250px">
          <el-table :data="labData" style="width: 100%" border>
            <el-table-column prop="labNum" label="实验室编号" sortable></el-table-column>
            <el-table-column prop="labName" label="实验室名称"></el-table-column>
            <el-table-column prop="isUsed" label="占用状态"
                             :filters="[{ text: '占用', value: '占用' }, { text: '空闲', value: '空闲' }]"
                             :filter-method="filterTag" filter-placement="bottom-end">
              <template slot-scope="scope">
                <el-tag :type="scope.row.isUsed === '空闲' ? '占用' : 'danger'"
                        disable-transitions>{{scope.row.isUsed}}</el-tag>
              </template>
            </el-table-column>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "teacher-detail",
    data(){
      return {
        head: '教师详情',
        id:'',
        imgUrl: '',
        lecturerName:'',
        title:'',
        email:'',
        phone:'',
        introduce:'',
        courseData:[],
        labData:[]
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
      filterTag(value, row) {
        return row.courseType === value;
      },
      getParams:function(){
        var routerParams = this.$route.query.lecturerId;
        console.log("传来的参数=="+routerParams);
        this.id = routerParams
      }
    },
    mounted(){
      var vm = this;
      this.$axios({
        method: 'get',
        url: 'http://192.168.1.235:8080/exper_front/lecturer/detail/'+this.id
      }).then(response=>{
        if(response.data === ''){
        this.$router.push({path: '/Login'})
      }else
      {
        let res = response.data;
        console.log(res);
        vm.imgUrl = response.data.data.lecturer.imgUrl;
        vm.lecturerName = response.data.data.lecturer.lecturerName;
        vm.title = response.data.data.lecturer.title;
        vm.introduce = response.data.data.lecturer.introduce;
        vm.phone = response.data.data.lecturer.phone;
        vm.email = response.data.data.lecturer.email;
        vm.courseData = response.data.data.courses;
        vm.labData = response.data.data.labs;
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
</style>
