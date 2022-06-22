<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <!--  @tab-click="handleClick" -->
      <el-tabs class="tabs" v-model="activeName">
        <el-tab-pane label="销售额" name="sale"></el-tab-pane>
        <el-tab-pane label="访问量" name="visite"></el-tab-pane>
      </el-tabs>
      <div class="right">
        <span @click="setToday" >今日</span>
        <span @click="setWeeks" >本周</span>
        <span @click="setMonth" >本月</span>
        <span @click="setYear" >本年</span>
        <!-- v-model="value1" -->
        <el-date-picker
         v-model="data"
          class="data"
          size="mini"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </div>
    </div>
    <el-row :gutter="10">
      <el-col :span="16">
        <!-- 容器 -->
        <div class="chart" ref="charts"></div>
      </el-col>
      <el-col :span="8" class="row-right" >
            <h3>门店{{updateAccess}}排名</h3>
            <ul>
                <li>
                    <span class="lindex" >1</span>
                    <span>肯德基</span>
                    <span>1234</span>
                </li>
                <li>
                    <span class="lindex" >2</span>
                    <span>肯德基</span>
                    <span>1234</span>
                </li>
                <li>
                    <span class="lindex" >3</span>
                    <span>肯德基</span>
                    <span>1234</span>
                </li>
                <li>
                    <span  class="xindex" >4</span>
                    <span>肯德基</span>
                    <span>1234</span>
                </li>
                <li>
                     <span class="xindex" >5</span>
                    <span>肯德基</span>
                    <span>1234</span>
                </li>
                <li>
                     <span class="xindex" >6</span>
                    <span>肯德基</span>
                    <span>1234</span>
                </li>
                <li>
                     <span class="xindex" >7</span>
                    <span>肯德基</span>
                    <span>1234</span>
                </li>
            </ul>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import * as echarts from "echarts";
import dayjs from 'dayjs'
export default {
  name: "Sale",
  data() {
    return {
      activeName: "sale",//控制标题是销售额 还是访问量
      myCharts:null,//可视化数据的值
      data:[],//日历收集的数据
    };
  },
  //配置项
  methods: {
      //今天的回调函数
      setToday(){
            const day = dayjs().format('YYYY-MM-DD');
            this.data = [day,day];
      },
      //本周
      setWeeks(){
            const start = dayjs().day(1).format('YYYY-MM-DD');
            const end = dayjs().day(7).format('YYYY-MM-DD');
            this.data = [start,end];
      },
      //本月
      setMonth(){
          const start = dayjs().startOf('month').format('YYYY-MM-DD');
          const end = dayjs().endOf('month').format('YYYY-MM-DD');
          this.data = [start,end];
      },
      //本年
      setYear(){
          const start = dayjs().startOf('year').format('YYYY-MM-DD');
          const end = dayjs().endOf('year').format('YYYY-MM-DD');
          this.data = [start,end];
      },
  },
  //钩子
  mounted() {
    this.myCharts = echarts.init(this.$refs.charts);
    this.myCharts.setOption({
        title:{
            text:'销售额趋势'
        },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: [10, 52, 200, 334, 390, 330, 220,323,43,53,99,100],
        },
      ],
    });
  },
  //计算属性
  computed:{
      updateAccess(){
          return this.activeName == 'sale' ?'销售额':'访问量' 
      }
  },
  //监视属性
  watch:{
      //监视变换的标题
      updateAccess(){
        //重新修改图标的配置数据
        this.myCharts.setOption({
            //只覆盖标题的数据
            title:{
                text:this.updateAccess
            }
        })
      }
  }
};
</script>

<style  scoped >
.clearfix {
  display: flex;
  position: relative;
  justify-content: space-between;
}
.tabs {
  width: 100%;
}
.right {
  position: absolute;
  right: 0px;
}
.data {
  margin: 0 20px;
}
.right span {
  margin: 0 15px;
}
.box-card {
  margin-top: 25px;
}
.chart {
  width: 100%;
  height: 300px;
}
.row-right {
    padding: 0px;
}
.row-right ul{
    list-style: none;
    width: 100%;
    height: 300px;
    padding: 0;
}
.row-right ul li {
    height: 8%;
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    margin: 10px 0 ;
}
.row-right ul li .lindex{
    width: 23px;
    height: 23px;
    background: black;
    color: #fff;
    border-radius: 50%;
    text-align: center;
}
.row-right ul li .xindex{
    margin-left:5px ;
}
</style>