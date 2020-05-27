<template>
  <div class="bg">
    <el-card class="box-card">
      <div slot="header" class="header clearfix">
        <span>注册</span>
      </div>
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="分类">
        <el-col :span="6">
          <el-select v-model="form.cate_1st" placeholder="请选择文章分类">
            <el-option v-for="item in options_1st" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-select v-model="form.cate_2nd" placeholder="请选择文章分类">
            <el-option v-for="item in options_2nd" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="主图" prop="main_photo">
        <Upload default-avatar="../images/avatar/default.jpg" :src.sync="form.main_photo" action="http://localhost:3001/upload/common/" remove-action="http://localhost:3001/upload/delete" :headers="headers" :data="params"></Upload>
      </el-form-item>
      <el-form-item label="内容" v-model="form.content" prop="content">
        <!-- 富文本编辑器 -->
        <div>
          <div ref="editor" style="text-align:left"></div>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleAdd">发布文章</el-button>
      </el-form-item>
    </el-form>
    </el-card>
  </div>
</template>

<script>
import { Login } from "@/api/index"; 

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

<style lang="less" scoped>
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