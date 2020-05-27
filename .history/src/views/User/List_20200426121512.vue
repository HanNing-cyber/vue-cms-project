<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>文章列表</span>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column  type="index" label="#"></el-table-column>
      <el-table-column prop="avatar" label="头像">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" alt="" width="50px" height="50px">
        </template>
      </el-table-column>
      <el-table-column prop="username" label="账号"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="sex" label="性别"></el-table-column>
      <el-table-column prop="tel" label="手机"></el-table-column>
       <el-table-column
      prop="person"
      label="标签"
      width="100"
      :filters="[{ text: '超级管理员', value: '超级管理员' }, { text: '管理员', value: '管理员' }]"
      :filter-method="filterTag"
      filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.person === '超级管理员' ? 'danger' : ''"
          disable-transitions>{{scope.row.person}}</el-tag>
      </template>
    </el-table-column>
      <el-table-column prop="date" label="上次登录"></el-table-column>
      <el-table-column prop="times" label="登录次数"></el-table-column>
      <el-table-column prop="address" label="操作">
          <template >
        <el-button size="mini">编辑</el-button>
        <el-button size="mini" type="danger">删除</el-button>
      </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          avatar:"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          username:"admin",
          name: "王小虎",
          sex:"男",
          tel:"12345678910",
          person:"超级管理员",
          date: "2016-05-02",
          times:"125"
        },
        {
          avatar:"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          username:"admin",
          name: "王小虎",
          sex:"男",
          tel:"12345678910",
          person:"管理员",
          date: "2016-05-02",
          times:"125"
        },
        {
          avatar:"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          username:"admin",
          name: "王小虎",
          sex:"男",
          tel:"12345678910",
          person:"",
          date: "2016-05-02",
          times:"125"
        },
      ]
    };
  },
  methods: {
    filterTag(value, row) {
        return row.person === value;
      },
  },
};
</script>

<style lang="less">
</style>
