<template>
  <header>
    <div class="l-content">
      <!-- ！！！ icon -->
      <el-button
        plain
        icon="el-icon-menu"
        size="mini"
        @click="handleMenu"
      ></el-button>
    </div>
    <div class="r-content">
      <el-dropdown>
        <span>
          <!-- ！！！ 别忘记加class，用于以后写样式的。 -->
          <img class="user" :src="imgSrc" />
        </span>
        <!-- ！！！el-dropdown-menu和el-dropdown-item要分得清 -->
        <el-dropdown-menu>
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
export default {
  name: "CommonHeader",
  data() {
    return {
      imgSrc: require("../assets/images/cat.jpg"),
    };
  },
  methods: {
    handleMenu() {
      // 只能通过mutation的方式去改变store中的state。
      this.$store.commit("CollapseMenu");
    },
  },
};
</script>

<style lang="less" scoped>
header {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;

  .r-content {
    .user {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
}
</style>
