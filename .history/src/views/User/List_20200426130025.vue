<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>文章列表</span>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="avatar" label="头像">
        <template slot-scope="scope">
          <div class="demo-basic--circle" style="width:50px ;height:50px">
            <img :src="scope.row.avatar" alt="" width="50px" height="50px" />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="账号"></el-table-column>
      <el-table-column prop="fullname" label="姓名"></el-table-column>
      <el-table-column prop="sex" label="性别"></el-table-column>
      <el-table-column prop="tel" label="手机"></el-table-column>
      <el-table-column
        prop="fullname"
        label="标签"
        width="100"
        :filters="[
          { text: '超级管理员', value: '超级管理员' },
          { text: '管理员', value: '管理员' },
        ]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag size="mini" :type="scope.row.fullname === '超级管理员' ? 'danger' : ''" disable-transitions>{{ scope.row.fullname }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="login_time" label="上次登录"></el-table-column>
      <el-table-column prop="login_count" label="登录次数"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <router-link :to="{ name: 'ArticleEdit', params: { id: scope.row.id } }">
            <el-button size="mini" type="primary" plain>
              <i class="el-icon-edit"></i>
            </el-button>
          </router-link>
          <el-button size="mini" type="danger" plain>
            <i class="el-icon-delete"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import { User } from "@/api/index";
export default {
  data() {
    return {
      tableData: [
      ],
    };
  },
  created() {
    // 获取列表数据
    this.loadList();
  },
  methods: {
    filterTag(value, row) {
      return row.person === value;
    },
    async loadList() {
      let { status, data } = await User.list();
      if (status) {
        this.tableData = data;
      }
    },
    // filterTag(value, row) {
    //   return row.person === value;
    // },
    removeHandle(id, index) {
      console.log(id);
      this.$confirm("确定要删除此账户吗？", { type: "warning" }).then(async () => {
        // 发送ajax
        let { status } = await Admin.remove(id);
        if (status) {
          this.tableData.splice(index, 1);
          this.$message.success("删除成功！");
        }
      });
    },
  },
};
</script>

<style lang="less"></style>
