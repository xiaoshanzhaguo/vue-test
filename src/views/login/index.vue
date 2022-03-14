<template>
  <div class="login">
    <!-- ！！！ 注意form表单绑定的数据(但是这个可以暂时不写，因为还没用到)。记得加@submit.native.prevent。。。 -->
    <!-- 全部绑定后，点击登录的时候监听表单的submit 
      native表示监听el-from里原生表单的事件，prevent表示阻止表单的默认提交，不要跳转页面。执行的方法是login。 -->
    <el-form
      label-width="100px"
      class="login-container"
      @submit.native.prevent="login"
    >
      <h3 class="login-title">系统登陆</h3>
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
            :type="pwd"
            v-model="model.password"
            placeholder="请输入密码"
            clearable
          >
            <!-- 注意下面是slot="xxx" 和 :class="icon" -->
            <i slot="suffix" :class="icon" @click="changePwd"></i>
          </el-input>
        </el-col>
      </el-form-item>
      <el-form-item class="login-bottom">
        <!-- 记得加native-type="submit" -->
        <el-button type="primary" native-type="submit">登录</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  data() {
    return {
      model: {},
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
    // login方法  当我们点击登录后，需要请求一个接口
    async login() {
      // 【登录接口】 1. 请求这个数据完成，得到的应该是个token。后续我们会把token保存起来

      // 3. post请求还要把当前的model传上去，因为里面包含了用户名和密码，因此把this.model当成第二个参数传给服务器。
      // 然后到接口请求下面，就能看到username和password两个数据传上来了。并且这里传的密码是明文。
      const res = await this.$http.post("login", this.model);
      // 2. 暂时还是输出一下res.data。把服务端返回的数据log看一下。
      // console.log(res.data);

      /* 4. 下面是最简单的方法。这就表示把当前返回数据的token写入到localStorage里，是浏览器的一个存储，
      在浏览器关闭之后，还能继续访问得到，下次再打开它也有的，只要保证是同一个网址域名就行。 */
      localStorage.token = res.data.token;

      // 如果希望浏览器关闭就没有的话，用sessionStorage。它表示的是当前浏览器关掉之后就没了
      // sessionStorage.token = res.data.token

      // 5. 设置完之后，跳转到首页
      this.$router.push("/");

      // 6. 最好用一个this的message去弹出一个信息，登录成功
      this.$message({
        type: "success",
        message: "登录成功",
      });
    },
    // 重置用户名和密码
    reset() {
      this.model = {};
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
