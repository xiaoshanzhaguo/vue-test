<template>
  <div class="user">
    <el-row class="top">
      <el-button type="primary" @click="clickAdd">添加用户</el-button>
      <el-col :span="7" class="topRight">
        <el-input
          v-model="searchName"
          placeholder="请输入要查询的用户名"
        ></el-input>
        <el-button type="primary" class="searchButton" @click="search"
          >搜索</el-button
        >
      </el-col>
    </el-row>
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
              placeholder="请输入用户名"
              clearable
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="密码">
          <el-col :span="20">
            <el-input
              v-model="model.password"
              placeholder="请输入密码"
              :type="pwd"
              clearable
              @blur="Onblur"
            >
              <!-- !!!! input中加图标必须要有slot="suffix"属性，不然无法显示图标 -->
              <i slot="suffix" :class="icon" @click="changePwd"></i>
            </el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <!-- !!!! -->
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" native-type="submit">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-table :data="items" stripe style="margin-top: 20px; height: 90%">
      <!-- <el-table-column prop="_id" label="ID" width="180"></el-table-column> -->
      <el-table-column
        prop="username"
        label="用户名"
        width="180"
        align="center"
      ></el-table-column>
      <el-table-column prop="password" label="密码" width="180" align="center">
        <template slot-scope="scope">
          {{ scope.row.password_d }}
          <el-button
            class="view"
            type="text"
            @click.native.prevent="view(scope.$index, scope.row)"
            ><i :class="scope.row.icon"></i
          ></el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button type="plain" size="small" @click="clickEdit(scope.row)"
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
      model: {}, // form数据
      items: [], // table数据
      dialogVisible: false,
      operateType: "add",
      rowId: "", // 当前行的id
      searchName: "", // 搜索框数据
      index_x: [], // 获取每一行的数据
      pwd: "password", // input输入框type类型
      icon: "iconfont icon-eye-none", //  密码输入框右侧图标
    };
  },
  watch: {
    searchName: {
      handler(val) {
        this.searchName = val;
        this.search();
      },
    },
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

      this.pwd = "password";
      this.icon = "iconfont icon-eye-none";
    },
    // 添加用户
    clickAdd() {
      this.model = {};
      this.dialogVisible = true;
      this.operateType = "add";

      this.pwd = "password";
      this.icon = "iconfont icon-eye-none";
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
    // 查找用户
    async search() {
      if (this.searchName === "") {
        this.fetchList();
        return;
      }
      const res = await this.$http.get(`user/${this.searchName}`);
      this.items = res.data;
      console.log(res);
    },
    // 点击查看密码
    view(index, row) {
      console.log(row);
      this.index_x = index;
      var viewData = this.index_x;
      if (this.items[viewData].password_d === "******") {
        this.items[viewData].password_d = this.items[viewData].password;
        this.items[viewData].icon = "el-icon-view";
      } else {
        this.items[viewData].password_d = "******";
        this.items[viewData].icon = "iconfont icon-eye-none";
      }
    },
    // 改变密码显示和隐藏的状态
    changePwd() {
      // 点击图标是显示或隐藏
      if (this.pwd === "password") {
        this.pwd = "text";
        this.icon = "el-icon-view";
        // 如果显示密码，则在500ms后让图标消失
        setTimeout(() => {
          this.icon = "";
        }, 500);
      } else {
        this.pwd = "password";
        this.icon = "iconfont icon-eye-none";
      }
    },
    // 密码失焦事件
    Onblur() {
      this.pwd = "password";
      this.icon = "iconfont icon-eye-none";
    },
  },
  created() {
    this.fetchList();
  },
};
</script>

<style lang="less" scoped>
.top {
  display: flex;
  justify-content: space-between; // ！！！往两边靠

  .topRight {
    display: flex;
    justify-content: space-between;
    margin-left: auto;

    .searchButton {
      margin-left: 15px;
    }
  }
}

.el-table {
  height: calc(100% - 62px);
  background-color: #fff;
  .view {
    margin-left: 10px;
  }
}
</style>
