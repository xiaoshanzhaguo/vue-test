<template>
  <div class="login">
    <!-- ！！！ 注意form表单绑定的数据(但是这个可以暂时不写，因为还没用到)。记得加@submit.native.prevent。。。 -->
    <!-- 全部绑定后，点击登录的时候监听表单的submit 
      native表示监听el-from里原生表单的事件，prevent表示阻止表单的默认提交，不要跳转页面。执行的方法是login。 -->
    <el-form
      label-width="100px"
      class="login-container"
      @submit.native.prevent="register"
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
    >
      <h3 class="login-title">用户注册</h3>
      <el-form-item label="用户名" prop="username">
        <el-col :span="20">
          <el-input
            v-model="ruleForm.username"
            placeholder="请输入用户名"
            clearable
            @blur="userValidate"
          ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-col :span="20">
          <el-input
            :type="pwd"
            v-model="ruleForm.password"
            placeholder="请输入密码"
            clearable
          >
            <!-- 注意下面是slot="xxx" 和 :class="icon" -->
            <i slot="suffix" :class="icon" @click="changePwd"></i>
          </el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-col :span="20">
          <el-input
            v-model="ruleForm.email"
            placeholder="请输入邮箱地址"
            clearable
          ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item class="login-bottom">
        <!-- 记得加native-type="submit" -->
        <el-button type="primary" native-type="submit">注册</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Register",
  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
        email: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        email: [{ required: true, message: "请输入邮箱地址", trigger: "blur" }],
      },
      pwd: "password",
      icon: "iconfont icon-eye-none",
    };
  },
  methods: {
    changePwd() {
      if (this.pwd === "password") {
        this.pwd = "text";
        this.icon = "el-icon-view";
      } else {
        this.pwd = "password";
        this.icon = "iconfont icon-eye-none";
      }
    },
    // 注册
    async register() {
      const form = this.ruleForm;
      const username = form.username;
      const password = form.password;
      const email = form.email;
      if (username === "" || password === "" || email === "") {
        this.$message({
          type: "error",
          message: "请完善所有信息",
        });
      } else if (username !== "") {
        this.userValidate();
      } else {
        const res = await this.$http.get(`aUser/${username}`);

        // 添加其他字段为空的校验
        if (res.data === "") {
          const res1 = await this.$http.post("users", this.ruleForm);
          // if (res.status);
          if (res1.status == 200) {
            this.$message({
              type: "success",
              message: "注册成功",
            });
            this.$router.push("/login");
          }
        } else {
          this.$message({
            type: "error",
            message: "注册失败",
          });
        }
      }
    },
    // 重置数据
    reset() {
      this.ruleForm = {};
    },
    async userValidate() {
      const username = this.ruleForm.username;
      const res = await this.$http.get(`aUser/${username}`);
      if (res.data !== "") {
        this.$message({
          type: "error",
          message: "用户名已存在",
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  background: url("../../assets/images/login-bg.jpg") no-repeat;
  background-size: 100% 145%;
  // 用flext布局更方便，不会出现边距塌陷的问题。
  display: flex;
  justify-content: center;
  align-items: center;
  .login-container {
    border-radius: 15px;
    background-clip: padding-box; // ！！！给它一个背景裁剪的内边距
    width: 350px; // 一定要给宽度，否则无法居中显示（之前用的是margin，现在用flex还是可以居中的）。
    padding: 35px 35px 15px 35px;
    background-color: #fff;
    border: 1px solid #cacaca;
    box-shadow: 0 0 25px #cac6c6;

    .login-title {
      margin: 0 auto 40px auto;
      text-align: center;
      color: #505458;
    }

    .login-bottom {
      margin: 15px auto 20px auto;
    }
  }
}
</style>
