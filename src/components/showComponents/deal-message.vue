<template>
  <div class="deal-message">
        <h2 class="title" style="text-align: center">用户信息</h2>
        <el-table :data="userData.slice((currentPage-1)*pagesize,currentPage*pagesize)" height="400" border style="width: 100%" >
          <el-table-column label="id" prop="id" v-if="not"></el-table-column>
          <el-table-column prop="userName" label="姓名"  align="center"></el-table-column>
          <el-table-column prop="number" label="学号/手机" sortable  align="center"></el-table-column>
          <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
          <el-table-column prop="role" label="角色" align="center"
                           :filters="[{ text: 'student', value: 'student' },{ text: 'teacher', value: 'teacher' },{ text: 'manager', value: 'manager' } ]"
                           :filter-method="filterTag" filter-placement="bottom-end"></el-table-column>
          <el-table-column prop="registerTime" label="注册时间" sortable align="center"></el-table-column>
          <el-table-column label="操作" width="160px" align="center">
            <template slot-scope="scope">
              <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑
              </el-button>
              <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
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
                       :total="userData.length">
        </el-pagination>

        <el-dialog :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="姓名" :label-width="formLabelWidth">
              <el-input v-model="form.userName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="学号/手机" :label-width="formLabelWidth">
              <el-input v-model="form.number" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" :label-width="formLabelWidth">
            <el-input v-model="form.email" auto-complete="off"></el-input>
          </el-form-item>
            <el-form-item label="角色" :label-width="formLabelWidth">
            <el-input v-model="form.role" auto-complete="off"></el-input>
          </el-form-item>
            <el-form-item label="注册时间" :label-width="formLabelWidth">
            <el-input v-model="form.registerTime" auto-complete="off"></el-input>
          </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="danger" @click="cancel">取 消</el-button>
            <el-button type="primary" @click="editdate">修 改</el-button>
          </div>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "deal-message",
      inject: ['reload'],
      data(){
        return{
          currentPage:1,
          pagesize:5,
          not:false,
          dialogFormVisible: false,
          formLabelWidth: '100px',
          form: {},
          userData:[]
        }
      },
      mounted(){
        var vm = this;
        this.$axios({
          method: 'get',
          url: 'http://47.101.137.101:8080/exper_front/info/list'
        }).then(response => {
          if(response.data === ''){
          this.$router.push({path: '/Login'})
        }else{
          vm.userData = response.data.data;
          let userData = response.data.data;
          console.log(userData)
        }
      }).catch(function (err) {
          console.log(err);
        })
      },
      methods:{
        filterTag(value, row) {
          return row.state === value;
        },
        handleSizeChange: function (size) {
          this.pagesize = size;
          console.log(this.pagesize);
        },
        handleCurrentChange: function(currentPage){
          this.currentPage = currentPage;
          console.log(this.currentPage);
        },

        editdate(){
          this.dialogFormVisible = false;
        },
        cancel(){
          this.dialogFormVisible = false;
        },
        handleEdit(index, row) {
          this.form = this.userData[index];
          this.dialogFormVisible = true;
        },
        handleDelete(index, row) {
          this.$confirm('此操作将永久删除该条信息, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var vm = this;
          this.$axios({
            method: 'get',
            url: 'http://47.101.137.101:8080/exper_front/info/delete/'+this.userData[index].id,
          }).then(response => {
            this.reload()
            this.$message({
            type: 'success',
            message: '删除成功!'
          })
          let res = response.data;
          console.log(res)
        }).catch(function (err) {
            console.log(err)
          });
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
