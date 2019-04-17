<template>
  <div class="deal-message">
    <el-tabs v-model="activeName" style="margin-top: 5px">
      <el-tab-pane label="学生信息" name="students">
        <h2 class="title" style="text-align: center">学生信息</h2>
        <el-table :data="studentData.slice((currentPage-1)*pagesize,currentPage*pagesize)" height="400" border style="width: 100%" >
          <el-table-column prop="id" label="账号" sortable></el-table-column>
          <el-table-column prop="number" label="学号" sortable width="120px"></el-table-column>
          <el-table-column prop="name" label="姓名" width="120px"></el-table-column>
          <el-table-column prop="sex" label="性别" width="100px"></el-table-column>
          <el-table-column prop="major" label="专业"></el-table-column>
          <el-table-column prop="depart" label="院系"></el-table-column>
          <el-table-column prop="year" label="年级" width="100px"></el-table-column>
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
        <el-pagination style="padding-left: 30px;margin-top: 5px"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="currentPage"
                       :page-sizes="[5, 10, 20, 40]"
                       :page-size="pagesize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="studentData.length">
        </el-pagination>

        <el-dialog :visible.sync="dialogFormVisible1">
          <el-form :model="form">
            <el-form-item label="账号" :label-width="formLabelWidth">
              <el-input v-model="form.id" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="学号" :label-width="formLabelWidth">
              <el-input v-model="form.number" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
            <el-form-item label="性别" :label-width="formLabelWidth">
            <el-input v-model="form.sex" auto-complete="off"></el-input>
          </el-form-item>
            <el-form-item label="专业" :label-width="formLabelWidth">
            <el-input v-model="form.major" auto-complete="off"></el-input>
          </el-form-item>
            <el-form-item label="院系" :label-width="formLabelWidth">
            <el-input v-model="form.depart" auto-complete="off"></el-input>
          </el-form-item>
            <el-form-item label="年级" :label-width="formLabelWidth">
            <el-input v-model="form.year" auto-complete="off"></el-input>
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

      </el-tab-pane>

      <el-tab-pane label="教师信息" name="teachers">
        <h2 class="title" style="text-align: center">教师信息</h2>
        <el-table :data="teacherData.slice((currentPage-1)*pagesize,currentPage*pagesize)" height="400" border style="width: 100%">
          <el-table-column prop="id" label="账号" sortable></el-table-column>
          <el-table-column prop="tname" label="姓名"></el-table-column>
          <el-table-column prop="tsex" label="性别"></el-table-column>
          <el-table-column prop="tdepart" label="院系"></el-table-column>
          <el-table-column prop="course" label="课程名"></el-table-column>
          <el-table-column prop="passwd" label="密码"></el-table-column>
          <el-table-column label="操作" width="160px">
            <template slot-scope="scope">
              <el-button size="small" type="primary" @click="handleEdit2(scope.$index, scope.row)">编辑
              </el-button>
              <el-button size="small" type="danger" @click="handleDelete2(scope.$index, scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination style="padding-left: 30px;margin-top: 5px"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="currentPage"
                       :page-sizes="[5, 10, 20, 40]"
                       :page-size="pagesize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="teacherData.length">
        </el-pagination>

        <el-dialog :visible.sync="dialogFormVisible2">
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

      </el-tab-pane>

      <el-tab-pane label="管理员信息" name="mangers">
        <h2 class="title" style="text-align: center">管理员信息</h2>
        <el-table :data="managerData.slice((currentPage-1)*pagesize,currentPage*pagesize)" height="400" border style="width: 100%" >
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
        <el-pagination style="padding-left: 30px;margin-top: 5px"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="currentPage"
                       :page-sizes="[5, 10, 20, 40]"
                       :page-size="pagesize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="managerData.length">
        </el-pagination>

        <el-dialog :visible.sync="dialogFormVisible3">
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

      </el-tab-pane>

    </el-tabs>
    </div>
</template>

<script>
 /* import Main from '../api.js';*/

    export default {
        name: "deal-message",
      data(){
        return{
          currentPage:1,
          pagesize:5,
          activeName: 'students',
          dialogFormVisible1: false,
          dialogFormVisible2: false,
          dialogFormVisible3: false,
          formLabelWidth: '100px',
          form: {},
          teacherData:[
            {id:'teacher',tname:'张老师',tsex:'男',tdepart:'物电',course:'通信原理',passwd:'12345'},
            {id:'teacher',tname:'张老师',tsex:'男',tdepart:'物电',course:'通信原理',passwd:'12345'},
            {id:'teacher',tname:'张老师',tsex:'男',tdepart:'物电',course:'通信原理',passwd:'12345'},
            {id:'teacher',tname:'张老师',tsex:'男',tdepart:'物电',course:'通信原理',passwd:'12345'},
            {id:'teacher',tname:'张老师',tsex:'男',tdepart:'物电',course:'通信原理',passwd:'12345'}
          ],
          studentData:[
            {id:'admin',number:'2015310001',name:'admin',sex:'male',major:'xx', depart:'物理与电信工程学院',year:'4',passwd:'123'},
            {id:'admin',number:'2015310001',name:'admin',sex:'male',major:'xx', depart:'物理与电信工程学院',year:'4',passwd:'123'},
            {id:'admin',number:'2015310001',name:'admin',sex:'male',major:'xx', depart:'物理与电信工程学院',year:'4',passwd:'123'},
            {id:'admin',number:'2015310001',name:'admin',sex:'male',major:'xx', depart:'物理与电信工程学院',year:'4',passwd:'123'},
            {id:'admin',number:'2015310001',name:'admin',sex:'male',major:'xx', depart:'物理与电信工程学院',year:'4',passwd:'123'},
            {id:'admin',number:'2015310001',name:'admin',sex:'male',major:'xx', depart:'物理与电信工程学院',year:'4',passwd:'123'}
          ],
          managerData:[
            {id:'manager',mname:'管理员',msex:'男',mdepart:'物电',passwd:'12345'},
            {id:'manager',mname:'管理员',msex:'男',mdepart:'物电',passwd:'12345'},
            {id:'manager',mname:'管理员',msex:'男',mdepart:'物电',passwd:'12345'}
          ]
        }
      },
      mounted(){
        this.init();   //页面初始化加载
      },
      methods:{
        handleSizeChange: function (size) {
          this.pagesize = size;
          console.log(this.pagesize);
        },
        handleCurrentChange: function(currentPage){
          this.currentPage = currentPage;
          console.log(this.currentPage);
        },
        editdate(){
          this.dialogFormVisible1 = false;
          this.dialogFormVisible2 = false;
          this.dialogFormVisible3 = false;
        },
        cancel(){
          this.dialogFormVisible1 = false;
          this.dialogFormVisible2 = false;
          this.dialogFormVisible3 = false;
        },
        handleEdit2(index, row) {
          this.form = this.teacherData[index];
          this.dialogFormVisible2 = true;
        },
        handleEdit1(index, row) {
          this.form = this.studentData[index];
          this.dialogFormVisible1 = true;
        },
        handleEdit3(index, row) {
          this.form = this.managerData[index];
          this.dialogFormVisible3 = true;
        },
        handleDelete2(index, row) {
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
        handleDelete1(index, row) {
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
