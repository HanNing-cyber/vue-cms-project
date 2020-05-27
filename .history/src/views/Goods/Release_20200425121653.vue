<template>
  <div class="bg">
    <el-card class="box-card">
      <div slot="header" class="header clearfix">
        <span>发布新商品</span>
      </div>

      <el-form :rules="rules" :label-position="labelPosition" ref="form" :model="form" label-width="80px" size="mini">
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
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="form.name" style="width:550px"></el-input>
          <div class="sub-title">商品标题名称长度至少3个字符，最长200个汉字</div>
        </el-form-item>
        <el-form-item label="商品卖点" prop="hotPoint">
          <el-input type="textarea" :rows="2" v-model="form.hotPoint" style="width:550px"></el-input>
          <div class="sub-title">商品卖点不能超过140个汉字</div>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input v-model="form.price" style="width:120px"><template slot="append">元</template></el-input>
          <div class="sub-title">价格必须是0-999999之间的数字，且不能高于市场价</div>
          <div class="sub-title">此价格为商品实际销售价格，如果商品存在规格，改价格显示最低价格</div>
        </el-form-item>
        <el-form-item label="市场价" prop="marketPrice">
          <el-input v-model="form.marketPrice" style="width:120px"><template slot="append">元</template></el-input>
          <div class="sub-title">价格必须是0-999999之间的数字，此价格仅为市场参考价，请根据实际情况认真填写</div>
        </el-form-item>
        <el-form-item label="成本价" prop="cost">
          <el-input v-model="form.cost" style="width:120px"><template slot="append">元</template></el-input>
          <div class="sub-title">价格必须是0-999999之间的数字，此价格为商户对所销售的商品的实际成本价进行备注记录，非必填选项，不会在前台销售页面中显示</div>
        </el-form-item>
        <el-form-item label="折扣" prop="discount">
          <el-input v-model="form.name" style="width:120px"><template slot="append">折</template></el-input>
          <div class="sub-title">根据销售价与市场价比例自动生成不需要编辑</div>
        </el-form-item>
        <el-form-item label="商品库存" prop="inventory">
          <el-input v-model="form.name" style="width:120px"><template slot="append">件</template></el-input>
          <div class="sub-title">价格必须是0-999999之间的数字</div>
          <div class="sub-title">若启动了库存配置，则系统自动计算商品的总数，此处无需卖家填写</div>
        </el-form-item>
        <el-form-item label="商品货号" prop="articleNo">
          <el-input v-model="form.name" style="width:120px"></el-input>
          <div class="sub-title">商品货号是商家管理商品的编号，买家不可见</div>
          <div class="sub-title">最多输入20个字符，只支持输入中文、字母、数字、_、/、-和小数点</div>
        </el-form-item>
        <el-form-item label="主图" prop="img_md">
          <Upload default-avatar="../images/avatar/default.jpg" :src.sync="form.img_md" action="http://localhost:3001/upload/common/" remove-action="http://localhost:3001/upload/delete" :headers="headers" :data="params"></Upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import Upload from "@/components/Upload.vue";
export default {
  data() {
    return {
      form: {

      },
      rules:{}
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

<style lang="less">
.el-form-item__label {
  text-align: left;
}
.sub-title {
  font-size: 12px;
  color: #999999;
}
</style>
