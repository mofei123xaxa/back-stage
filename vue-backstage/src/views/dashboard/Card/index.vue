<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
       <el-card>
           <!-- 第一个card -->
           <Detail title="总销售额" count="￥126560" >
                <template slot="charts" >
                   <span>周同比 &nbsp;&nbsp;56.67% </span>
                   <svg t="1653399663423" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4267" width="16" height="16"><path d="M698.7 480.9v429.5c0 54.8-44.5 99.3-99.3 99.3H434c-54.8 0-99.3-44.5-99.3-99.3V480.9H70l446.9-463 446.9 463H698.7z m0 0" fill="" p-id="4268"></path></svg>
                   <span>日同比 &nbsp;&nbsp; 19.16%</span>
                  <svg t="1653399771807" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5494" width="16" height="16"><path d="M697.359638 689.069835l-166.241208 170.145122c-5.335519 5.459339-11.773138 8.191566-19.316951 8.191566-7.54279 0-13.982456-2.732228-19.315928-8.191566l-166.241208-170.145122c-8.002254-8.18645-10.251481-19.718087-5.92085-30.417777 4.329609-10.697643 13.921058-17.203824 25.234731-17.203824l134.206608 0 0-452.229708c0-17.838274 14.397918-32.296567 32.236192-32.296567 17.833157 0 32.232099 14.458293 32.232099 32.296567l0 452.229708L678.04371 641.448234c11.31572 0 20.908192 6.506181 25.236777 17.203824C707.610096 669.351748 705.358823 680.883385 697.359638 689.069835z" p-id="5495" fill="#d81e06"></path></svg>
               </template>
               <template slot="footer" >
                   <span>日销售量 &nbsp;&nbsp;$1234</span>
               </template>
           </Detail>
       </el-card>
      </el-col>
      <el-col :span="6">
          <!-- 第二个card -->
        <el-card>
           <Detail title="访问量" count="88460" >
                <template slot="charts" >
                 <lineChart></lineChart>
                </template>
                 <template slot="footer" >
                   <span>日访问量 &nbsp;&nbsp;$1234</span>
               </template>
           </Detail>
       </el-card>
      </el-col>
      <el-col :span="6">
         <el-card>
             <!-- 第三个card -->
           <Detail title="支付笔数" count="88460" >
             <template slot="charts" >
               <barChart></barChart>
             </template>
                <template slot="footer" >
                   <span>转化率 &nbsp;&nbsp;65%</span>
               </template>
           </Detail>
       </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
            <!-- 第四个card -->
           <Detail title="运营活动效果" count="78%" >
             <template slot="charts" >
               <progressChart></progressChart>
             </template>
                 <template slot="footer" >
                   <span>周同比 &nbsp;&nbsp;56.67% </span>
                   <svg t="1653399663423" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4267" width="16" height="16"><path d="M698.7 480.9v429.5c0 54.8-44.5 99.3-99.3 99.3H434c-54.8 0-99.3-44.5-99.3-99.3V480.9H70l446.9-463 446.9 463H698.7z m0 0" fill="" p-id="4268"></path></svg>
                   <span>日同比 &nbsp;&nbsp; 19.16%</span>
                  <svg t="1653399771807" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5494" width="16" height="16"><path d="M697.359638 689.069835l-166.241208 170.145122c-5.335519 5.459339-11.773138 8.191566-19.316951 8.191566-7.54279 0-13.982456-2.732228-19.315928-8.191566l-166.241208-170.145122c-8.002254-8.18645-10.251481-19.718087-5.92085-30.417777 4.329609-10.697643 13.921058-17.203824 25.234731-17.203824l134.206608 0 0-452.229708c0-17.838274 14.397918-32.296567 32.236192-32.296567 17.833157 0 32.232099 14.458293 32.232099 32.296567l0 452.229708L678.04371 641.448234c11.31572 0 20.908192 6.506181 25.236777 17.203824C707.610096 669.351748 705.358823 680.883385 697.359638 689.069835z" p-id="5495" fill="#d81e06"></path></svg>
             </template>
           </Detail>
       </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Detail from "./Detail";
import lineChart from './lineChart';
import  barChart from './barChart';
import progressChart from './progressChart';
export default {
  name: "Card",
  components: {
    Detail,
    lineChart,
    barChart,
    progressChart
  },
};
</script>

<style>
</style>
