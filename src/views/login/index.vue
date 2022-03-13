<template>
  <div class="login">
    <el-form label-width="100px" class="login-container">
      <h3 class="login-title">系统登陆</h3>
      <el-form-item label="用户名">
        <el-col :span="20">
          <el-input></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="密码">
        <el-col :span="20">
          <el-input></el-input>
        </el-col>
      </el-form-item>
      <el-form-item class="login-bottom">
        <el-button type="primary">登录</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  data() {
    return {};
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
