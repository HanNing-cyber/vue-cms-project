<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>商品列表</span>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="商品名称" width="500">
        <template slot-scope="scope">
          <div class="change">
            <img :src="scope.row.img_lg" alt="" width="100px" height="100px" /> 
            <span class="des">{{ scope.row.name }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="价格" width="150" prefix-icon="el-icon-d-caret"></el-table-column>
      <el-table-column prop="inventory" label="库存" width="150" icon="el-icon-d-caret"></el-table-column>
      <el-table-column prop="create_time" label="发布时间" icon="el-icon-d-caret"></el-table-column>
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
import { Goods } from "@/api/index";
export default {
  data() {
    return {
      tableData: [
        // {
        //   name: "机械师F117荣耀版 游戏本七代i7-7700HQ/GTX1050Ti 4G独显游戏本笔记本电脑",
        //   price: "455",
        //   inventory: "899",
        //   img_lg: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
        //   create_time: "2020-04-10",
        // },
        // {
        //   name: "【京东配送】AOC C2791VHE/WS 27英寸 1800R曲率 VA广视角 家用电竞双实力 不闪屏曲面显示器",
        //   price: "455",
        //   inventory: "899",
        //   img_lg: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
        //   create_time: "2020-04-10",
        // },
        // {
        //   name: "惠普(HP) 幽灵Spectre x360 13.3英寸超轻薄翻转笔记本",
        //   price: "455",
        //   inventory: "899",
        //   img_lg: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
        //   create_time: "2020-04-10",
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
        let { status, data, total } = await Goods.list({ pageindex: 1, pagesize: 30 });
        if (status) {
          this.tableData = data;
        }
      },
    },
};
</script>

<style lang="less">
.change {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.change .des{
  margin-left: 10px;
}
.router-link-active{
    margin-right: 10px;
}
</style>
