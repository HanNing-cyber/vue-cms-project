<template>
  <div class="bg">
    <el-card class="box-card">
      <div slot="header" class="header clearfix">
        <h2>发布新商品</h2>
      </div>

      <el-form :rules="rules" ref="form" :model="form" label-width="130px" size="mini">
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
              <el-option v-for="item in options_3rd" :key="item.id" :label="item.name" :value="item.id"></el-option>
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
          <el-input v-model="form.discount" style="width:120px"><template slot="append">折</template></el-input>
<div class="sub-title">根据销售价与市场价比例自动生成不需要编辑</div>          
        </el-form-item>
        <el-form-item label="商品库存" prop="inventory">
          <el-input v-model="form.inventory" style="width:120px"><template slot="append">件</template></el-input>
          <div class="sub-title">价格必须是0-999999之间的数字</div>
          <div class="sub-title">若启动了库存配置，则系统自动计算商品的总数，此处无需卖家填写</div>
        </el-form-item>
        <el-form-item label="商品货号" prop="articleNo">
          <el-input v-model="form.articleNo" style="width:120px"></el-input>
          <div class="sub-title">商品货号是商家管理商品的编号，买家不可见</div>
          <div class="sub-title">最多输入20个字符，只支持输入中文、字母、数字、_、/、-和小数点</div>
        </el-form-item>
        <el-form-item label="商品主图" prop="img_md">
          <Upload default-avatar="../images/avatar/default.jpg" :src.sync="form.img_md" action="http://localhost:3001/upload/common/" remove-action="http://localhost:3001/upload/delete" :headers="headers" :data="params"></Upload>
          <div class="sub-title">上传商品默认主图，如多规格时将默认图片或分规格上传规格主图，支持jpg、if、png格式上传或从图片空间选中，建议使用尺寸 800*800像素以上，大小不超过1M的正方形图片，上传后的图片将自动保存在图片空间的默认分类中</div>
        </el-form-item>
        <el-form-item label="商品轮播图" prop="img_md">
          <Upload default-avatar="../images/avatar/default.jpg" :src.sync="form.img_md" action="http://localhost:3001/upload/common/" remove-action="http://localhost:3001/upload/delete" :headers="headers" :data="params"></Upload>
          <div class="sub-title">上传商品默认主图，如多规格时将默认图片或分规格上传规格主图，支持jpg、if、png格式上传或从图片空间选中，建议使用尺寸 800*800像素以上，大小不超过1M的正方形图片，上传后的图片将自动保存在图片空间的默认分类中</div>
        </el-form-item>
        <div class="detail">商品详情描述</div>
        <el-form-item label="商品品牌" prop="brand">
          <el-input v-model="form.brand" style="width:550px"></el-input>
        </el-form-item>
        <el-form-item label="商品描述" v-model="form.detail" prop="detail">
          <!-- 富文本编辑器 -->
          <div>
            <div ref="editor" style="text-align:left"></div>
          </div>
        </el-form-item>
        <div class="detail">商品物流信息</div>
        <el-form-item label="所在地">
          <el-col :span="4">
            <el-select v-model="form.cate_1st" placeholder="山东省">
              <el-option v-for="item in options_1st" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-select v-model="form.cate_2nd" placeholder="青岛市">
              <el-option v-for="item in options_2nd" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-select v-model="form.cate_3rd" placeholder="城阳区">
              <el-option v-for="item in options_2nd" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="运费" prop="freight">
          <el-input v-model="form.freight" style="width:120px"><template slot="append">元</template></el-input>
          <div class="sub-title">运费设为0，前台商品将显示免运费</div>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="submitForm('form')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { Category } from "@/api/index"
import Upload from "@/components/Upload.vue";
import E from "wangeditor";
export default {
  components: {
    Upload,
  },
  data() {
    return {
      form: {
        cate_1st: "",
        cate_2nd: "",
        cate_3rd:"",
        name: "",
        hotPoint: "",
        price: "",
        marketPrice: "",
        cost: "",
        discount: "",
        inventory: "",
        articleNo: "",
        img_lg:"",
        img_md: "", 
        slider:"",
        brand: "",
        detail: "",
        freight:"",
      },
      rules: {},
      // 一级分类数组
      options_1st: [],
      // 二级分类数组
      options_2nd: [],
      options_3rd:[],
      headers: {
        Authorization: `Bearer ${sessionStorage.token}`,
      },
      params: {
        type: "common",
      },
    };
  },
  watch: {
    headers: () => {
    },
    "form.cate_1st": async function(newValue, oldValue) {
      let options = await this.loadOptions(newValue);
      this.options_2nd = options;
      this.form.cate_2nd = this.options_2nd[0].id;
    },
  },
  async created() {
    // 请求一级分类
    let options = await this.loadOptions(0);
    this.options_1st = options;
    this.form.cate_1st = options[0].id;
  },
  methods: {
    // 请求下一级分类
    async loadOptions(id) {
      let { status, data } = await Category.subcate({ id });
      if (status) {
        // 请求成功
        // promise data
        return data;
      }
    },
    // async handleChange(value) {
    //   // 获得一级分类id值，获取二级分类
    //   let options = await this.loadOptions(value);
    //   this.options_2nd = options;
    //   console.log(this.options_2nd);
    //   // 将二级分类联动默认设置为第一项
    //   this.form.cate_2nd = this.options_2nd[0].id;
    // },
    handleAdd() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          let { status, data, msg } = await Goods.add(this.form);
          if (status) {
            this.$message.success("发布成功！");
            this.$router.replace("/Goods/list");
          } else {
            this.$message.error(msg);
          }
        } else {
          console.log("提交失败！");
        }
      });
    },
  },
  mounted() {
    var editor = new E(this.$refs.editor);
    editor.customConfig.onchange = (html) => {
      this.form.content = html;
    };
    // editor.customConfig.colors = [
    //     '#000000',
    //     '#eeece0',
    //     '#1c487f',
    //     '#4d80bf',
    //     '#c24f4a',
    //     '#8baa4a',
    //     '#7b5ba1',
    //     '#46acc8',
    //     '#f9963b',
    //     '#ffffff'
    // ]
    editor.create();
  },
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
.detail {
  width: 98%;
  font-size: 15px;
  margin: 0 auto;
  padding: 10px;
  background-color: #f5f5f5;
  margin-bottom: 20px;
}
</style>
