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
        <el-col :span="4">
          <el-select v-model="form.role_name" placeholder="请选择文章分类">
            <el-option v-for="item in options_1st" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="头像">
        <Upload default-avatar="../images/avatar/default.jpg" :src.sync="form.avatar" action="http://localhost:3003/api/upload/avatar" remove-action="http://localhost:3003/api/upload" :headers="headers" :data="params"></Upload>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleEdit" size="medium" type="primary">修改</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { Admin } from "@/api/index";
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
      options_1st: [],
    };
  },
  async created() {
    // 请求一级分类
    let options = await this.loadOptions(0);
    this.options_1st = options;
    this.form.role_name = options[0].id;

    this.loadInfo();
  },
    
  methods: {
      // 请求下一级分类
    async loadOptions(id) {
      let { status, data } = await Admin.subcate({ id });
      if (status) {
        // 请求成功
        // promise data
        return data;
      }
    },
    async loadInfo() {
      let { status, data } = await Admin.info({ id: this.id });
      if (status) {
        this.form = data;
      }
    },
    async handleEdit() {
      // 表单验证...
      let { status, msg } = await Admin.edit({ id: this.id, ...this.form });
      if (status) {
        this.$message.success(msg);
      }
    },
  },
};
</script>

<style></style>
