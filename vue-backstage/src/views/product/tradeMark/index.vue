<template>
  <div>
    <!-- 饿了么ui的点击按钮 -->
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin: 20px; margin-left: 0"
      @click="addTradeMark"
      >添加</el-button
    >
    <!-- 
        表单
        data:就是数据，现在还不需要
        label:名称
        width：每个表单的宽度
        align：文字是否居中
        border：表单是否居中
        prop:表示对应列内容的字段名
        注意:elementUI展示的当中的组件，展示的数据是以一列一列进行展示数据
       -->
    <el-table style="width: 100%" border :data="list">
      <el-table-column type="index" label="序号" width="80px" align="center">
      </el-table-column>
      <el-table-column prop="tmName" label="品牌名称" width="width">
      </el-table-column>
      <el-table-column prop="logoUrl" label="品牌LOGO" width="width">
        <template slot-scope="{ row, $index }">
          <img :src="row.logoUrl" alt="" style="width: 90px; height: 90px" />
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{ row, $index }">
          <el-button
            type="warning"
            icon="el-icon-edit"
            size="mini"
            @click="alterTradeMark(row)"
            >修改</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteTrademark(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 
      分页器
        当前是第几页、数据总条数、每一页展示的条数、连续页码数
        @size-change="handleSizeChange" 代表现在是一页有几个数据
        @current-change="handleCurrentChange" //分页器现在所在位置

        current-page：当前是第几页
        total：数据总条数
        page-size：每一页展示多少条数据
        page-sizes：每一个用户可以自己选择展示几条数据
        layout：实现分页器的布局
     -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      style="margin-top: 20px"
      :current-page="page"
      :page-sizes="[3, 5, 10]"
      :total="total"
      :page-size="3"
      layout=" prev, pager, next, jumper,->,sizes,total"
      align="center"
    >
    </el-pagination>

    <!-- 
          对话框
          :visible.sync：是控制表单显示与隐藏
       -->
    <el-dialog
      :title="tmForm.id ? '修改表单' : '添加表单'"
      :visible.sync="dialogFormVisible"
    >
      <!-- from表单，需要用:model收集表单的数据 
          Form 组件提供了表单验证的功能，只需要通过 rules 属性传入约定的验证规则，并将 Form-Item 的 prop 属性设置为需校验的字段名即可。
      -->
      <el-form style="width: 80%" :model="tmForm" :rules="rules" ref="ruleForm">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input autocomplete="off" v-model="tmForm.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <!--  上传图片位置
            action:设置图片上传的地址
            :on-success：在图片上传成功执行一次
            :before-upload：在图片上传之前执行一次
          -->
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addorUpdateTradeMark"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "tradeMark",
  data() {
    return {
      //现在商品处于第几页
      page: 1,
      //每一页展示几条数据
      limit: 3,
      //商品一共有多少条数据
      total: 0,
      //每一个展示的数据
      list: [],
      //控制对话框显示与隐藏
      dialogFormVisible: false,
      //收集的表单元素
      tmForm: {
        //品牌的名称
        tmName: "",
        //收集的图片
        logoUrl: "",
      },
      //表单品牌的验证规则
      rules: {
        tmName: [
          //required：必须要校验的字段（和前面的*有关）  trigger:用户行为设置（blur:失焦，change:文本发生变化时）
          { required: true, message: "请输入商品名称", trigger: "blur" },
          //就是2到10个字符   trigger: "change"就是目标发生变化就会触发，
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "change",
          },
        ],
        //品牌log的校验规则
        logoUrl: [{ required: true, message: "请选择商品图片" }],
      },
    };
  },
  mounted() {
    //获取商品数据函数
    this.getpageList();
  },
  methods: {
    //获取商品数据的函数
    async getpageList() {
      //解构数据
      const { page, limit } = this;
      //向服务器发送请求，获取数据
      let resule = await this.$API.tradeMark.reqTradeMark(page, limit);
      if (resule.code == 200) {
        //成功以后进行赋值
        this.total = resule.data.total;
        this.list = resule.data.records;
      }
    },
    //改变、获取分页器现在的页码
    handleCurrentChange(page) {
      this.page = page;
      //重新编译模板
      this.getpageList();
    },
    //改变分页器一页展示几条数据
    handleSizeChange(limit) {
      this.limit = limit;
      //重新编译吗，模板
      this.getpageList();
    },
    //添加商品
    addTradeMark() {
      //显示对话框
      this.dialogFormVisible = true;
      //点击添加的同时去掉tmForm携带的数据
      this.tmForm = {
        tmName: "",
        logoUrl: "",
      };
    },
    //修改商品属性
    alterTradeMark(row) {
      //row就是获取当前商品的信息
      //显示对话框
      this.dialogFormVisible = true;
      //获取当前商品的id,收集数据，修改数据
      //把已有的数据赋值给tmForm进行展示
      //也就是说tmForm存储的信息即为服务器返回的品牌信息
      this.tmForm = { ...row };
    },
    //图片上传成功执行的回调
    handleAvatarSuccess(res, file) {
      this.tmForm.logoUrl = res.data;
    },
    //图片上传之前执行一次的回调
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //增加商品||修改商品数据的回调
    addorUpdateTradeMark() {
      //这个是elementUI的最后表单验证，下面的形参就会返回是成功还是失败
      this.$refs.ruleForm.validate(async (success) => {
        //如果全部字段符合规则就再书写业务逻辑
        if (success) {
          //点击关闭对话框
          this.dialogFormVisible = false;
          //进行传递参数，增加商品||修改商品
          let resule = await this.$API.tradeMark.reqAddOrUpdateTradeMark(
            this.tmForm
          );
          if (resule.code == 200) {
            //弹出信息：修改成功||添加成功
            this.$message({
              //修改弹出框的颜色
              type: "success",
              message: this.tmForm.id ? "修改品牌成功" : "品牌上传成功",
            });
            //重新加载页面
            this.getpageList();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //删除表单的回调
    deleteTrademark(row) {
      //弹框
      this.$confirm(`是否删除${row.tmName}`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        //点击确定进行删除
        .then(async () => {
          console.log(row);
          //向服务器发送请求，并且携带ID
          let resule = await this.$API.tradeMark.reqDeleteTradeMark(row.id);
          console.log(resule);
          //如果删除成功就进行下面的操作
          if (resule.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            //删除以后重新调用模板
            this.getpageList();
          }
        })
        .catch(() => {
          this.$message({         
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>