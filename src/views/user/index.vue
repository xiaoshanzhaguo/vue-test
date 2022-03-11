<template>
  <div class="user">
    <el-button type="primary" @click="dialogVisible = true">添加用户</el-button>
    <el-dialog title="添加用户" :visible.sync="dialogVisible" width="40%">
      <el-form label-width="100px" @submit.native.prevent="save">
        <el-form-item label="用户名">
          <el-col :span="20">
            <el-input
              v-model="model.username"
              placeholder="请输入账号"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="密码">
          <el-col :span="20">
            <el-input
              type="password"
              v-model="model.password"
              placeholder="请输入密码"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <!-- !!!! -->
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" native-type="submit">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-table :data="items"  stripe>
      <el-table-column prop="_id" label="ID" width="180"></el-table-column>
      <el-table-column
        prop="username"
        label="用户名"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="password"
        label="密码"
        width="180"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "User",
  data() {
    return {
      model: {},
      items: [],
      dialogVisible: false,
    };
  },
  methods: {
    async save() {
      console.log("save");
      const res = await this.$http.post("users", this.model); // !!!!
      this.$message({
        type: "success",
        message: "保存成功",
      });
      this.dialogVisible = false;
      console.log(res);
    },
    async fetch() {
      const res = await this.$http.get("users");
      this.items = res.data;
    },
  },
  created() {
    this.fetch();
  },
};
</script>

<style lang="less" scoped>
</style>
