<template>
  <el-menu
    :default-active="activePath"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    router
    @close="handleClose"
    :collapse="isCollapse"
  >
    <h3 style="text-align: center; color: #c0c0c0">
      {{ isCollapse ? "后台" : "后台管理系统" }}
    </h3>
    <!-- index：唯一标志 -->
    <el-menu-item index="/home">
      <i class="el-icon-location"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-menu-item index="/user">
      <i class="el-icon-menu"></i>
      <span slot="title">用户管理</span>
    </el-menu-item>
    <el-menu-item index="/food">
      <i class="el-icon-document"></i>
      <span slot="title">食品管理</span>
    </el-menu-item>
    <el-menu-item index="/chart">
      <i class="el-icon-setting"></i>
      <span slot="title">图表管理</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "CommonAside",
  data() {
    return {};
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  computed: {
    activePath() {
      return this.$route.path;
    },
    isCollapse() {
      // ！！！ 下面别少了一层.tab。这里获取到的isColllapse就是从vuex中拿到的isCollapse
      return this.$store.state.tab.isCollapse;
    },
  },
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu {
  background-color: #fff;
}
</style>
