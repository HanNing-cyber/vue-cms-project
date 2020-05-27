<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <h2>商品列表</h2>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="img_md" label="商品名称" width="500">
        <template slot-scope="scope">
          <div class="change">
            <img :src="scope.row.img_md" alt="" width="100px" />
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
          <el-button size="mini" type="danger" plain @click="removeHandle(scope.row.id,scope.$index)">
            <i class="el-icon-delete"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout=" prev, pager, next, sizes, total" :total="16" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[4, 8, 16, 32]" :page-size="4"> </el-pagination>
  </el-card>
</template>

<script>
import { Goods } from "@/api/index";
export default {
  data() {
    return {
      tableData: [
      ],
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
    };
  },
  created() {
    // 获取列表数据
    this.loadList();
  },
  methods: {
    async loadList() {
      let { status, goods, total } = await Goods.list({ pageindex: 1, pagesize: 30 });
      if (status) {
        this.tableData = goods;
        console.log({ goods });
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    removeHandle(id,index){
      console.log(id);
      this.$confirm('确定要删除此账户吗？',{type:'warning'})
      .then(async()=>{
        // 发送ajax
        let id = data.id
      let {status} = await Goods.remove({id});
      if(status){
        this.tableData.splice(index,1);
        this.$message.success('删除成功！');
      }
      })
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
.change .des {
  margin-left: 10px;
}
.router-link-active {
  margin-right: 10px;
}
.el-pagination {
  text-align: right;
  margin-top: 20px;
}
</style>
