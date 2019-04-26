<template>
  <div>
    <el-table :data="tableData9.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%">
      <!--<el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="teacher-table-expand">
            <el-form-item class="labelColor" label="导师">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item class="labelColor" label="性别">
              <span>{{ props.row.sex }}</span>
            </el-form-item>
            <el-form-item class="labelColor" label="职位">
              <span>{{ props.row.identity }}</span>
            </el-form-item>
            <el-form-item class="labelColor" label="研究方向">
              <span>{{ props.row.major }}</span>
            </el-form-item>
            <el-form-item class="labelColor" label="详细描述">
              <span>{{ props.row.desc}}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>-->
      <el-table-column label="肖像" prop="img">
        <template slot-scope="props">
          <el-popover placement="right" title="" trigger="click">
            <img :src="props.row.imgUrl" style="max-width:300px;max-height:300px"/>
            <img slot="reference" :src="props.row.imgUrl" :alt="props.row.imgUrl" style="width:100px;height:100px" class="image">
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="姓名" prop="lecturerName"></el-table-column>
      <el-table-column label="职称" prop="title"></el-table-column>
      <el-table-column label="详情">
        <template slot-scope="scope">
          <el-button v-if="role === 1" size="small" type="primary"> <router-link tag="a" class="detail-link" :to="{path:'Teacher-teacher-detail',query:{lecturerId:scope.row.lecturerId}}">查看详情</router-link></el-button>
          <el-button v-if="role === 2" size="small" type="primary"> <router-link tag="a" class="detail-link" :to="{path:'Student-teacher-detail',query:{lecturerId:scope.row.lecturerId}}">查看详情</router-link></el-button>
          <!--<router-link tag="a" target="_blank" :to="{name:'teacher-detail',query:{teacherId:scope.row.teacherId}}">查看详情</router-link>-->
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
                   :total="tableData9.length">
    </el-pagination>
  </div>
</template>

<script>
    export default {
        name: "teachers",
      data() {
        return {
          currentPage:1,
          pagesize:5,
          tableData9: []/*{
            img: '../static/image/tzl.png',
            name: '唐志列',
            sex: '男',
            identity:'物理与电信工程学院院长',
            major:'量子信息学，量子电子学，激光光谱学。',
            desc: '唐志列，男，物理学教授， 博士生导师，现任华南师范大学物理与电信工程学院院长。迄今为止在国内外刊物上发表学术论文100多篇，国家发明专利2项， 在光量子保密通信、光声光谱和光声成像、激光共聚焦显微镜等领域做了较系统的研究工作，主持完成了国家自然科学基金、广东省自然科学基金团队项目等高水平研究课题。参与完成了广东省重大科技专项和广州市重大科技攻关等研究项目。曾获广东省教育厅科技进步三等奖和广州市优秀论文三等奖。'
          },*/

        }
      },
      mounted() {
        const userrole = JSON.parse(sessionStorage.getItem('用户角色'));
        this.role = userrole;

        var vm = this;
        this.$axios({
          method: 'get',
          url: 'http://192.168.1.235:8080/exper_front/lecturer/list'
        }).then(response => {
          if(response.data === ''){
          this.$router.push({path: '/Login'})
        }else{
          vm.tableData9 = response.data.data;
          let tableData9 = response.data.data[0];
          console.log(tableData9)
        }
      }).catch(function (err) {
          console.log(err);
        })
      },
      methods: {
        handleSizeChange: function (size) {
          this.pagesize = size;
          console.log(this.pagesize);
        },
        handleCurrentChange: function(currentPage){
          this.currentPage = currentPage;
          console.log(this.currentPage);
        }
      }
    }
</script>


<style>
  .detail-link{
    color:white;
  }
  a {
    text-decoration: none;
  }
  .teacher-table-expand {
    font-size: 0
  }
  .labelColor .el-form-item__label{
    width: 90px;
    color: #99a9bf
  }
  /*.teacher-table-expand label {*/
    /*width: 90px;*/
    /*color: #99a9bf*/
  /*}*/
  .teacher-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%
  }
</style>
