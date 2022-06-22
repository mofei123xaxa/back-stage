<template>
  <div>
    <el-form ref="form" label-width="80px">
      <!-- 标题名称 -->
      <el-form-item label="SPU名称"> {{ sku.spuName }} </el-form-item>
      <!-- SKU名称 -->
      <el-form-item label="SKU名称">
        <el-input placeholder="sku名称" v-model="skuInfo.skuName"></el-input>
      </el-form-item>
      <!-- 价格(元) -->
      <el-form-item label="价格(元)">
        <el-input placeholder="价格(元素)" v-model="skuInfo.price"></el-input>
      </el-form-item>
      <!-- 重量(千克) -->
      <el-form-item label="重量(千克)">
        <el-input placeholder="重量(千克)" v-model="skuInfo.weight"></el-input>
      </el-form-item>
      <!-- 价格描述 -->
      <el-form-item label="价格描述">
        <el-input
          type="textarea"
          :rows="4"
          v-model="skuInfo.skuDesc"
        ></el-input>
      </el-form-item>
      <!-- 平台属性，有下拉菜单 -->
      <el-form-item label="平台属性">
        <el-form :inline="true" ref="form" label-width="80px">
          <el-form-item
            :label="attr.attrName"
            v-for="(attr, index) in attrList"
            :key="attr.id"
          >
            <el-select placeholder="请选择" v-model="attr.attrIdAndValue">
              <el-option
                :label="attrValue.valueName"
                :value="`${attr.id}:${attrValue.id}`"
                v-for="(attrValue, index) in attr.attrValueList"
                :key="attrValue.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <!-- 销售属性，有下拉菜单 -->
      <el-form-item label="销售属性">
        <el-form :inline="true" ref="form" label-width="80px">
          <el-form-item
            :label="saleAttr.saleAttrName"
            v-for="(saleAttr, index) in saleAttrList"
            :key="saleAttr.id"
          >
            <el-select placeholder="请选择" v-model="saleAttr.attrIdAndValueId">
              <el-option
                :label="saleAttrValue.saleAttrValueName"
                :value="`${saleAttr.id}:${saleAttrValue.id}`"
                v-for="(saleAttrValue, index) in saleAttr.spuSaleAttrValueList"
                :key="saleAttrValue.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <!-- 图片列表，有表单数据 -->
      <el-form-item label="图片列表">
        <el-table
          style="width: 100%"
          border
          :data="imageList"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="80"> </el-table-column>
          <el-table-column prop="prop" label="图片" width="width">
            <template slot-scope="{ row, $index }">
              <img :src="row.imgUrl" style="width: 100px; height: 100px" />
            </template>
          </el-table-column>
          <el-table-column prop="imgName" label="名称" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <el-button
                type="primary"
                size="mini"
                v-if="row.isDefault == 0"
                @click="installDefault(row)"
                >设为默认</el-button
              >
              <el-button size="mini" v-else>默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveSku">保存</el-button>
        <el-button @click="cancelList">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SkuForm",
  data() {
    return {
      //临时创建为了，不报错使用
      //是下拉菜单的数据
      model: "",
      imageList: [], //存储服务器返回的图片数据
      saleAttrList: [], //存储服务器返回的销售属性列表
      attrList: [], //获取服务器返回平台属性列表
      // 收集sku数据的字段
      skuInfo: {
        //第一类收集的数据，就是父组件收集的数据
        category3Id: 0,
        spuId: 0,
        tmid: 0,
        //第二类数据：需要通过数据的双向绑定v-model收集数据
        skuName: "",
        price: 0,
        weight: "",
        skuDesc: "",
        // 第三类：需要自己书写代码
        skuDefaultImg: "", //默认图片
        //收集图片的字段
        skuImageList: [
          // {
          // }
        ],
        // 平台属性
        skuAttrValueList: [
          // {
          // }
        ],
        //销售属性
        skuSaleAttrValueList: [
          // {
          // }
        ],
      },
      //收集从父组件传递来的参数
      sku: {},
      //作为一个中转变量，存储选中照片的信息
      temporaryImageList: [],
    };
  },
  methods: {
    //点击获取sku的基本数据
    async getData(category1Id, category2Id, sku) {
      console.log(sku);
      //向收集sku的数据进行赋值
      this.skuInfo.category3Id = sku.category3Id;
      this.skuInfo.spuId = sku.id;
      this.skuInfo.tmid = sku.tmId;

      //从父组件传递的数据，赋值给子组件使用
      this.sku = sku;

      //向服务器发送请求，获取sku图片数据
      let result = await this.$API.spu.reqImageList(sku.id);
      if (result.code == 200) {
        let list = result.data;
        //重新进行赋值
        list.forEach((item) => {
          item.isDefault = 0;
        });
        this.imageList = list;
      }
      //发送请求，获取销售属性列表数据
      let result1 = await this.$API.spu.reqSaleAttrList(sku.id);
      if (result1.code == 200) {
        this.saleAttrList = result1.data;
      }
      //发送请求，获取平台属性列表
      let result2 = await this.$API.spu.reqAttrList(
        category1Id,
        category2Id,
        sku.id
      );
      if (result2.code == 200) {
        this.attrList = result2.data;
      }
    },
    //点击取消
    cancelList() {
      this.$emit("cancelList", 0);
    },
    //设置默认  回调函数
    installDefault(row) {
      //遍历数组，使用排他思想，把默认设置上
      this.imageList.forEach((item) => {
        item.isDefault = 0;
      });
      row.isDefault = 1;
      //保存设置默认的图片,收集默认图片的地址
      this.skuInfo.skuDefaultImg = row.imgUrl;
    },
    //复选框点击回调函数
    handleSelectionChange(selection) {
      //直接赋值给skuInfo，数据已经完全
      this.temporaryImageList = selection;
    },
    //向服务器发送请求，添加一个sku
    async saveSku() {
      //先整理参数
      const { skuInfo, attrList, saleAttrList } = this;
      //整理平台属性数据(这个方法还是第一次使用)
      skuInfo.skuAttrValueList = attrList.reduce((prev, item) => {
        if (item.attrIdAndValue) {
          const [attrId, valueId] = item.attrIdAndValue.split(":");
          prev.push({ attrId, valueId });
        }
        return prev;
      }, []);
      //再整理销售属性
      skuInfo.skuSaleAttrValueList = saleAttrList.reduce((prev, item) => {
        if (item.attrIdAndValueId) {
          const [saleAttrId, saleAttrValueId] =
            item.attrIdAndValueId.split(":");
          prev.push({ saleAttrId, saleAttrValueId });
        }
        return prev;
      }, []);
      //整理图片数据
      skuInfo.skuImageList = this.temporaryImageList.map((item) => {
        return {
          imgUrl: item.imgUrl,
          imgName: item.imgName,
          isDefault: item.isDefault,
          spuImgId: item.id,
        };
      });

      //参数整理完毕以后开始发送请求
      let result = await this.$API.spu.reqAddSku(skuInfo);
      if (result.code == 200) {
        this.$message({
          type: "success",
          message: "添加SKU成功",
        });
        this.$emit("cancelList", 0);
        //成功以后清除数据
        Object.assign(this._data, this.$options.data());
      }
    },
  },
};
</script>

<style>
</style>