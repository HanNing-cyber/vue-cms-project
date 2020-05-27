<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>编辑商品</span>
    </div>
    <el-form
      :label-position="labelPosition"
      :rules="rules"
      ref="form"
      :model="form"
      label-width="120px"
    >
      <el-form-item label="商品分类">
        <el-col :span="4">
          <el-select v-model="form.cate_1st" placeholder="请选择分类" prop="cate_1st">
            <el-option
              v-for="item in options_1st"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select v-model="form.cate_2nd" placeholder="请选择分类" prop="cate_2nd">
            <el-option
              v-for="item in options_2nd"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select v-model="form.cate_3rd" placeholder="请选择分类" prop="form.cate_3rd">
            <el-option
              v-for="item in options_2nd"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="商品名称" prop="name">
        <el-col class="tip" :span="14">
          <el-input v-model="form.name"></el-input>商品标题名称长度至少3个字符，最长200个汉字
        </el-col>
      </el-form-item>
      <el-form-item label="商品卖点" prop="hotPoint">
        <el-col class="tip" :span="14">
          <el-input type="textarea" v-model="form.hotPoint"></el-input>商品卖点不能超过140个汉字
        </el-col>
      </el-form-item>
      <el-form-item label="商品价格" prop="price">
        <el-col class="tip" :span="3">
          <el-input @blur="sellmarket('price')" v-model.number="form.price">
            <template slot="append">元</template>
          </el-input>
        </el-col>
        <br />
        <el-col class="tip" :span="14">价格必须是0-999999之间的数字，且不能高于市场价</el-col>
        <el-col class="tip" :span="14">此价格为商品实际销售价格，如果商品存在规格，改价格显示最低价格字</el-col>
      </el-form-item>
      <el-form-item label="市场价" prop="marketPrice">
        <el-col class="tip" :span="3">
          <el-input @blur="market" v-model.number="form.marketPrice">
            <template slot="append">元</template>
          </el-input>
        </el-col>
        <br />
        <el-col class="tip" :span="14">价格必须是0-999999之间的数字，此价格仅为市场参考价，请根据实际情况认真填写</el-col>
      </el-form-item>
      <el-form-item label="成本价" prop="cost">
        <el-col class="tip" :span="3">
          <el-input @blur="xprice('cost')" v-model.number="form.cost">
            <template slot="append">元</template>
          </el-input>
        </el-col>
        <br />
        <el-col class="tip" :span="14">价格必须是0-999999之间的数字，且不能高于市场价</el-col>
      </el-form-item>
      <el-form-item label="折扣" prop="discount">
        <el-col class="tip" :span="3">
          <el-input v-model="form.discount" disabled>
            <template slot="append">折</template>
          </el-input>
        </el-col>
        <br />
        <el-col class="tip" :span="14">根据销售价与市场价比例自动生成不需要编辑</el-col>
      </el-form-item>
      <el-form-item label="商品库存" prop="inventory">
        <el-col class="tip" :span="3">
          <el-input v-model="form.inventory">
            <template slot="append">件</template>
          </el-input>
        </el-col>
        <br />
        <el-col class="tip" :span="14">价格必须是0-999999之间的整数</el-col>
        <el-col class="tip" :span="14">若启动了库存配置，则系统自动计算商品的总数，此处无需卖家填写</el-col>
      </el-form-item>
      <el-form-item label="商品货号" prop="articleNo">
        <el-col class="tip" :span="3">
          <el-input v-model="form.articleNo"></el-input>
        </el-col>
        <br />
        <el-col class="tip" :span="14">商品货号是商家管理商品的编号，买家不可见</el-col>
        <el-col class="tip" :span="14">最多输入20个字符，只支持输入中文、字母、数字、_、/、-和小数点</el-col>
      </el-form-item>
      <el-form-item label="商品主图">
        <upload
          upload-action="/api/upload/goods"
          :src.sync="form.img_md"
          :lg-img.sync="form.img_lg"
          remove-action="/api/upload"
        ></upload>
        <el-col class="tip" :span="24">
          上传商品默认主图，如多规格时将默认图片或分规格上传规格主图，支持jpg、if、png格式上传或从图片空间选中，建议使用尺寸
          800*800像素以上，大小不超过1M的正方形图片，上传后的图片将自动保存在图片空间的默认分类中
        </el-col>
      </el-form-item>
      <el-form-item label="商品轮播图">
        <el-upload
          :file-list="fileList"
          action="api/upload/slider/"
          list-type="picture-card"
          :headers="headers"
          :on-preview="handlePictureCardPreview"
          :on-error="handleError"
          :on-success="handleSliderSuccess"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
        <el-col class="tip" :span="24">
          上传商品默认主图，如多规格时将默认图片或分规格上传规格主图，支持jpg、if、png格式上传或从图片空间选中，建议使用尺寸
          800*800像素以上，大小不超过1M的正方形图片，上传后的图片将自动保存在图片空间的默认分类中
        </el-col>
      </el-form-item>

      <div class="gorytitle">商品详情描述</div>

      <el-form-item label="商品品牌" prop="brand">
        <el-col class="tip" :span="14">
          <el-input v-model="form.brand"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="商品描述" v-model="form.detail" prop="detail">
        <!-- 编辑器 -->
        <div class="wangEdit" ref="editor" style="text-align:left"></div>
      </el-form-item>

      <div class="gorytitle">商品物流信息</div>

      <el-form-item label="所在地">
        <el-select class="region" v-model="form.province" placeholder="请选择省份">
          <el-option
            v-for="item in address_1st"
            :key="item._id"
            :label="item.name"
            :value="item.province_id"
          ></el-option>
        </el-select>

        <el-select v-model="form.city" placeholder="请选择城市">
          <el-option
            v-for="item in address_2nd"
            :key="item._id"
            :label="item.name"
            :value="item.city_id"
          ></el-option>
        </el-select>

        <el-select v-model="form.county" placeholder="请选择城区">
          <el-option
            v-for="item in address_3rd"
            :key="item._id"
            :label="item.name"
            :value="item.county_id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="运费" prop="freight">
        <el-col class="tip" :span="3">
          <el-input v-model="form.freight">
            <template slot="append">元</template>
          </el-input>
        </el-col>
        <br />
        <el-col class="tip" :span="14">运费设为0，前台商品将显示免运费</el-col>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleSubmit('form')" type="success">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { Goods } from "@/api/index";
