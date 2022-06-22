<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect @getCategory="getCategory" :show="!isShowtable" ></CategorySelect>
    </el-card>

    <el-card>
      <div v-show="isShowtable">
        <el-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          style="margin: 0 0 10px 0"
          :disabled="!category3Id"
          @click="AddAttr"
          >添加数据</el-button
        >
        <!-- 表单数据 -->
        <el-table style="width: 100%" :data="attrList" border>
          <el-table-column
            type="index"
            label="序号"
            width="80px"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="150px">
          </el-table-column>
          <el-table-column prop="prop" label="属性值列表" width="width">
            <template slot-scope="{ row, $index }">
              <el-tag
                type="success"
                v-for="(attrValue, index) in row.attrValueList"
                :key="attrValue.id"
                style="margin: 0px 10px"
                >{{ attrValue.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="150">
            <template slot-scope="{ row, $index }">
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="updateAttr(row)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete-solid"
                size="mini"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="!isShowtable">
        <el-form ref="form" :model="attrInfo" >
          <el-form-item label="属性名"  >
            <el-input  style="width:300px" v-model="attrInfo.attrName" ></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" icon="el-icon-plus" :disabled="!attrInfo.attrName" @click="addattrList" >添加属性值</el-button></el-button>
        <el-button @click="isShowtable = true" > 取消</el-button>
        <!-- 表单 -->
        <el-table  style="width:100%;margin:15px 0" border :data="attrInfo.attrValueList" >
          <el-table-column
            type="index"
            label="序号"
            width="80">
          </el-table-column>
          <el-table-column
            prop="prop"
            label="属性值名称"
            width="width">
            <template slot-scope="{row,$index}">
              <el-input v-model="row.valueName" placeholder="请输入属性值名称" v-if="row.flag" @blur="update(row)" @keyup.native.enter="update(row)" :ref="$index" ></el-input>
              <span v-else @click="updateText(row,$index)"  style="display:block" >{{row.valueName}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="prop"
            label="操作"
            width="width">
           <template slot-scope="{row,$index}">
 <el-popconfirm :title="`确定删除${row.valueName}?`" @onConfirm="deleteValue($index)" >
                <el-button type="danger" icon="el-icon-delete" slot="reference" ></el-button>
            </el-popconfirm>
           </template>
            
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="updateOraddAttr" :disabled="attrInfo.attrValueList.length < 1"  >保存</el-button>
        <el-button  @click="isShowtable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
//按需引入lodash中的深拷贝
import cloneDeep from "lodash/cloneDeep";

export default {
  name: "Attr",
  data() {
    return {
      run: [{ 1: 1 }, { 2: 2 }],
      category1Id: "",
      category2Id: "",
      category3Id: "",
      //存储从服务器返回的商品列表数据
      attrList: [],
      //控制列表是显示还是隐藏
      isShowtable: true,
      //收集新增属性||修改属性值使用
      attrInfo: {
        attrName: "", //属性名
        attrValueList: [
          //属性值，因为一个属性可以有多个属性值，每一个属性都是需要一个attrId，valueName
          // {
          //   attrId: 0, //相应属性名的id
          //   valueName: "",
          // },
        ],
        categoryId: 0, //三级分类的id
        categoryLevel: 3, //因为服务器也需要区分几级id
      },
    };
  },
  methods: {
    //使用自定义事件的回调获取数据
    getCategory({ categoryId, level }) {
      if (level == 1) {
        //获取子组件的数据，进行存储
        this.category1Id = categoryId;
        //并且把二三级分类的数据进行清空
        this.category2Id = "";
        this.category3Id = "";
        //每一次该变清除缓存的数据
        this.attrList = [];
      } else if (level == 2) {
        //获取子组件的数据，进行存储
        this.category2Id = categoryId;
        //并且把三级分类的数据进行清空
        this.category3Id = "";
        //每一次该变清除缓存的数据
        this.attrList = [];
      } else {
        //获取三级分类的Id
        this.category3Id = categoryId;
        //每一次该变清除缓存的数据
        this.attrList = [];
        //发请求获取品牌
        this.getAttrList();
      }
    },
    //向服务器发送数据，获取品牌
    async getAttrList() {
      //解构
      const { category1Id, category2Id, category3Id } = this;
      //向服务器发送请求，获取商品列表
      let resule = await this.$API.attr.reqAttrList(
        category1Id,
        category2Id,
        category3Id
      );
      if (resule.code == 200) {
        //存储数据
        this.attrList = resule.data;
      }
    },
    //添加属性值||修改是属性值
    addattrList() {
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id, //这个部位的id应该是需要修改属性的id，或是undefined
        valueName: "", //是每个属性的属性值，不只是一个属性值
        // 并且给每一个属性值添加一个判断条件，控制是否隐藏
        flag: true,
      });
      //添加属性值的时候也是需要自动聚焦光标
      this.$nextTick(() => {
        //之前已经给打上标记了，所以直接使用长度减一就好
        this.$refs[this.attrInfo.attrValueList.length - 1].focus();
      });
    },
    //添加数据的回调函数
    AddAttr() {
      //隐藏表单
      this.isShowtable = false;
      //清空已经修改属性值的数据
      this.attrInfo = {
        attrName: "", //属性名
        attrValueList: [
          //属性值，因为一个属性可以有多个属性值，每一个属性都是需要一个attrId，valueName
          // {
          //   attrId: 0, //相应属性名的id
          //   valueName: "",
          // },
        ],
        //在这个地方已经能收到三级菜单的Id
        categoryId: this.category3Id, //三级分类的id
        categoryLevel: 3, //因为服务器也需要区分几级id
      };
    },
    //修改商品中的回调
    updateAttr(row) {
      //隐藏表单 修改数据
      this.isShowtable = false;
      //把row中的数据赋值给attrInfo，进行修改
      //使用浅拷贝没有办法解决点击取消还会有数据残留，就使用lodash中的深拷贝
      //深拷贝与浅拷贝是面试中常问的，cloneDeep就是深拷贝
      this.attrInfo = cloneDeep(row);

      //点击修改商品的时候需要给这个数组添加响应式数据
      this.attrInfo.attrValueList.forEach((itme) => {
        //正常直接添加是不可以的，需要使用API的set属性
        this.$set(itme, "flag", false);
      });
    },
    //变更属性值，显示或是隐藏需要修改的文本，就是显示input||隐藏span
    update(row) {
      //先进行判断，是否用户在中间输入的是空格,如果是就让用户就重新输入
      //这个地方的row就是每次输入到input的值
      if (row.valueName.trim() == "") {
        return this.$message("请输入内容");
      }
      //对用户输入进来的数据进行判断，如果和之前的数据相同、让用户再重新输入
      //下面的some返回的是布尔值，遍历数组
      let resule = this.attrInfo.attrValueList.some((itme) => {
        //itme也包括row 所以需要把row剔除
        if (itme != row) {
          return itme.valueName == row.valueName;
        }
        //用于控制式input显示还是span
        row.flag = true
      });
      //再次进行判断
      if (resule) return this.$message("请不要输入相同的属性");
      //这个就是从input 切换到span
      row.flag = false;
    },
    //点击span的回调函数，显示隐藏于显示，还有其他业务逻辑
    updateText(row, index) {
      //显示input框
      row.flag = true;
      //正常情况下点击没办法获取ref的值
      //所以采用$enxtTick
      this.$nextTick(() => {
        //这个函数就是自动聚焦
        this.$refs[index].focus();
      });
    },
    //点击删除某一属性值
    deleteValue(index) {
      //使用index获取哪一个元素需要删除。
      this.attrInfo.attrValueList.splice(index, 1);
    },
    //点击保存的事件回调函数
    async updateOraddAttr() {
      //遍历数组，筛选出符合的元素进行返回新数组
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(
        (itme) => {
          if (itme.valueName != "") {
            delete itme.flag;
            return true;
          }
        }
      );
       try {
          //数据筛选成功以后开始发送数据
        let resule = await this.$API.attr.reqAddAttrOrUpdate(this.attrInfo);
        //发送成功以后进行书写逻辑
        this.isShowtable = true;
        //显示告诉用户修改||添加成功
          this.$message({type:'success',message:'成功'})
          //重新编译模板
          this.getAttrList();
       } catch (error) {
         alert('失败')
       }
    },
  },
};
</script>

<style>
</style>