<template>
  <div>
    <el-button @click="clearFilter" style="margin: 5px 15px 0 15px">清除筛选</el-button>
    <el-table :data="tableData2" border style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="project-table-expand">
            <el-form-item class="labelColor" label="详细介绍">
              <span>{{ props.row.desc}}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="科研项目" ></el-table-column>
      <el-table-column prop="teacher" label="指导老师"sortable  column-key="date"
                       :filters="[{text: '崔老师', value: '崔老师'},
                   {text: '张老师', value: '张老师'},
                   {text: '邱老师', value: '邱老师'}]" :filter-method="filterHandler">
      </el-table-column>
      <el-table-column prop="institute" label="归属学院" sortable  column-key="date"
                       :filters="[{text: '物理与电信工程学院', value: '物理与电信工程学院'},
                   {text: '信息光电子科技学院', value: '信息光电子科技学院'},
                   {text: '化学与环境学院', value: '化学与环境学院'},
                   {text: '华南先进光电子研究院', value: '华南先进光电子研究院'}]" :filter-method="filterHandler">
      </el-table-column>
      <el-table-column prop="introduce" label="项目详情" show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleproject(scope.$index, scope.row)">申请项目</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="申请项目" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="学号" :label-width="formLabelWidth">
          <el-input v-model="form.number" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="自荐描述" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.selfdesc" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="项目名称" :label-width="formLabelWidth">
          <el-input v-model="form.project" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="指导老师" :label-width="formLabelWidth">
          <el-input v-model="form.teacher" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="cancel">取 消</el-button>
        <el-button type="primary" @click="borrow">申 请</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: "teachproject",
    data() {
      return {
        tableData2: [{
          name:'挑战杯',
          teacher:'崔老师',
          institute:'物理与电信工程学院',
          introduce:'展开查看详情',
          desc: '挑战杯是“挑战杯”全国大学生系列科技学术竞赛的简称，是由共青团中央、中国科协、教育部和全国学联、地方省级人民政府共同主办的全国性的大学生课外学术科技创业类竞赛，承办高校为国内著名大学。“挑战杯”竞赛在中国共有两个并列项目，一个是“挑战杯”全国大学生课外学术科技作品竞赛（大挑）；另一个则是“挑战杯”中国大学生创业计划竞赛（小挑）。这两个项目的全国竞赛交叉轮流开展，每个项目每两年举办一届。“挑战杯”系列竞赛被誉为中国大学生科技创新创业的“奥林匹克”盛会，是目前国内大学生最关注最热门的全国性竞赛，也是全国最具代表性、权威性、示范性、导向性的大学生竞赛。'
        },{
          name:'挑战杯',
          teacher:'张老师',
          institute:'信息光电子科技学院',
          introduce: '挑战杯是“挑战杯”全国大学生系列科技学术竞赛的简称，是由共青团中央、中国科协、教育部和全国学联、地方省级人民政府共同主办的全国性的大学生课外学术科技创业类竞赛，承办高校为国内著名大学。“挑战杯”竞赛在中国共有两个并列项目，一个是“挑战杯”全国大学生课外学术科技作品竞赛（大挑）；另一个则是“挑战杯”中国大学生创业计划竞赛（小挑）。这两个项目的全国竞赛交叉轮流开展，每个项目每两年举办一届。“挑战杯”系列竞赛被誉为中国大学生科技创新创业的“奥林匹克”盛会，是目前国内大学生最关注最热门的全国性竞赛，也是全国最具代表性、权威性、示范性、导向性的大学生竞赛。'
        },{
          name:'挑战杯',
          teacher:'崔老师',
          institute:'物理与电信工程学院',
          introduce: '挑战杯是“挑战杯”全国大学生系列科技学术竞赛的简称，是由共青团中央、中国科协、教育部和全国学联、地方省级人民政府共同主办的全国性的大学生课外学术科技创业类竞赛，承办高校为国内著名大学。“挑战杯”竞赛在中国共有两个并列项目，一个是“挑战杯”全国大学生课外学术科技作品竞赛（大挑）；另一个则是“挑战杯”中国大学生创业计划竞赛（小挑）。这两个项目的全国竞赛交叉轮流开展，每个项目每两年举办一届。“挑战杯”系列竞赛被誉为中国大学生科技创新创业的“奥林匹克”盛会，是目前国内大学生最关注最热门的全国性竞赛，也是全国最具代表性、权威性、示范性、导向性的大学生竞赛。'
        },{
          name:'挑战杯',
          teacher:'邱老师',
          institute:'华南先进光电子研究院',
          introduce: '挑战杯是“挑战杯”全国大学生系列科技学术竞赛的简称，是由共青团中央、中国科协、教育部和全国学联、地方省级人民政府共同主办的全国性的大学生课外学术科技创业类竞赛，承办高校为国内著名大学。“挑战杯”竞赛在中国共有两个并列项目，一个是“挑战杯”全国大学生课外学术科技作品竞赛（大挑）；另一个则是“挑战杯”中国大学生创业计划竞赛（小挑）。这两个项目的全国竞赛交叉轮流开展，每个项目每两年举办一届。“挑战杯”系列竞赛被誉为中国大学生科技创新创业的“奥林匹克”盛会，是目前国内大学生最关注最热门的全国性竞赛，也是全国最具代表性、权威性、示范性、导向性的大学生竞赛。'
        },{
          name:'挑战杯',
          teacher:'张老师',
          institute:'物理与电信工程学院',
          introduce: '挑战杯是“挑战杯”全国大学生系列科技学术竞赛的简称，是由共青团中央、中国科协、教育部和全国学联、地方省级人民政府共同主办的全国性的大学生课外学术科技创业类竞赛，承办高校为国内著名大学。“挑战杯”竞赛在中国共有两个并列项目，一个是“挑战杯”全国大学生课外学术科技作品竞赛（大挑）；另一个则是“挑战杯”中国大学生创业计划竞赛（小挑）。这两个项目的全国竞赛交叉轮流开展，每个项目每两年举办一届。“挑战杯”系列竞赛被誉为中国大学生科技创新创业的“奥林匹克”盛会，是目前国内大学生最关注最热门的全国性竞赛，也是全国最具代表性、权威性、示范性、导向性的大学生竞赛。'
        },{
          name:'挑战杯',
          teacher:'邱老师',
          institute:'物理与电信工程学院',
          introduce: '挑战杯是“挑战杯”全国大学生系列科技学术竞赛的简称，是由共青团中央、中国科协、教育部和全国学联、地方省级人民政府共同主办的全国性的大学生课外学术科技创业类竞赛，承办高校为国内著名大学。“挑战杯”竞赛在中国共有两个并列项目，一个是“挑战杯”全国大学生课外学术科技作品竞赛（大挑）；另一个则是“挑战杯”中国大学生创业计划竞赛（小挑）。这两个项目的全国竞赛交叉轮流开展，每个项目每两年举办一届。“挑战杯”系列竞赛被誉为中国大学生科技创新创业的“奥林匹克”盛会，是目前国内大学生最关注最热门的全国性竞赛，也是全国最具代表性、权威性、示范性、导向性的大学生竞赛。'
        },{
          name:'挑战杯',
          teacher:'崔老师',
          institute:'化学与环境学院',
          introduce: '挑战杯是“挑战杯”全国大学生系列科技学术竞赛的简称，是由共青团中央、中国科协、教育部和全国学联、地方省级人民政府共同主办的全国性的大学生课外学术科技创业类竞赛，承办高校为国内著名大学。“挑战杯”竞赛在中国共有两个并列项目，一个是“挑战杯”全国大学生课外学术科技作品竞赛（大挑）；另一个则是“挑战杯”中国大学生创业计划竞赛（小挑）。这两个项目的全国竞赛交叉轮流开展，每个项目每两年举办一届。“挑战杯”系列竞赛被誉为中国大学生科技创新创业的“奥林匹克”盛会，是目前国内大学生最关注最热门的全国性竞赛，也是全国最具代表性、权威性、示范性、导向性的大学生竞赛。'
        }],
        dialogFormVisible: false,
        formLabelWidth: '100px',
        form: {},
        currentIndex: ''
      }
    },
    methods: {
      clearFilter() {
        this.$refs.filterTable.clearFilter();
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      handleproject(index, row) {
        this.form = {
          number: '',
          name: '',
          selfdesc:'',
          project: '',
          teacher: ''
        };
        this.dialogFormVisible = true;
      },
      cancel(){
        this.dialogFormVisible = false;
      },
      borrow(){
        this.dialogFormVisible = false;
      }
    }
  }
</script>

<style scoped>
  .project-table-expand {
    font-size: 0
  }
  .labelColor .el-form-item__label{
    width: 90px;
    color: #99a9bf
  }
  .project-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%
  }
</style>
