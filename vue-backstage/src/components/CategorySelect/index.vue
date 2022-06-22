<template>
  <div>
    <el-form :inline="true"  class="demo-form-inline" :model="cForm" >
      <el-form-item label="一级菜单">
        <el-select  placeholder="请选择" v-model="cForm.Category1" @change="handler1"  :disabled="show" >
          <el-option :label="c1.name" :value="c1.id" v-for="(c1,index) in list1" :key="c1.id" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级菜单">
        <el-select  placeholder="请选择" v-model="cForm.Category2" @change="handler2"  :disabled="show" >
          <el-option :label="c2.name" :value="c2.id" v-for="(c2,index) in list2" :key="c2.id" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级菜单">
        <el-select  placeholder="请选择" v-model="cForm.Category3" @change="handler3"  :disabled="show" >
          <el-option :label="c3.name" :value="c3.id" v-for="(c3,index) in list3" :key="c3.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CategorySelect",
  //接收父组件传递的数据
  props:['show'],
  data() {
    return {
      //存储一级分类数据
      list1:[],
      //存储二级分类的数据
      list2:[],
      //存储三级分类的数据
      list3:[],
      //存储选择商品的id
      cForm:{
        Category1:'',
        Category2:'',
        Category3:'',
      }
    }
  },
  mounted() {
    //获取商品一级分类数据
    this.getCategory();
  },
  methods: {
    //获取商品一级分类的数据
    async getCategory(){
      let resule =  await this.$API.attr.reqgetCategory1Id();
      if(resule.code == 200){
        //组件存储服务器返回的数据
          this.list1 = resule.data;
      }
    },
    //监测一级菜单的商品id，有变化就会触发,获取二级分类数据
    async handler1(){
      //变换之后清除二三级数据，重新抓取
      this.list2 = [];
      this.list3 = [];
      this.cForm.Category2 = '';
      this.cForm.Category3 = '';
      //向父组件传递一级菜单的id，
      this.$emit('getCategory',{categoryId:this.cForm.Category1,level:1})
      //有了变化就要获取二级菜单的数据、
      let resule =  await this.$API.attr.reqgetCategory2Id(this.cForm.Category1);
      if(resule.code == 200){
        //存储数据
        this.list2 = resule.data;
      }
    } ,
    //监测二级菜单的数据，有变化就会获取三级分类数据
    async handler2(){
      //重新发送数据需要清除三级id的内容
      this.list3 = [];
      this.cForm.Category3 = '';
       //向父组件传递二级菜单的id，
      this.$emit('getCategory',{categoryId:this.cForm.Category2,level:2})
      //获取三级菜单
        let resule = await this.$API.attr.reqgetCategory3Id(this.cForm.Category2);
        //获取数据成功
        if(resule.code == 200){
          //数据获取成功进行存储
          this.list3 = resule.data;
        }
    },
    //监测三级菜单的数据，有变化就会执行
    handler3(){
       //向父组件传递三级菜单的id，
      this.$emit('getCategory',{categoryId:this.cForm.Category3,level:3})
    }
  },
};
</script>

<style>
</style>