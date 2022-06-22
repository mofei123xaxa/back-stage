<template>
  <div>
      <div class="serch-top">
          <span>搜索用户数量</span>
          <i class="el-icon-info"></i>
      </div>
      <div class="serch-center">
          <span class="big">1234</span>
          <span>17.1</span>
          <i class="el-icon-caret-bottom" ></i>
          <i class="el-icon-caret-top " ></i>
      </div>
      <div class="serch_charts" ref="serch_charts" ></div>
  </div>
</template>

<script>
import *as echarts from 'echarts'
export default {
    name:'lineCharts',
      mounted(){
        //初始化echarts实例
        let linCharts = echarts.init(this.$refs.serch_charts);
        linCharts.setOption({
            xAxis:{
                //隐藏x轴
                show:false,
                //让图形有一个上下起伏的样式，均分 
                type:'category'
            },
            yAxis:{
                //隐藏y轴
                show:false
            },
            //系列
            series:[
                {
                    type:'line',
                    data:[21,32,44,5,35,65],
                    //拐点的样式的设置
                    itemStyle:{
                        opacity:0
                    },
                    //让曲线平滑的属性
                    smooth:true
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

<style>
    .serch-top span {
        margin-right: 20px ;
    }
    .serch-center{
        margin-top: 20px;
    }
    .serch-center .big{
        font-size: 25px;
        margin-right:50px ;
    }
    .serch_charts{
        width: 100%;
        height: 150px;
    }
</style>