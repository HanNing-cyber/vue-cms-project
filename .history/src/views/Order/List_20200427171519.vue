<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>文章列表</span>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column>
        <el-table :data="table_Data" style="width: 100%">
          <el-table-column prop="img_md" label="商品名称" width="500">
            <template slot-scope="scope">
              <div class="change">
                <img :src="scope.row.img_md" alt="" width="50px" />
                <span class="des">{{ scope.row.name }}</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-table-column>
      <el-table-column prop="username" label="账号"></el-table-column>
      <el-table-column prop="fullname" label="姓名"></el-table-column>

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
import { Goods } from "@/api/index";
export default {
  data() {
    return {
      tableData: [],
      table_Data: [],
    };
  },
  created() {
    // 获取列表数据
    this.loadList();
    this.loadList2();
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
    async loadList2() {
      let { status, goods, total } = await Goods.list({ pageindex: 1, pagesize: 2 });
      if (status) {
        this.table_Data = goods;
        console.log(this.tableData2);
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

<style lang="less">
.change {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.change .des {
  margin-left: 10px;
}
</style>
