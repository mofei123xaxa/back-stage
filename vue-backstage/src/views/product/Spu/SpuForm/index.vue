  <template>
  <div>
    <el-form ref="form" label-width="80px" :model="spu">
      <!-- input框 -->
      <el-form-item label="SPU名称">
        <el-input placeholder="SPU名称" v-model="spu.spuName"></el-input>
      </el-form-item>
      <!-- 下拉菜单 -->
      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" v-model="spu.tmId">
          <el-option
            :label="tm.tmName"
            :value="tm.id"
            v-for="(tm, index) in tradmackList"
            :key="tm.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- textarea选择框 -->
      <el-form-item label="SPU描述">
        <el-input type="textarea" rows="4" v-model="spu.description"></el-input>
      </el-form-item>
      <!-- 照片墙 
            on-preview:是预览图片   on-remove：是删除图片的回调
        -->
      <el-form-item label="SPU图片">
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :file-list="imageList"
          :on-success="handlerSuccessful"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <!-- 销售属性 -->
      <el-form-item label="销售属性">
        <el-select
          :placeholder="`还有${unSelectSaleAttr.length}种未选择`"
          v-model="salesIdAndSaleName"
        >
          <el-option
            :label="unSelect.name"
            :value="`${unSelect.id}:${unSelect.name}`"
            v-for="(unSelect, index) in unSelectSaleAttr"
          ></el-option>
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!salesIdAndSaleName"
          @click="addSaleAttr"
          >添加销售属性</el-button
        >
        <!-- 下面的表单 -->
        <el-table
          style="width: 100%; margin-top: 20px"
          border
          :data="spu.spuSaleAttrList"
        >
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="saleAttrName" label="属性名" width="150">
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称列表" width="width">
            <template slot-scope="{ row, $index }">
              <!--
                
                -->
              <el-tag
                :key="tag.id"
                v-for="(tag, index) in row.spuSaleAttrValueList"
                closable
                :disable-transitions="false"
                @close="row.spuSaleAttrValueList.splice(index, 1)"
              >
                {{ tag.saleAttrValueName }}
              </el-tag>
              <!--  
                  @keyup.enter.native="handleInputConfirm"
                    -->
              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                ref="saveTagInput"
                size="small"
                @blur="handleInputConfirm(row)"
              >
              </el-input>
              <!--  
                  @click="showInput" 
                -->
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="updateState(row)"
                >添加</el-button
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="150">
            <template slot-scope="{ row, $index }">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="spu.spuSaleAttrList.splice($index, 1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="AddorUpdateSpu">保存</el-button>
        <el-button @click="cancelSpu">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

  <script>
