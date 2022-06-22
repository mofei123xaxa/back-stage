<template>
  <div>
    <!-- 表单数据 -->
    <el-table style="width: 100%" border :data="records">
      <el-table-column type="index" label="序号" width="80" align="center">
      </el-table-column>
      <el-table-column prop="skuName" label="名称" width="width">
      </el-table-column>
      <el-table-column prop="skuDesc" label="描述" width="width">
      </el-table-column>
      <el-table-column label="默认图片" width="120">
        <template slot-scope="{ row, $index }">
          <img
            :src="row.skuDefaultImg"
            alt=""
            style="width: 80px; height: 80px"
          />
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量" width="80"> </el-table-column>
      <el-table-column prop="price" label="价格" width="80"> </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{ row, $index }">
          <el-button
            type="info"
            icon="el-icon-bottom"
            size="mini"
            v-if="row.isSale == 0"
            @click="sale(row)"
          ></el-button>
          <el-button
            type="success"
            icon="el-icon-top"
            size="mini"
            v-else
            @click="cancel(row)"
          ></el-button>
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="edit"
          ></el-button>
          <el-button
            type="info"
            icon="el-icon-info"
            size="mini"
            @click="detailedList(row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页器
     -->
    <el-pagination
      style="text-align: center"
      :current-page="page"
      :page-sizes="[3, 5, 10]"
      :page-size="3"
      layout="prev, pager, next, jumper,->,total,sizes"
      @current-change="getSkuList"
      @size-change="handleSizeChange"
      :total="total"
    >
    </el-pagination>
    <!-- 抽屉效果 -->
    <el-drawer :visible.sync="show" :show-close="false" size="50%">
      <el-row>
        <el-col :span="6">名称</el-col>
        <el-col :span="16">{{ skuByList.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6">描述</el-col>
        <el-col :span="16">{{ skuByList.skuDesc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6">价格</el-col>
        <el-col :span="16">{{ skuByList.price }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6">平台属性</el-col>
        <el-col :span="16">
          <el-tag
            type="success"
            v-for="(attr, index) in skuByList.skuSaleAttrValueList"
            :key="attr.id"
            style="margin: 0 10px"
            >{{ attr.saleAttrValueName }}</el-tag
          >
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">商品图片</el-col>
        <!-- 使用轮播图 -->
        <el-col :span="16">
          <el-carousel height="500px">
            <el-carousel-item v-for="item in skuByList.skuImageList" :key="item.id">
              <img :src="item.imgUrl" alt="" style="height:100%" >
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "Sku",
  data() {
    return {
      page: 1, //当前是第几页
      limit: 5, //当前页的数据
      records: [], //存储SKU的列表的数据
      total: 0, //服务器返回的全部数据，有多少条
      show: false, //控制抽屉效果的显示与隐藏
      skuByList: {}, //存储sku详情数据
    };
  },
  mounted() {
    this.getSkuList();
  },
  methods: {
    async getSkuList(pages = 1) {
      this.page = pages;
      //解构数据
      const { page, limit } = this;
      //向服务器发送请求获取数据
      let result = await this.$API.sku.reqSkuList(page, limit);
      if (result.code == 200) {
        this.records = result.data.records;
        this.total = result.data.total;
      }
    },
    //每一页展示几条数据
    handleSizeChange(limit) {
      this.limit = limit;
      this.getSkuList();
    },
    //上架
    async sale(row) {
      let result = await this.$API.sku.reqSale(row.id);
      if (result.code == 200) {
        row.isSale = 1;
        this.$message({
          type: "success",
          message: "上架成功",
        });
      }
    },
    //下架
    async cancel(row) {
      let result = await this.$API.sku.reqCancel(row.id);
      if (result.code == 200) {
        row.isSale = 0;
        this.$message({
          type: "success",
          message: "下架成功",
        });
      }
    },
    //正在开发中
    edit() {
      this.$message("正在开发中");
    },
    //展示商品详情
    async detailedList(sku) {
      this.show = true;
      //向服务器发送请求，获取sku详情数据
      let result = await this.$API.sku.reqSkuById(sku.id);
      if (result.code == 200) {
        //  存储sku详情数据
        this.skuByList = result.data;
      }
    },
  },
};
</script>


<style scoped >
.el-row .el-col-6 {
  font-size: 20px;
  text-align: right;
}
.el-col {
  margin: 10px 10px;
}
</style>