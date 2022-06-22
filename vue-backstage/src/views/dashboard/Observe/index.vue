<template>
  <div>
    <el-row :gutter="20" class="buttom" >
      <el-col :span="12">
        <!-- 左边的搜索界面 -->
        <Serch></Serch>
      </el-col>
      <el-col :span="12">
        <!-- 右边的饼状图 -->
        <Category></Category>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Serch from './Sarch';
import Category from './Category';
export default {
    name:'Observe',
    components:{
      Serch,
      Category
    },
}
</script>

<style scoped >
  .buttom{
    margin-top:30px ;
  }
</style>