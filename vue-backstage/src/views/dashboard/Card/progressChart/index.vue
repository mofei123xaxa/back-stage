<template>
  <div class="charts" ref="charts" ></div>
</template>

<script>
import * as echarts from 'echarts';
export default {
    name:'progressChart',
    mounted(){
        //初始化echarts实例
        let linCharts = echarts.init(this.$refs.charts);
        linCharts.setOption({
            xAxis:{
                //隐藏x轴
                show:false,
                min:0,
                max:100     
            },
            yAxis:{
                //隐藏y轴
                show:false,
                  //均分 
                type:'category'
            },
            //系列
            series:[
                {
                    //图表的样式---柱状图
                    type:'bar',
                    data:[78],
                    //设置的大小
                    barWidth:10,
                    //背景颜色，必须设置
                    showBackground:true,
                    backgroundStyle:{
                        color:'#eee'
                    },
                    label:{
                        show:true,
                        formatter:'|',
                        position:'right'
                    }
                }
            ],
            //布局调试
            grid:{
                //对上下右左都是零
                left:0,
                top:0,
                bottom:0,
                right:0
            }
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