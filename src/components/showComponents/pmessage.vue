<template>
  <el-row>
    <el-col :span="24">
      <h2 class="title" style="text-align: center">个人信息</h2>

      <div v-if="Teacherform">
        <el-table :data="teacherData" height="400" border style="width: 100%">
          <el-table-column prop="id" label="账号"></el-table-column>
          <el-table-column prop="tname" label="姓名"></el-table-column>
          <el-table-column prop="tsex" label="性别"></el-table-column>
          <el-table-column prop="tdepart" label="院系"></el-table-column>
          <el-table-column prop="course" label="课程名"></el-table-column>
          <el-table-column prop="passwd" label="密码"></el-table-column>
          <el-table-column label="操作" width="160px">
            <template slot-scope="scope">
              <el-button size="small" type="primary" @click="handleEdit1(scope.$index, scope.row)">编辑
              </el-button>
              <el-button size="small" type="danger" @click="handleDelete1(scope.$index, scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-dialog :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="账号" :label-width="formLabelWidth">
              <el-input v-model="form.id" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="姓名" :label-width="formLabelWidth">
              <el-input v-model="form.tname" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="性别" :label-width="formLabelWidth">
              <el-input v-model="form.tsex" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="院系" :label-width="formLabelWidth">
              <el-input v-model="form.tdepart" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="课程" :label-width="formLabelWidth">
              <el-input v-model="form.course" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth">
              <el-input v-model="form.passwd" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="danger" @click="cancel">取 消</el-button>
            <el-button type="primary" @click="editdate">修 改</el-button>
          </div>
        </el-dialog>
      </div>

      <div v-if="Studentform">
        <el-table :data="studentData" height="400" border style="width: 100%" >
          <el-table-column prop="id" label="账号"></el-table-column>
          <el-table-column prop="number" label="学号" ></el-table-column>
          <el-table-column prop="email" label="邮箱"></el-table-column>
          <el-table-column prop="role" label="角色" ></el-table-column>
          <el-table-column label="操作" width="160px">
            <template slot-scope="scope">
              <el-button size="small" type="primary" @click="handleEdit2(scope.$index, scope.row)">编辑
              </el-button>
              <el-button size="small" type="danger" @click="handleDelete2(scope.$index, scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-dialog :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="账号" :label-width="formLabelWidth">
              <el-input v-model="form.id" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="学号" :label-width="formLabelWidth">
              <el-input v-model="form.number" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" :label-width="formLabelWidth">
              <el-input v-model="form.email" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="角色" :label-width="formLabelWidth">
              <el-input v-model="form.role" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="danger" @click="cancel">取 消</el-button>
            <el-button type="primary" @click="editdate">修 改</el-button>
          </div>
        </el-dialog>
      </div>

      <div v-if="Managerform">
        <el-table :data="managerData" height="400" border style="width: 100%" >
          <el-table-column prop="id" label="账号" sortable></el-table-column>
          <el-table-column prop="mname" label="姓名"></el-table-column>
          <el-table-column prop="msex" label="性别"></el-table-column>
          <el-table-column prop="mdepart" label="部门"></el-table-column>
          <el-table-column prop="passwd" label="密码"></el-table-column>
          <el-table-column label="操作" width="160px">
            <template slot-scope="scope">
              <el-button size="small" type="primary" @click="handleEdit3(scope.$index, scope.row)">编辑
              </el-button>
              <el-button size="small" type="danger" @click="handleDelete3(scope.$index, scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-dialog :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="账号" :label-width="formLabelWidth">
              <el-input v-model="form.id" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="姓名" :label-width="formLabelWidth">
              <el-input v-model="form.mname" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="性别" :label-width="formLabelWidth">
              <el-input v-model="form.msex" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="部门" :label-width="formLabelWidth">
              <el-input v-model="form.mdepart" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth">
              <el-input v-model="form.passwd" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="danger" @click="cancel">取 消</el-button>
            <el-button type="primary" @click="editdate">修 改</el-button>
          </div>
        </el-dialog>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  /* import Main from '../api.js';*/

  export default {
    name: "pmessage",
    data(){
      return{
        teacherData:[{id:'teacher',tname:'张老师',tsex:'男',tdepart:'物电',course:'通信原理',passwd:'12345'}],
        studentData:[{id:'admin',number:'2015310001',email:'123@qq.com',role:'2'}],
        managerData:[{id:'manager',mname:'管理员',msex:'男',mdepart:'物电',passwd:'12345'}],
        Teacherform:false,
        Studentform:false,
        Managerform:false,
        dialogFormVisible: false,
        formLabelWidth: '100px',
        form: {}
      }
    },
    mounted(){
      this.init();   //页面初始化加载
    },
    methods:{
      init(){
        /*          var id = sessionStorage.getItem('userId');   //获得用户登录信息的id和role
                  var role = sessionStorage.getItem('userRole');
                  //传id和role给后台
                  this.$http.get(Main.getPersonmsg(id,role)).then(res => {
                    let {errCode,errMsg,dataList}= res.data;*/
        var role = '2';
        // if(errCode==0){
        //如果是教师，显示教师信息
        if(role==1){
          this.Teacherform = true;
          const teacherArray=dataList;
          this.teacherData=teacherArray;
        }else if(role==2){
          this.Studentform = true;
          const studentArray=dataList;
          this.studentData = studentArray;
        }else{
          this.Managerform = true;
          const managerArray=dataList;
          this.managerData = managerArray;
        }
      },
      /*          else{
                  this.$message.error(errMsg)
                }
               }, response => {
                  this.$message.error('error submit!!');
                  return false;
                });
              }*/
      editdate(){
        this.dialogFormVisible = false;
      },
      cancel(){
        this.dialogFormVisible = false;
      },
      handleEdit1(index, row) {
        this.form = this.teacherData[index];
        this.dialogFormVisible = true;
      },
      handleEdit2(index, row) {
        this.form = this.studentData[index];
        this.dialogFormVisible = true;
      },
      handleEdit3(index, row) {
        this.form = this.managerData[index];
        this.dialogFormVisible = true;
      },
      handleDelete1(index, row) {
        this.$confirm('此操作将永久删除该条信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.teacherData.splice(index, 1);
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
          this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
      },
      handleDelete2(index, row) {
        this.$confirm('此操作将永久删除该条信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.studentData.splice(index, 1);
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
          this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
      },
      handleDelete3(index, row) {
        this.$confirm('此操作将永久删除该条信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.managerData.splice(index, 1);
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
          this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
      }
    }
  }
</script>

<style scoped>

</style>
