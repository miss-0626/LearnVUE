<template>
  <div>
    <el-table ref="filterTable" :data="tableData4.slice((currentPage-1)*pagesize,currentPage*pagesize).filter(data => !search || data.equiName.toLowerCase().includes(search.toLowerCase()))" style="width: 100%">
      <!--<el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="course-table-expand">
            <el-form-item class="labelColor" label="详细介绍">
              <span>{{ props.row.desc}}</span>
            </el-form-item>
            <el-form-item class="labelColor" label="设备用途">
              <span>{{ props.row.use}}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="设备图片" prop="img" width="200">
        <template slot-scope="props">
          <el-popover placement="right" title="" trigger="click">
            <img :src="props.row.img" style="max-width:300px;max-height:300px"/>
            <img slot="reference" :src="props.row.img" :alt="props.row.img" style="width:100px;height:100px" class="image">
          </el-popover>
        </template>
      </el-table-column>-->
      <el-table-column prop="equiNum" label="设备编号" width="150"></el-table-column>
      <el-table-column prop="equiName" label="设备名称" width="150"></el-table-column>
      <el-table-column prop="labNum" label="所属实验室"></el-table-column>
      <el-table-column prop="state" label="状态"
                       :filters="[{ text: '占用', value: '占用' },
                                  { text: '空闲', value: '空闲' }]"
                       :filter-method="filterTag" filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag :type="scope.row.state === '占用' ? '空闲' : 'success'"
                  disable-transitions>{{scope.row.state}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="详情">
        <template slot-scope="scope">
          <router-link tag="a" :to="{name:'que-detail',query:{equiId:scope.row.equiId}}">查看详情</router-link>
          <!--<router-link tag="a" target="_blank" :to="{name:'que-detail',query:{equiId:scope.row.equiId}}">查看详情</router-link>-->
        </template>
      </el-table-column>
      <el-table-column align="right" width="220">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入设备名称搜索">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
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
                   :total="tableData4.length">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: "queshow",
    data() {
      return {
        currentPage:1,
        pagesize:5,
        tableData4: [/*{
          img: '../static/image/示波器.jpg',
          quename:'示波器',
          introduce: '这是一条示波器介绍',
          desc:'示波器是一种用途十分广泛的电子测量仪器。它能把肉眼看不见的电信号变换成看得见的图像，便于人们研究各种电现象的变化过程。示波器利用狭窄的、由高速电子组成的电子束，打在涂有荧光物质的屏面上，就可产生细小的光点（这是传统的模拟示波器的工作原理）。在被测信号的作用下，电子束就好像一支笔的笔尖，可以在屏面上描绘出被测信号的瞬时值的变化曲线。',
          use:'利用示波器能观察各种不同信号幅度随时间变化的波形曲线，还可以用它测试各种不同的电量，如电压、电流、频率、相位差、调幅度等等。'
        },*/
          {
            equiId:'1',
            equiNum:'1-101',
            equiName:'示波器',
            labNum:'8-520',
            state:'空闲'
          },
          {
            equiId:'11',
            equiNum:'1-101',
            equiName:'信号发生器',
            labNum:'8-520',
            state:'占用'
          },{
            equiId:'12',
            equiNum:'1-101',
            equiName:'示波器',
            labNum:'8-520',
            state:'空闲'
          },{
            equiId:'13',
            equiNum:'1-101',
            equiName:'信号发生器',
            labNum:'8-520',
            state:'占用'
          },{
            equiId:'15',
            equiNum:'1-101',
            equiName:'信号发生器',
            labNum:'8-520',
            state:'空闲'
          },{
            equiId:'18',
            equiNum:'1-101',
            equiName:'示波器',
            labNum:'8-520',
            state:'空闲'
          }],
        search:''
      }
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
  .course-table-expand {
    font-size: 0
  }
  .labelColor .el-form-item__label{
    width: 90px;
    color: #99a9bf
  }
  .course-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%
  }
</style>
