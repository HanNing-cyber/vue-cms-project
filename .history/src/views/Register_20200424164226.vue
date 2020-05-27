<template>
  <div class="bg">
    <el-card class="box-card">
      <div slot="header" class="header clearfix">
        <span>注册</span>
      </div>
      <el-form :rules="rules" :label-position="labelPosition" ref="form" :model="form" label-width="60px">
        <el-form-item label="账户" required prop="username">
          <el-input v-model="form.username" placeholder="用户名长度在3至15个字符！"></el-input>
        </el-form-item>
        <el-form-item label="密码" required prop="password">
          <el-input type="password" v-model="form.password" placeholder="密码至少3位数字！"></el-input>
        </el-form-item>
        <el-form-item label="姓名" required prop="fullname">
          <el-input v-model="form.fullname" placeholder="请填写真实姓名！"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="form.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手机" required prop="tel">
          <el-input v-model="form.tel" placeholder="请填写常用手机号码！"></el-input>
        </el-form-item>
        <el-form-item prop="agree">
          <el-checkbox-group v-model="form.agree">
            <el-checkbox label="同意本站用户协议" name="agree"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button size="medium" type="primary" @click="submitForm('form')">注 册</el-button>
        </el-form-item>
      </el-form>
      <div class="footer">
        <div>
          <router-link to="/login">登录账户</router-link>
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
        fullname: "",
        tel: "",
        sex: "男",
        agree:"",
      },
       rules: {
        username: [
          { required: true, message: "请输入用户名！", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
        password: [
          { type: "string", required: true, message: "请输入密码！", trigger: "blur" },
          { type: "string", pattern: /^\d{3,20}$/, message: "请输入3到20个数字", trigger: "blur" }
        ],
        fullname: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
        tel: [
          { type: "string", required: true, message: "请输入密码！", trigger: "blur" },
          { type: "string", pattern: /^\d{11}$/, message: "请输入正确的手机号码", trigger: "blur" }
        ]

      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          // 校验通过,发送ajax
          let res =await Admin.register({...this.form});
          console.log(res);
          if(res.data.status){
            this.$message.success(res.data.msg)
          } else {
             this.$message.error(res.data.msg)
          }
        }
      });
    }
  }
};
</script>

<style lang="less">
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