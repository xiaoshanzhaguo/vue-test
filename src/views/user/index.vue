<template>
  <div class="user">
    <el-button type="primary" @click="clickAdd">添加用户</el-button>
    <el-dialog
      :title="operateType === 'add' ? '添加用户' : '编辑用户'"
      :visible.sync="dialogVisible"
      width="40%"
    >
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
    <el-table :data="items" stripe>
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
      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="clickEdit(scope.row)"
            >编辑</el-button
          >
          <el-button type="danger" size="small" @click="remove(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
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
      operateType: "add",
      rowId: "",
    };
  },
  methods: {
    // 保存用户数据
    async save() {
      // 点击保存时，判断是添加还是编辑的保存
      let res;
      console.log("save");
      if (this.operateType === "edit") {
        res = await this.$http.put(`users/${this.rowId}`, this.model);
        this.fetchList();
      } else {
        res = await this.$http.post("users", this.model); // !!!!
        this.fetchList();
      }
      //   this.$router.push("/users/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
      this.dialogVisible = false;
      console.log(res);
    },
    // 初始列表数据
    async fetchList() {
      const res = await this.$http.get("users");
      this.items = res.data;
    },
    // 编辑用户
    async clickEdit(row) {
      const res = await this.$http.get(`users/${row._id}`);
      this.model = res.data;
      this.dialogVisible = true;
      this.operateType = "edit";
      this.rowId = row._id;
    },
    // 添加用户
    clickAdd() {
      this.model = {};
      this.dialogVisible = true;
      this.operateType = "add";
    },
    // 删除用户  !!!
    async remove(row) {
      console.log(row);
      this.$confirm(`是否要继续删除 "${row.username}"？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await this.$http.delete(`users/${row._id}`);
          this.$message({
            type: "success",
            message: "删除成功！",
          });
          console.log(res);
          this.fetchList();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  created() {
    this.fetchList();
  },
};
</script>

<style lang="less" scoped>
</style>
