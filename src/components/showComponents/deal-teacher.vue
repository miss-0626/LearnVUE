<template>
  <div>
    <el-row style="margin-top: 5px">
      <el-button type="primary" @click="add" style="float:right;margin-right:30px">新增导师</el-button>
    </el-row>
    <el-table :data="tableData5" style="width: 100%">
      <el-table-column type="expand">
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
      </el-table-column>
      <el-table-column label="肖像" prop="img">
        <template slot-scope="props">
          <img :src="props.row.img" alt="" style="width:50px;height:50px"  class="img"/>
        </template>
      </el-table-column>
      <el-table-column label="导师" prop="name"></el-table-column>
      <el-table-column label="性别" prop="sex"></el-table-column>
      <el-table-column label="职位" prop="identity"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :model="form">

        <el-form-item label="肖像" :label-width="formLabelWidth">
        <!-- <el-input type="file" v-model="form.img" auto-complete="off" @click="uploadimg"></el-input>-->
        <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :file-list="imgList" v-model="form.img"
                   :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="innerVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>

        <el-form-item label="导师" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-input v-model="form.sex" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="职位" :label-width="formLabelWidth">
          <el-input v-model="form.identity" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="研究方向" :label-width="formLabelWidth">
          <el-input v-model="form.major" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="详细描述" :label-width="formLabelWidth">
          <el-input  type="textarea" v-model="form.desc" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="cancel">取 消</el-button>
        <el-button v-if="dialogStatus=='update'" type="primary" @click="update">新 增</el-button>
        <el-button v-else type="primary" @click="editdate">修 改</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script type="text/ecmascript-6">
  import { reformat } from '../../common/reformartDate'

  export default {
    name: "dea-teacher",
    data() {
      return {
        imgList: [{ url: '../static/image/tzl.png'}],
        tableData5: [{
          img: '../static/image/tzl.png',
          name: '唐志列',
          sex: '男',
          identity:'物理与电信工程学院院长',
          major:'量子信息学，量子电子学，激光光谱学。',
          desc: '唐志列，男，物理学教授， 博士生导师，现任华南师范大学物理与电信工程学院院长。迄今为止在国内外刊物上发表学术论文100多篇，国家发明专利2项， 在光量子保密通信、光声光谱和光声成像、激光共聚焦显微镜等领域做了较系统的研究工作，主持完成了国家自然科学基金、广东省自然科学基金团队项目等高水平研究课题。参与完成了广东省重大科技专项和广州市重大科技攻关等研究项目。曾获广东省教育厅科技进步三等奖和广州市优秀论文三等奖。'
        },
          {
            img: '../static/image/tzl.png',
            name: '唐志列',
            sex: '男',
            identity:'物理与电信工程学院院长',
            major:'量子信息学，量子电子学，激光光谱学。',
            desc: '唐志列，男，物理学教授， 博士生导师，现任华南师范大学物理与电信工程学院院长。迄今为止在国内外刊物上发表学术论文100多篇，国家发明专利2项， 在光量子保密通信、光声光谱和光声成像、激光共聚焦显微镜等领域做了较系统的研究工作，主持完成了国家自然科学基金、广东省自然科学基金团队项目等高水平研究课题。参与完成了广东省重大科技专项和广州市重大科技攻关等研究项目。曾获广东省教育厅科技进步三等奖和广州市优秀论文三等奖。'
          },
          {
            img: '../static/image/tzl.png',
            name: '唐志列',
            sex: '男',
            identity:'物理与电信工程学院院长',
            major:'量子信息学，量子电子学，激光光谱学。',
            desc: '唐志列，男，物理学教授， 博士生导师，现任华南师范大学物理与电信工程学院院长。迄今为止在国内外刊物上发表学术论文100多篇，国家发明专利2项， 在光量子保密通信、光声光谱和光声成像、激光共聚焦显微镜等领域做了较系统的研究工作，主持完成了国家自然科学基金、广东省自然科学基金团队项目等高水平研究课题。参与完成了广东省重大科技专项和广州市重大科技攻关等研究项目。曾获广东省教育厅科技进步三等奖和广州市优秀论文三等奖。'
          },
          {
            img: '../static/image/tzl.png',
            name: '唐志列',
            sex: '男',
            identity:'物理与电信工程学院院长',
            major:'量子信息学，量子电子学，激光光谱学。',
            desc: '唐志列，男，物理学教授， 博士生导师，现任华南师范大学物理与电信工程学院院长。迄今为止在国内外刊物上发表学术论文100多篇，国家发明专利2项， 在光量子保密通信、光声光谱和光声成像、激光共聚焦显微镜等领域做了较系统的研究工作，主持完成了国家自然科学基金、广东省自然科学基金团队项目等高水平研究课题。参与完成了广东省重大科技专项和广州市重大科技攻关等研究项目。曾获广东省教育厅科技进步三等奖和广州市优秀论文三等奖。'
          }],
        dialogFormVisible: false,
        innerVisible: false,
        dialogImageUrl: '',
        formLabelWidth: '100px',
        form: {},
        currentIndex: '',
        dialogStatus: "",
        textMap: {
          update: "新增导师信息",
          editdate: "修改导师信息"
        },
      }
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.innerVisible = true;
      },
      add() {
        this.dialogStatus = "update";
        this.form = {
          img:'',
          name: '',
          sex: '',
          identity: '',
          majoy: '',
          desc: ''
        };
        this.dialogFormVisible = true;
      },
      update() {
        this.form.date = reformat(this.form.date);
        this.tableData5.push(this.form);
        this.dialogFormVisible = false;
      },
      editdate(){
        this.dialogFormVisible = false;
      },
      cancel(){
        this.dialogFormVisible = false;
      },
      handleEdit(index, row) {
        this.dialogStatus = "editdate";
        this.form = this.tableData5[index];
        this.currentIndex = index;
        this.dialogFormVisible = true;
      },
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该条信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.tableData5.splice(index, 1);
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


<style>

  .teacher-table-expand {
    font-size: 0
  }
  .labelColor .el-form-item__label{
    width: 90px;
    color: #99a9bf
  }
  .teacher-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%
  }
</style>
