<template>
  <div class="bg">
    <el-card class="box-card">
      <div slot="header" class="header clearfix">
        <span>发布新商品</span>
      </div>

      <el-form :rules="rules" :label-position="labelPosition" ref="form" :model="form" label-width="80px" size="medium">
        <el-form-item label="商品分类">
          <el-col :span="4">
            <el-select v-model="form.cate_1st" placeholder="请选择文章分类">
              <el-option v-for="item in options_1st" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-select v-model="form.cate_2nd" placeholder="请选择文章分类">
              <el-option v-for="item in options_2nd" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-select v-model="form.cate_3rd" placeholder="请选择文章分类">
              <el-option v-for="item in options_2nd" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="商品名称" required prop="name">
          <el-input v-model="form.name"></el-input>
          <div class="sub-title">商品标题名称长度至少3个字符，最长200个汉字</div>
        </el-form-item>
        <el-form-item label="密码" required prop="password">
          <el-input type="password" v-model="form.password""></el-input>
          <div class="sub-title">商品标题名称长度至少3个字符，最长200个汉字</div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">登录</el-button>
        </el-form-item>
      </el-form>
      <div class="footer">
        <div>
          <router-link to="/register">注册账户</router-link>
        </div>
        <div>忘记密码？</div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form:{
          
      },
      tableData: [
        {
          name: "机械师F117荣耀版 游戏本七代i7-7700HQ/GTX1050Ti 4G独显游戏本笔记本电脑",
          price: "455",
          inventory: "899",
          img_lg: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
          create_time: "2020-04-10",
        },
        {
          name: "【京东配送】AOC C2791VHE/WS 27英寸 1800R曲率 VA广视角 家用电竞双实力 不闪屏曲面显示器",
          price: "455",
          inventory: "899",
          img_lg: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
          create_time: "2020-04-10",
        },
        {
          name: "惠普(HP) 幽灵Spectre x360 13.3英寸超轻薄翻转笔记本",
          price: "455",
          inventory: "899",
          img_lg: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
          create_time: "2020-04-10",
        },
      ],
    };
  },
  //   created() {
  //     // 获取列表数据
  //     this.loadList();
  //   },
  //   methods: {
  //     async loadList() {
  //       let { status, data, total } = await Article.list({ pageindex: 1, pagesize: 30 });
  //       if (status) {
  //         this.tableData = data;
  //       }
  //     },
  //   },
};
</script>

<style lang="less"></style>
