<template>
  <div>
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
    </el-table>
  </div>
</template>

<script>
    export default {
        name: "teachers",
      data() {
        return {
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
            }]
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
