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

<!--<template>
	<div>
		<el-card class="box-card">
			<div slot="header">
				<span>发布新商品</span>
			</div>
			<el-form ref="form" :model="form" :rules="rules" label-width="80px" size="mini">
				<el-form-item label="商品分类" prop="cate">
					<el-select v-model="form.cate_1st" placeholder="请选择一级分类">
						<el-option v-for="item in options_1st" :key="item.id" :label="item.name" :value="item.id"></el-option>
					</el-select>
					<el-select v-model="form.cate_2nd" placeholder="请选择二级分类" class="sel">
						<el-option v-for="item in options_2nd" :key="item.id" :label="item.name" :value="item.id"></el-option>
					</el-select>
					<el-select v-model="form.cate_3rd" placeholder="请选择三级分类" class="sel">
						<el-option v-for="item in options_3rd" :key="item.id" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="商品名称" prop="name">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="商品卖点" prop="hotPoint">
					<el-input type="textarea" v-model="form.hotPoint"></el-input>
				</el-form-item>
				<el-form-item label="商品价格" prop="price" class="el-input-group">
					<el-input type="text" v-model="form.price" class="inp">
						<template slot="append">元</template>
					</el-input>
				</el-form-item>
				<el-form-item label="市场价" prop="marketPrice" class="el-input-group">
					<el-input type="text" v-model="form.marketPrice" class="inp">
						<template slot="append">元</template>
					</el-input>
				</el-form-item>
				<el-form-item label="成本价" prop="cost" class="el-input-group">
					<el-input type="text" v-model="form.cost" class="inp">
						<template slot="append">元</template>
					</el-input>
				</el-form-item>
				<el-form-item label="折扣" prop="discount" class="el-input-group">
					<el-input type="text" v-model="form.discount" class="inp">
						<template slot="append">折</template>
					</el-input>
				</el-form-item>
				<el-form-item label="商品库存" prop="inventory" class="el-input-group">
					<el-input type="text" v-model="form.inventory" class="inp">
						<template slot="append">件</template>
					</el-input>
				</el-form-item>
				<el-form-item label="商品货号" prop="articleNo" class="el-input-group">
					<el-input type="text" v-model="form.articleNo" class="inp"></el-input>
				</el-form-item>
				<el-form-item label="主图" prop="img_lg">
					<el-upload :action="uploadUrl" :headers="token" list-type="picture-card" v-model="form.img_lg" :limit="1">
						<i class="el-icon-plus"></i>
					</el-upload>
				</el-form-item>
				<el-form-item label="轮播图" prop="img_md">
					<el-upload :action="uploadUrl" :headers="token" list-type="picture-card" v-model="form.img_md" :limit="1">
						<i class="el-icon-plus"></i>
					</el-upload>
				</el-form-item>
				<div class="des">商品详情描述</div>
				<el-form-item label="商品品牌" prop="brand">
					<el-input v-model="form.brand"></el-input>
				</el-form-item>
				<el-form-item label="商品描述" prop="content">
					<!-- 富文本编辑器 -->
				<!--	<template>
						<div>
							<div ref="editor" style="text-align:left"></div>
						</div>
					</template>
				</el-form-item>
				<div class="des">商品物流信息</div>
				<el-form-item label="所在地" prop="cate">
					<el-select v-model="form.cate_1st" placeholder="山东省">
						<el-option v-for="item in options_1st" :key="item.id" :label="item.name" :value="item.id"></el-option>
					</el-select>
					<el-select v-model="form.cate_2nd" placeholder="青岛市" class="sel">
						<el-option v-for="item in options_2nd" :key="item.id" :label="item.name" :value="item.id"></el-option>
					</el-select>
					<el-select v-model="form.cate_3rd" placeholder="城阳区" class="sel">
						<el-option v-for="item in options_3rd" :key="item.id" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="运费" prop="freight" class="el-input-group">
					<el-input type="text" v-model="form.freight" class="inp">
						<template slot="append">元</template>
					</el-input>
					<div class="sub-title">运费设为0，前台商品将显示免运费</div>
				</el-form-item>
				<el-form-item>
					<el-button type="success" @click="handleRelease('form')">提交</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template> -->

