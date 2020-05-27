<template>
  <div class="bg">
    <el-card class="box-card">
      <div slot="header" class="header clearfix">
        <span>欢迎登陆</span>
      </div>
      <el-form :rules="rules" :label-position="labelPosition" ref="form" :model="form" label-width="60px">
        <el-form-item label="账户" required prop="username">
          <el-input v-model="form.username" icon="el-icon-user" placeholder="请输入用户名！"></el-input>
        </el-form-item>
        <el-form-item label="密码" required prop="password">
          <el-input type="password" v-model="form.password" icon="el-icon-key" placeholder="请输入密码！"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">登录</el-button>
        </el-form-item>
      </el-form>
      <div class="footer">
        <div>
          <router-link to="/register">注册账户</router-link>
        </div>
        <div>忘记密码？</div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { Admin } from "@/api/index";

export default {
  data() {
    return {
      labelPosition: "right",
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名！", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" },
        ],
        password: [
          { type: "string", required: true, message: "请输入密码！", trigger: "blur" },
          { type: "string", pattern: /^\d{3,20}$/, message: "请输入3到20个数字", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    console.log(this.$route.query);
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // 校验通过,发送ajax
          let { status, msg, data } = await Admin.login({ ...this.form });
          console.log(data);
          if (status) {
            // 登陆成功
            this.$message.success(msg);
            // 存取token
            sessionStorage.token = data.token;
            sessionStorage.uid = data.id;
            sessionStorage.role = data.role;
            // 跳转页面
            let { redirect } = this.$route.query;
            if (redirect) {
              this.$router.replace(redirect);
            } else {
              this.$router.push("/article/list");
            }

            // this.$router.push({ name: "ArticleList" });
          } else {
            // 登陆失败
            this.$message.error(msg);
          }
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
// scoped css只能在本页面的作用域生效
.bg {
  background: url(../assets/img/login-bg.jpg);
  height: 100vh;
  width: 100vw;
  .header {
    font-size: 13px;
  }
  .box-card {
    width: 350px;
    position: fixed;
    top: 50%;
    transform: translate(0, -50%);
    right: 5%;

    .footer {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
