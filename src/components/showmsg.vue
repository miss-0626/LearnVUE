<template>
    <div class="background">
      <el-row :span="24" class="background">
      <div class="inform" style="border-style:inset;border-width:5px; background-color: white; margin:100px 180px 0px 180px;border:4px; border-radius: 4px;">
        <p style="text-align: center;color: royalblue;font-size: xx-large"> {{head}} </p>
        <p> <hr size="5px"/> </p>
        <p style="font-size: x-large;white-space:pre-wrap;margin: 0 35px;"> {{main}} </p>
      </div>
      </el-row>
    </div>
</template>

<script>
    export default {
        name: "showmsg",
      data() {
        return {
          head:'通知标题',
          main:'2017、2018级同学：\n' +
            '\n' +
            '       为贯彻“立德树人，追求卓越，自主发展”的本科教育理念，培养具有华师特质的本科生，根据《关于修订2017级本科人才培养方案的工作方案》（教学〔2017〕40号）和《华南师范大学非正式课程实施方案(试行)》（教学〔2018〕11号）等文件精神，从2017级开始，学校将本科教育课程分为正式课程与非正式课程。非正式课程以创新精神为引领，以项目为载体，按照“自主参与，重在体验”的原则创设，鼓励和引导学生在自主实践、锐意创新和服务社会中个性成长、全面发展。\n' +
            '\n' +
            '       非正式课程以学习小时为单位进行计算，学习小时为完成项目所需的有效时长（非自然小时）。2017级及之后年级的本科生在校期间至少完成40学习小时非正式课程（模块不限）学习方可毕业。为确保本学期非正式课程选课顺利进行，现将有关事宜通知如下：\n' +
            '\n' +
            '一、选课对象\n' +
            '\n' +
            '2017、2018级全日制本科生。\n' +
            '\n' +
            '二、选课时间\n' +
            '\n' +
            '2019年3月9日（周六）晚上7:00至3月11日（周一）中午12:00。\n' +
            '\n' +
            '三、选课注意事项\n' +
            '\n' +
            '（一）登陆https://fzskc.scnu.edu.cn，查看本学期非正式课程开课列表。课程分“可选课”和“非可选课，项目结束后录入”两种类型。同学们本次选课仅可选择“可选课”。其它课程按项目计划在项目结题、课程完成后由教师录入学生信息。\n' +
            '\n' +
            '（二）本学期非正式课程开设情况详见“2018-2019（2）非正式课程列表”（附件1），本学期“可选课”项目实施计划详见“2018-2019（2）非正式课程实施计划（可选类） (附件2)，请同学们选课前查阅，了解课程目标、任课教师、课程进度、参考文献、考核方式等课程核心信息，同时关注授课对象、课程先修要求。\n' +
            '\n' +
            '（三）选课支持电脑和手机端操作。请同学们结合自身学习兴趣及课程修读要求进行选课，每位同学本学期“可选课”限选1门，“非可选课，项目结束后录入”课程修读不限。\n' +
            '\n' +
            '（四）选课采用电脑自动筛选方式，其结果与选课时间先后无关，请同学们尽量避开选课高峰时段，以避免不必要的网络拥塞。\n' +
            '\n' +
            '（五）教学安排将在选课后另行通知，请同学们每周登陆非正式课程平台（https://fzskc.scnu.edu.cn），及时查看教学动态。\n' +
            '\n' +
            '非正式课程选课工作联系人：林老师、潘老师，联系电话：85216107，邮箱：scnuzlk@126.com。'+'\n'+'\n'+'\n' ,
        }
      }
    }
</script>

<style scoped>
  .background{
    width: 100%;
    padding-bottom: 10%;
    height: 100%;
    background: url('../assets/background.jpg') no-repeat center center fixed;
    background-size: cover;
    background-color: #0C1424;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
  }
</style>
