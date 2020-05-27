<template>
  <el-card class="box-card">
    <div slot="header">
      <h2>编辑管理员</h2>
    </div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="form.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.fullname"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.sex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="手机">
        <el-input v-model="form.tel"></el-input>
      </el-form-item>
      <el-form-item label="权限">
        <el-select v-model="form.role_name" placeholder="请选择">
          <el-option v-for="item in roleOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="头像">
        <Upload default-avatar="../images/avatar/default.jpg" :src.sync="form.avatar" action="http://localhost:3003/api/upload/avatar" remove-action="http://localhost:3003/api/upload" :headers="headers" :data="params"></Upload>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleSave" size="medium" type="primary">修改</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { Admin } from "@/api/index";
import { Auth } from "@/api/index"
import Upload from "@/components/Upload.vue";

export default {
  props: ["id"],
  components: {
    Upload,
  },
  data() {
    return {
      headers: {
        Authorization: `Bearer ${sessionStorage.token}`,
      },
      params: {
        type: "avatar",
      },
      form: {
        username: "",
        fullname: "",
        sex: "男",
        tel: "",
        role: "",
        avatar: "",
      },
      rules: {},
      // 一级分类数组
      roleOptions: [],
    };
  },
  created() {
     // 双向数据绑定，vuex中的state通过计算属性得到，默认getter，而双向数据绑定既有getter也有setter，两者冲突
    this.form = { ...this.$store.state.profile };
    this.loadRole();
  },
    
  methods: {
     // 修改资料
    // 加载角色列表
    async loadRole() {
      let { status, data } = await Auth.list();
      if (status) {
        this.roleOptions = data;
      }
    },
    // 修改资料，同时修改state
    handleSave() {
      // 分发action，处理响应之后，弹窗
      this.$store.dispatch("updateProfile", { ...this.form }).then((msg) => {
        this.$message.success(msg);
      });
    },
  },
};
</script>

<style></style>
