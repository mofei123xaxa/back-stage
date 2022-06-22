<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix Category-clearfix">
      <span>卡片名称</span>
      <div class="Category-Radio">
        <el-radio-group v-model="radio1">
          <el-radio-button label="上海"></el-radio-button>
          <el-radio-button label="北京"></el-radio-button>
          <el-radio-button label="广州"></el-radio-button>
          <el-radio-button label="深圳"></el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div class="Category-echarts" ref="Category_echarts"></div>
  </el-card>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "Category",
  data() {
    return {
      radio1: "上海",
    };
  },
  mounted() {
    let mycharts = echarts.init(this.$refs.Category_echarts);
    mycharts.setOption({
      title:{
          text:'视频',
          subtext:1058,
          left:'center',
          top:'center'
      },
      tooltip: {
        trigger: "item",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          label: {
            show: true,
            position: "outsize",
          },
          labelLine: {
            show:true,
          },
          data: [
            { value: 1058, name: "视频" },
            { value: 735, name: "Direct" },
            { value: 580, name: "Email" },
            { value: 484, name: "Union Ads" },
            { value: 300, name: "Video Ads" },
          ],
        },
      ],
    });
    //绑定事件
    mycharts.on('mouseover',(params)=>{
        const {name,value} = params.data;
        mycharts.setOption({
          title:{
            text:name,
            subtext:value
          }
        })
    })
  },
};
</script>

<style  >
.Category-clearfix {
  border-bottom: 1px solid black;
  height: 45px;
  line-height: 45px;
  align-items: center;
  display: flex;
  justify-content: space-between;
  position: relative;
}
.Category-Radio {
  position: absolute;
  right: 5px;
}
.Category-echarts {
  width: 100%;
  height: 400px;
}
</style>