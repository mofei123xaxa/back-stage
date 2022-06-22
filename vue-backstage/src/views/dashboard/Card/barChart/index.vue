<template>
  <div class="charts" ref="charts" ></div>
</template>

<script>
import * as echarts from 'echarts';
export default {
    name:'barChart',
    mounted(){
        //初始化echarts实例
        let linCharts = echarts.init(this.$refs.charts);
        linCharts.setOption({
            xAxis:{
                //隐藏x轴
                show:false,
                //均分 
                type:'category'
            },
            yAxis:{
                //隐藏y轴
                show:false
            },
            //系列
            series:[
                {
                    //图表的样式---柱状图
                    type:'bar',
                    data:[21,43,32,46,8,60]
                }
            ],
            //布局调试
            grid:{
                //对上下右左都是零
                left:0,
                top:0,
                bottom:0,
                right:0
            },
            tooltip:{}
        })
    }
}
</script>

<style  >
    .charts{
        widows: 100%;
        height: 100%;
    }
</style>