<script>
	import E from 'wangeditor'

	import { Goods } from '@/api/index.js'


	export default {
		name: 'editor',
		data() {
			return {
				form: {
					cate_1st: '',
					cate_2nd: '',
					cate_3rd: 0,
					name: '',
					hotPoint: '',
					price: '',
					marketPrice: '',
					cost: '',
					discount: '',
					inventory: '',
					articleNo: '',
					brand: '',
					freight: '',
				},
				rules: {
					name: [
						{ required: true, message: '请输入商品名称', trigger: 'blur' },
						{ min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' }
					],
					hotPoint: [
						{ required: true, message: '请输入商品热点描述', trigger: 'blur' },
						{ min: 3, max: 1000, message: '长度在 3 到 1000 个字符', trigger: 'blur' }
					],
					price: [
						{ required: true, message: '请输入商品价格', trigger: 'blur' },
						{ min: 3, max: 10000, message: '长度在 3到10000个字符', trigger: 'blur' }
					],
					cate_1st: [
						{ type: 'date', required: true, message: '请选择一级分类', trigger: 'change' }
					],
					cate_2nd: [
						{ type: 'date', required: true, message: '请选择二级分类', trigger: 'change' }
					],
					cate_3rd: [
						{ type: 'date', required: true, message: '请选择三级分类', trigger: 'change' }
					],
					marketPrice: [
						{ required: true, message: '请输入市场价', trigger: 'blur' },
						{ min: 3, max: 10000, message: '长度在 3到10000个字符', trigger: 'blur' }
					],
					cost: [
						{ required: true, message: '请输入成本价', trigger: 'blur' },
						{ min: 3, max: 10000, message: '长度在 3到10000个字符', trigger: 'blur' }
					],
					discount: [
						{ required: true, message: '请输入折扣价', trigger: 'blur' },
						{ min: 3, max: 10000, message: '长度在 3到10000个字符', trigger: 'blur' }
					],
					inventory: [
						{ required: true, message: '请输入商品库存', trigger: 'blur' },
						{ min: 3, max: 10000, message: '长度在 3到10000个字符', trigger: 'blur' }
					],
					articleNo: [
						{ required: true, message: '请输入商品货号', trigger: 'blur' },
						{ min: 3, max: 10000, message: '长度在 3到10000个字符', trigger: 'blur' }
					],
					brand: [
						{ required: true, message: '请输入商品品牌', trigger: 'blur' },
						{ min: 3, max: 10000, message: '长度在 3到10000个字符', trigger: 'blur' }
					],
					freight: [
						{ required: true, message: '请输入商品运费', trigger: 'blur' },
						{ min: 3, max: 10000, message: '长度在 3到10000个字符', trigger: 'blur' }
					],
				},
				// 一级分类
				options_1st: [],
				// 二级分类
				options_2nd: [],
				// 三级分类
				options_3rd: [],
				uploadUrl: "http://localhost:3003/api/upload/common",
				token: {
					Authorization: `Bearer ${sessionStorage.token}`,
				},
			}
		},
		// 侦听器 与ajax,异步操作有关
		watch: {
			// 监听一层
			headers: () => {},
			//监听两层
			"form.cate_1st": async function(newValue, oldValue) {
				let options = await this.loadOptions(newValue);
				this.options_2nd = options;
				this.form.cate_2nd = options[1].id;
			}
		},
		async created() {
			// 请求一级分类
			let options = await this.loadOptions(1);
			this.options_1st = options;
			this.form.cate_1st = options[2].id;
			console.log(options);
		},
		methods: {
			// 请求下一级分类的数据,传参id=0则获取一级分类
			async loadOptions(pId) {
				let { status, data } = await Goods.subcate({ pId });
				if (status) {
					return data;
				}
			},
			handleRelease(formName) {
				// 表单验证
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						let { status, data, msg } = await Goods.release(this.form);
						if (status) {
							this.$message.success(msg);
							this.$router.push('/goods/list');
						} else {
							this.$message.error(msg);
						}
					}
				})

			},
		},
		mounted() {
			// this.$refs.editor
			// 相当于
			// document.getElementById('editor');

			var editor = new E(this.$refs.editor)
			editor.customConfig.onchange = (html) => {
					this.form.content = html
				},
				editor.create();
		}
	}
</script>

<style lang="less">
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}

	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}

	.inp {
		width: 200px;
	}

	.des {
		background-color: #f5f5f5;
		padding: 10px;
		margin-bottom: 10px;
	}
</style>