import { Address } from "@/api/index";
import E from "wangeditor";
import upload from "@/components/Upload.vue";
export default {
  components: {
    upload
  },
  //缓存机制1.先在index.js里配置 2.在页面级里写属性
  props: ["id"],
  data() {
    return {
      //轮播图
      fileList: [],
      //模态框
      dialogImageUrl: "",
      dialogVisible: false,
      labelPosition: "left",

      form: {
        cate_1st: "",
        cate_2nd: "",
        cate_3rd: "",
        name: "",
        hotPoint: "",
        price: "",
        marketPrice: "",
        cost: "",
        discount: "",
        inventory: "",
        articleNo: "",
        img_lg: "",
        img_md: "",
        slider: "",
        brand: "",
        detail: "",
        freight: "",

        //地址数据
        province: "",
        city: "",
        county: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入标题", trigger: "blur" },
          {
            min: 3,
            max: 200,
            message: "长度在 3 到 200 个字符",
            trigger: "blur"
          }
        ],
        hotPoint: [
          { required: true, message: "请输入商品卖点", trigger: "blur" },
          {
            min: 0,
            max: 140,
            message: "长度在 140 个字符以内",
            trigger: "blur"
          }
        ],
        price: [
          {
            required: true,
            message: "请输入商品价格，不能高于市场价",
            trigger: "blur"
          }
        ],
        marketPrice: [
          { required: true, message: "请输入市场价", trigger: "blur" }
        ],
        cost: [
          {
            required: true,
            message: "请输入成本价，不能高于市场价",
            trigger: "blur"
          }
        ],
        inventory: [
          { required: true, message: "请设置库存数量", trigger: "blur" }
        ],
        articleNo: [
          { required: true, message: "请输入商品货号", trigger: "blur" },
          { min: 0, max: 200, message: "长度在 20 个字符以内", trigger: "blur" }
        ],
        img_lg: [
          { required: true, message: "选择商品主图", trigger: "change" }
        ],
        slider: [
          { required: true, message: "选择商品轮播图", trigger: "change" }
        ],
        brand: [{ required: true, message: "请填写商品品牌", trigger: "blur" }],
        detail: [
          { required: true, message: "请填写商品描述", trigger: "blur" }
        ],
        freight: [{ required: true, message: "请填写运费", trigger: "blur" }]
      },
      headers: {
        Authorization: `Bearer ${sessionStorage.token}`
      },
      
      // 一级分类数组
      options_1st: [],
      // 二级分类数组
      options_2nd: [],

      //地址分类
      //省
      address_1st: [],
      //市
      address_2nd: [],
      //区
      address_3rd: [],

      // 富文本
      editorContent: ""
    };
  },
  watch: {
    // 有嵌套结构用引号
    //---------------二级联动------------------------------
    "form.cate_1st": async function(newValue, oldValue) {
      let options = await this.loadOptions(newValue);
      this.options_2nd = options;
      // 二级分类默认选中第一项
      //this.form.cate_2nd = options[0].id;
    },

    // ------------------------地址----------------------
    "form.province": async function(newValue, oldValue) {
      let options = await this.loadCity(newValue);
      this.address_2nd = options;
      // 默认地址
      this.form.city = options[1].city_id;
    },
    "form.city": async function(newValue, oldValue) {
      let options = await this.loadCounty(newValue);
      this.address_3rd = options;
      // 默认地址
      this.form.county = options[5].county_id;
    }
  },
  async created() {
    //------------------- 请求一级分类 -----------------
    let options = await this.loadOptions(1);
    this.options_1st = options;
    this.form.cate_1st = options[0].id;

    //-----------------请求省级地址-----------------------
    let province = await this.loadProvince();
    this.address_1st = province;
    this.form.province = province[14].province_id;
    //请求市
    let city = await this.loadCity(this.form.province);
    this.address_2nd = city;
    this.form.city = city[0].city_id;
    //请求区
    let county = await this.loadCounty(this.form.city);
    this.address_3rd = county;
    this.form.county = county[0].county_id;

    // params方式传参this.$route.params
    let { id } = this.$route.params;
    this.loadDetail(id);
  },
  methods: {
    //-------------------修改商品-------------------------
    handleSubmit(formName) {
      // 表单验证
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let { status, msg } = await Goods.editgoods({ ...this.form });
          if (status) {
            this.$message.success(msg);
            //跳转页面
            setTimeout(() => {
              this.$router.replace("/goods/list");
            }, 1000);
          } else {
            this.$message.error(msg);
          }
        }
      });
    },

    //---------------指定id的文章详情------------------------
    async loadDetail(id) {
      let { status, data } = await Goods.detail({ id });
      if (status) {
        this.form = data;
        //获取轮播图
        let arr = data.slider.split(",");
        let list = arr.map(function(item, index) {
          let obj = {};
          obj.url = item;
          obj.name = index + ".jpg";
          obj.response = { src: item };
          return obj;
        });
        this.fileList = list;
        //wangEit
        var editor = new E(this.$refs.editor);
        editor.customConfig.onchange = html => {
          // 修改内容时同步到form里面
          this.form.detail = html;
          // 清空富文本编辑器
          if (this.form.detail == "<p><br></p>") {
            this.form.detail = "";
          }
        };
        editor.create();
        // id获取富文本编辑器内容
        editor.txt.html(this.form.detail);
      }
    },

    //-----------------删除上传文件的钩子----------------------
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    //--------------- 点击文件列表文件时的钩子--------------
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //----------------- 文件上传失败时的钩子------------------------
    handleError(err, file, fileList) {
      console.dir();
      if (err.status == 401) {
        this.$message.error(`错误:401,Token失效,请重新登录!`);
        return;
      }
      if (err.status == 400) {
        err.message = JSON.parse(err.message);
        this.$message.error(`错误:400,${err.message.msg}`);
        return;
      }
    },
    // ----------------文件上传成功时的钩子----------------------
    handleSliderSuccess(response, file, fileList) {
      let arr = [];
      fileList.forEach((item, index) => {
        arr.push(item.response.src);
      });

      if (response.status) {
        // toString 数组转成字符串
        this.form.slider = arr.toString();
      }
    },

    // ---------------------上传主图--------------------------------
    handleSliderSuccess1(response, file, fileList) {
      //console.log(response)
      if (response.status) {
        this.form.img_md = response.mdImg;
      }
    },

    // 请求下一级分类
    async loadOptions(id) {
      let { status, data } = await Goods.category({ pId: id });
      if (status) {
        return data;
        //相当于  return Promise.resolve(data)
      }
    },
    // ---------------------获取所有省份------------------------------
    async loadProvince() {
      let { status, data } = await Address.province();
      if (status) {
        return data;
      }
    },
    async loadCity(id) {
      let { status, data } = await Address.city({ id });
      if (status) {
        return data;
      }
    },
    async loadCounty(id) {
      let { status, data } = await Address.county({ id });
      if (status) {
        return data;
      }
    },

    // 商品价格和成本的失焦函数
    sellmarket(price) {
      // 如果还没有市场价，则return
      if (!this.form.marketPrice) {
        return;
      }
      // 如果商品价格大于市场价
      if (this.form[price] > this.form.marketPrice) {
        this.$message.warning("此处价格不能高于市场价格");
        this.form[price] = "";
        // 如果传进来的参数是商品价格并且高于市场价时
        if (price == "price") {
          this.form.discount = "";
        }
        return;
      }
      if (this.form.marketPrice && this.form.price) {
        this.form.discount = (this.form.price / this.form.marketPrice) * 10;
      }
    },
    // 市场价的失焦函数
    market() {
      if (!this.form.price && !this.form.cost) {
        return;
      }
      if (
        this.form.cost > this.form.marketPrice &&
        this.form.price > this.form.marketPrice
      ) {
        this.$message.warning("商品和成本价格不能高于市场价格");
        this.form.cost = "";
        this.form.price = "";
        return;
      }
      // 如果商品价格大于市场价
      if (this.form.price > this.form.marketPrice) {
        this.$message.warning("商品价格不能高于市场价格");
        this.form.price = "";
        this.form.discount = "";
      }
      // 如果商品价格大于市场价
      if (this.form.cost > this.form.marketPrice) {
        this.$message.warning("成本价格不能高于市场价格");
        this.form.cost = "";
      }
      if (this.form.marketPrice && this.form.price) {
        this.form.discount = (this.form.price / this.form.marketPrice) * 10;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.tip {
  font-size: 12px;
  color: #999;
}

.section-title {
  background-color: #f5f5f5;
  padding: 10px;
  margin-bottom: 10px;
}
</style>
