<template>
  <el-container style="height: 100%">
    <el-aside width="auto">
      <common-aside />
    </el-aside>
    <el-container>
      <el-header>
        <!-- ！！！下面这个组件一定要包含在el-header里面。 -->
        <common-header />
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonAside from "../components/CommonAside.vue";
import CommonHeader from "../components/CommonHeader.vue";
export default {
  //eslint-disable-next-line vue/multi-word-component-names
  name: "Main",
  components: {
    CommonAside,
    CommonHeader,
  },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.el-header {
  background-color: #fff;
}

.el-aside {
  background-color: #fff;
}

.el-main {
  background-color: #f5f6fa;
}
</style>
