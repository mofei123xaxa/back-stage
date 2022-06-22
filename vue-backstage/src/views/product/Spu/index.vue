<template>
  <div>
    <el-card style="margin: 20px 0">
      <!-- 三级联动组件，已经封装成为一个全局组件 -->
      <CategorySelect
        @getCategory="getCategory"
        :show="scene != 0"
      ></CategorySelect>
    </el-card>
    <el-card>
      <!-- 底部这里会有三个组件是显示或是隐藏 -->
      <div v-show="scene == 0">
        <el-button
          type="primary"
          icon="el-icon-plus"
          style="margin: 0 0 20px 0"
          @click="addSpu"
          :disabled="!category3Id"
          >添加SPU</el-button
        >
        <el-table style="width: 100%" border :data="records">
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="spuName" label="spu名称" width="width">
          </el-table-column>
          <el-table-column prop="description" label="spu描述" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <!-- 这里的按钮将来用hinbutton替换,也没有替换 因为不影响 -->
              <el-button
                type="success"
                icon="el-icon-plus"
                size="mini"
                title="添加sku"
                @click="addSku(row)"
              ></el-button>
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                title="修改spu"
                @click="update(row)"
              ></el-button>
              <el-button
                type="info"
                icon="el-icon-info"
                size="mini"
                title="查看当前spu全部sku列表"
                @click="handler(row)"
              ></el-button>
              <!-- 使用Popconfirm 气泡确认框 -->
              <el-popconfirm
                title="这是一段内容确定删除吗？"
                @onConfirm="deleteSpu(row)"
              >
                <el-button
                  style="margin-left: 10px"
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  title="删除spu"
                  slot="reference"
                ></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器           
          -->
        <el-pagination
          style="text-align: center"
          :current-page="page"
          :page-sizes="[3, 5, 10]"
          :page-size="limit"
          layout="prev, pager, next, jumper,->,sizes,total"
          :total="total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        >
        </el-pagination>
      </div>
      <SpuForm v-show="scene == 1" @chenaudate="chenaudate" ref="spu"></SpuForm>
      <SkuForm v-show="scene == 2" ref="sku" @cancelList="cancelList"></SkuForm>
    </el-card>
    <el-dialog
      :title="`${spu.spuName}的SKU列表`"
      :visible.sync="dialogTableVisible"
      :before-close ="close"
    >
    <!-- 展示sku列表数据的table -->
      <el-table :data="skuList" style="width: 100%" border v-loading="loading" >
        <el-table-column prop="skuName" label="名称" width="width">
           </el-table-column>
        <el-table-column prop="price" label="价格" width="width">
           </el-table-column>
        <el-table-column prop="isSale" label="重量" width="width">
           </el-table-column>
        <el-table-column prop="prop" label="默认图片" width="width">
          <template slot-scope="{row,$index}" >
              <img :src="row.skuDefaultImg" alt="" style="width:100px;heigth:100px" >
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
//引入子组件
import SkuForm from "./SkuForm";
import SpuForm from "./SpuForm";
export default {
  name: "Sup",
  //注册子组件
  components: {
    SkuForm,
    SpuForm,
  },
  data() {
    return {
      //相应的一二三级id
      category1Id: "",
      category2Id: "",
      category3Id: "",
      //获取服务器存储的数据列表
      page: 1, //当前是第几页
      limit: 3, //每一页需要展示多少条数据
      records: [], //spu返回的数据
      total: 0, //分页器需要展示多少条数据
      //控制三个组件的显示与隐藏、添加spu||修改spu||添加
      scene: 0, //o代表显示最开始的组件列表，1代表显示Spu修改||添加aku  2代表添加sku
      dialogTableVisible: false, //控制是否显示sku列表数据
      spu: {}, //存储sku数据
      skuList: [], //存储服务器返回的sku列表数据
      loading:true, //用于控制是否有转圈的效果
    };
  },
  methods: {
    //自定义事件回调函数，用于接收从子组件中传递来的 一 二 三 级Id
    getCategory({ categoryId, level }) {
      if (level == 1) {
        //相应的一级id
        this.category1Id = categoryId;
        //并且把二三级id给清空
        (this.category2Id = ""), (this.category3Id = "");
      } else if (level == 2) {
        //存储id
        this.category2Id = categoryId;
        //清除三级id
        this.category3Id = "";
      } else {
        //获取的三级分类id
        this.category3Id = categoryId;
        //都成功以后向服务器发送请求，获取数据,调用回调
        this.getSpuList();
      }
    },
    //获取Spu列表数据
    async getSpuList() {
      //解构函数
      const { page, limit, category3Id } = this;
      //向服务器发送数据
      let resule = await this.$API.spu.reqSpuList(page, limit, category3Id);
      //服务器返回数据成功
      if (resule.code == 200) {
        //进行存储数据列表数据
        this.records = resule.data.records;
        this.total = resule.data.total;
      }
    },
    //改变当前第几页的回调
    handleCurrentChange(page) {
      //赋值
      this.page = page;
      //重新编译模板
      this.getSpuList();
    },
    //改变当前显示几条数据的回调
    handleSizeChange(limit) {
      this.limit = limit;
      this.getSpuList();
    },
    //添加Spu的回调函数，切换数据使用
    addSpu() {
      //进行切换显示那个组件
      this.scene = 1;
      //并且获取服务器数据,使用标签获取子组件数据
      this.$refs.spu.getBrandOrSales(this.category3Id);
      //点击添加的时候清空全部值，并且重新赋值从服务器返回的值
    },
    //修改Spu的回调函数
    update(row) {
      this.scene = 1;
      //获取子组件的方法,并且传递参数,可以通过$ref获取
      this.$refs.spu.initSpuData(row);
    },
    //接收子组件传递来的参数spuForm
    chenaudate({ scene, flag }) {
      //flag这个形参是为了区分是添加||修改
      //切换为最开始的页面
      this.scene = scene;
      if (flag == "修改") {
        //并且重新刷新数据
        this.getSpuList();
      } else {
        //并且重新刷新数据
        this.page = 1;
        this.getSpuList();
      }
    },
    //删除spu事件回调
    async deleteSpu(row) {
      //向服务器发送请求，删除数据
      let result = await this.$API.spu.reqDeleteSpu(row.id);
      if (result.code == 200) {
        this.$message({
          type: "success",
          message: "删除成功",
        });
        //先进行判断需不需要返回前一页码
        if (this.records.length > 1) {
          this.getSpuList();
        } else {
          this.page--;
          this.getSpuList();
        }
      }
    },
    //显示添加sku列表
    addSku(row) {
      //显示sku列表
      this.scene = 2;
      //向sku子组件发送请求,获取基本数据
      this.$refs.sku.getData(this.category1Id, this.category2Id, row);
    },
    //接收子组件传递来的参数skuFrom
    cancelList(scene) {
      this.scene = scene;
    },
    //是否显示sku列表数据，以及获取sku列表
    async handler(spu) {
      //显示sku列表数据
      this.dialogTableVisible = true;
      //进行赋值，给表单名称
      this.spu = spu;
      //发送请求，获取sku列表
      let result = await this.$API.spu.reqSkuList(spu.id);
      if (result.code == 200) {
        //返回的数据进行赋值存储
        this.skuList = result.data;
        //以及关闭loading转圈效果；
        this.loading = false;

      }
    },
    //关闭Dialog列表前的回调函数
    close(done){
      //把loading的效果打开
      this.loading = true;
      //清空存储的数据，避免数据的回流
      this.skuList = [];
      //进行放行
      done();
    }
  },
};
</script>

<style>
</style>