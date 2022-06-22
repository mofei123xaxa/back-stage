<template>
  <el-card>
    <div slot="header">
      <div slot="header" class="serch-clearfix">
        <span>卡片名称</span>
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="el-icon-more el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item>双皮奶</el-dropdown-item>
            <el-dropdown-item>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <!-- 中间的图表 -->
      <div>
        <el-row :gutter="10" class="serch-center">
          <el-col :span="12">
            <lineCharts></lineCharts>
          </el-col>
          <el-col :span="12">
            <!-- 拆分成一个子组件 -->
            <lineCharts></lineCharts>
          </el-col>
        </el-row>
      </div>
    </div>
    <div>
      <!-- 下面的表单 -->
      <el-table
        :data="tableData"
        style="width: 100%"
        :default-sort="{ prop: 'date', order: 'descending' }"
        border
      >
        <el-table-column type="index" label="排名" width="80" align="center">
        </el-table-column>
        <el-table-column prop="name" label="搜索关键字" width="180">
        </el-table-column>
        <el-table-column prop="address" label="用户数" sortable width="width">
        </el-table-column>
        <el-table-column prop="address" label="周涨幅" sortable width="width">
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        layout="prev, pager, next"
        :total="1000"
        class="sarch-pag"
      ></el-pagination>
    </div>
  </el-card>
</template>

<script>
import lineCharts from "./lineCharts";
export default {
  name: "Sarch",
  data() {
    return {
      tableData: [{}],
    };
  },
  components: {
    lineCharts,
  },
};
</script>

<style scoped >
.serch-clearfix {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}
.serch-center {
  margin-top: 20px;
}
.sarch-pag {
  float: right;
}
</style>