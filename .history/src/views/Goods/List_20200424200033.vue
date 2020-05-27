<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>商品列表</span>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="cate_1st" label="商品名称" width="150"></el-table-column>
      <el-table-column prop="cate_2nd" label="二级分类" width="150"></el-table-column>
      <el-table-column prop="main_photo" label="主图" width="100">
        <template slot-scope="scope">
          <img :src="scope.row.main_photo" alt="" width="50px" height="50px" />
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="create_time" label="发布日期"></el-table-column>
      <el-table-column prop="update_time" label="更新日期"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <router-link :to="{ name: 'ArticleEdit', params: { id: scope.row.id } }">
            <el-button size="mini" type="primary" plain>
              <i class="el-icon-edit"></i>
              编辑
            </el-button>
          </router-link>
          <el-button size="mini" type="danger" plain>
            <i class="el-icon-delete"></i>
            删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import { Article } from "@/api/index";
export default {
  data() {
    return {
      tableData: [
        // {
        //   fst_cate: "娱乐",
        //   sec_cate: "IT新闻",
        //   main_photo: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
        //   title: "东海海底啊覅白发顺丰很快受到哦",
        //   create_date: "2020-04-10",
        //   update_date: "2020-04-10"
        // },
        // {
        //   fst_cate: "娱乐",
        //   sec_cate: "IT新闻",
        //   main_photo: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
        //   title: "东海海底啊覅白发顺丰很快受到哦",
        //   create_date: "2020-04-10",
        //   update_date: "2020-04-10"
        // }
      ],
    };
  },
  created() {
    // 获取列表数据
    this.loadList();
  },
  methods: {
    async loadList() {
      let { status, data, total } = await Article.list({ pageindex: 1, pagesize: 30 });
      if (status) {
        this.tableData = data;
      }
    },
  },
};
</script>

<style lang="less">
</style>