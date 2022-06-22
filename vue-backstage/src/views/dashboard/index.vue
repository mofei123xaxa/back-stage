<template>
  <div class="dashboard-container">
    <!-- 头部区域 -->
    <Card></Card>
    <!-- 中间部位 -->
    <Sale></Sale>
    <!-- 最下面区域 -->
    <Observe></Observe>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Card from './Card';
import Sale from './Sale';
import Observe from './Observe'
export default {
  name: 'Dashboard',
  components:{
    Card,
    Sale,
    Observe 
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },

}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