import { reqTradmarkList } from "@/api/product/spu";
export default {
  name: "SpuForm",

  data() {
    return {
      //照片墙需要的js
      dialogImageUrl: "",
      dialogVisible: false,
      spu: {
        //三级分类id
        category3Id: 0,
        //描述
        description: "",
        //spu名称
        spuName: "",
        //平台的id
        tmId: "",
        //收集spu图片的信息
        spuImageList: [
          // {
          //   id:0,
          //   imgName:'',
          //   imgUrl:'',
          //   apuId:0
          // },
        ],
        //平台属性与属性值收集
        spuSaleAttrList: [
          //   {
          //     baseSaleAttrId:0,
          //     id:0,
          //     saleAttrName:'',
          //     spuId:0,
          //     spuSaleAttrValueList:[
          //       {
          //         baseSaleAttrId:0,
          //         id:0,
          //         isChecked:'',
          //         saleAttrName:'',
          //         saleAttrValueName:'',
          //         spuId:0
          //       }
          //     ]
          //     }
        ],
      }, //获取spu数据
      tradmackList: [], //获取品牌信息数据
      imageList: [], //获取图片的数据
      baseSaleList: [], //获取平台销售属性
      salesIdAndSaleName: "", //获取销售属性Id、以及属性值
    };
  },
  methods: {
    //照片墙删除的回调函数，需要收集数据
    handleRemove(file, fileList) {
      //上面两个形参是，file是删除的图片的数据
      //fileList是删除以后全部的图片数据
      this.imageList = fileList;
    },
    //照片墙预览的回调函数（不需要收集数据）
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //照片上传成功以后的进行调用
    handlerSuccessful(response, file, fileList) {
      //response：就是服务器上传成功以后的数据
      //file：上传成功的图片
      //fileList：图片上传以后全部的数据
      this.imageList = fileList;
    },
    //初始化spu的数据,传递给父组件的方法,调用函数
    async initSpuData(row) {
      //获取spu信息
      let spuResule = await this.$API.spu.reqSpu(row.id);
      if (spuResule.code == 200) {
        this.spu = spuResule.data;
      }
      //获取品牌的信息
      let tradmackResule = await this.$API.spu.reqTradmarkList();
      if (tradmackResule.code == 200) {
        this.tradmackList = tradmackResule.data;
      }
      //获取spu图片接口
      let imageResule = await this.$API.spu.reqSpuImageList(row.id);
      //进行赋值
      if (imageResule.code == 200) {
        //进行赋值
        this.imageList = imageResule.data;
        //后面就是修改属性，采用处理一遍再进行赋值
        this.imageList.forEach((item) => {
          item.name = item.imgName;
          item.url = item.imgUrl;
        });
      }
      //获取平台的销售属性
      let baseSaleResule = await this.$API.spu.reqBaseSaleAttrList();
      if (baseSaleResule.code == 200) {
        this.baseSaleList = baseSaleResule.data;
      }
    },
    //点击添加销售属性
    addSaleAttr() {
      //分割字符串
      const [baseSaleAttrId, saleAttrName] = this.salesIdAndSaleName.split(":");
      //由于添加的是一个对象，需要进行赋值
      let newSaleAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: [],
      };
      //最后添加给spu
      this.spu.spuSaleAttrList.push(newSaleAttr);
      //还要清空下拉框,我自己是不太知道怎么这样子做
      this.salesIdAndSaleName = "";
    },
    //控制显示input还是button
    updateState(row) {
      //给每一个属性都添加上一个属性值，才能控制，不能直接使用data控制全部
      this.$set(row, "inputVisible", true);
      //收集输入的数据
      this.$set(row, "inputValue", "");
    },
    //input状态发生变化
    handleInputConfirm(row) {
      //解构属性
      const { baseSaleAttrId, inputValue } = row;
      //赋值之前进行监测是否是空串，以及重复
      if (inputValue.trim() == "") {
        this.$message("输入的值不能为空，请重新输入");
        return;
      }
      //进行筛选，返回的是一个布尔值
      let resule = row.spuSaleAttrValueList.every(
        (item) => item.saleAttrValueName != inputValue
      );
      if (!resule) return;
      //命名一个变量，进行赋值
      let newSaleAttrValue = { saleAttrValueName: inputValue, baseSaleAttrId };
      //给数组的最后添加值
      row.spuSaleAttrValueList.push(newSaleAttrValue);
      //设置为显示span
      row.inputVisible = false;
    },
    //更新数据||添加数据
    async AddorUpdateSpu() {
      //对数组图片进行处理，赋值给spu
      this.spu.spuImageList = this.imageList.map((item) => {
        return {
          imgName: item.name,
          imgUrl: (item.response && item.response.data) || item.url,
        };
      });
      //进行发送数据
      let result = await this.$API.spu.reqAddorUpdateSpu(this.spu);
      if (result.code == 200) {
        this.$message({
          type: "success",
          message: "保存成功",
        }),
          //向父组件发送数据，进行显示第一张的数据
          this.$emit("chenaudate", {scene:0,flag:this.spu.id?'修改':'添加'});
      }
    },
    //点击添加属性值的回调函数，在父组件中进行调用
    async getBrandOrSales(category3Id) {
      //清空所有属性值
      Object.assign(this._data, this.$options.data());
      //获取品牌的信息
      let tradmackResule = await this.$API.spu.reqTradmarkList();
      if (tradmackResule.code == 200) {
        this.tradmackList = tradmackResule.data;
      }
      //获取平台的销售属性
      let baseSaleResule = await this.$API.spu.reqBaseSaleAttrList();
      if (baseSaleResule.code == 200) {
        this.baseSaleList = baseSaleResule.data;
      }
      //赋值三级属性Id
      this.spu.category3Id = category3Id;
    },
    //点击取消
    cancelSpu(){
      //向父组件发送数据，通知回到第零页。
      this.$emit('chenaudate', {scene:0,flag:''})
    }
  },
  computed: {
    //计算商品属性，一共三个
    unSelectSaleAttr() {
      return this.baseSaleList.filter((item) => {
        return this.spu.spuSaleAttrList.every((item1) => {
          return item1.saleAttrName != item.name;
        });
      });
    },
  },
};
</script>

  <style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>