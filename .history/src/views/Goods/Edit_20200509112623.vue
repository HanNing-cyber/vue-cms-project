<template>
	<div>
		<el-card class="box-card">
			<div slot="header">
				<span>编辑商品</span>
			</div>
			<el-form ref="form" :model="form" :rules="rules" label-width="80px">
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
				<el-form-item label="商品主图">
					<el-radio-group v-model="form.img_lg">
						<Upload :src.sync="form.img_lg" action="http://localhost:3001/upload/common/" :headers="headers" :data="params"
						 remove-action="http://localhost:3001/upload/delete"></Upload>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="轮播图">
					<el-radio-group v-model="form.slider" class="lunbo">
						<Upload :src.sync="form.slider" action="http://localhost:3001/upload/common/" :headers="headers" :data="params"
						 remove-action="http://localhost:3001/upload/delete"></Upload>
						 <Upload :src.sync="form.slider" action="http://localhost:3001/upload/common/" :headers="headers" :data="params"
						  remove-action="http://localhost:3001/upload/delete"></Upload>
						  <Upload :src.sync="form.slider" action="http://localhost:3001/upload/common/" :headers="headers" :data="params"
						   remove-action="http://localhost:3001/upload/delete"></Upload>
						   <Upload :src.sync="form.slider" action="http://localhost:3001/upload/common/" :headers="headers" :data="params"
						    remove-action="http://localhost:3001/upload/delete"></Upload>
					</el-radio-group>
				</el-form-item>
				<div class="des">商品详情描述</div>
				<el-form-item label="商品品牌" prop="brand">
					<el-input v-model="form.brand"></el-input>
				</el-form-item>
				<el-form-item label="商品描述" prop="content">
					<!-- 富文本编辑器 -->
					<template>
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
					<el-input type="text" v-model="form.freight" class="inp"></el-input>
					<div class="el-input-group__append">元</div>
				</el-form-item>
				<el-form-item>
					<el-button type="primary">提交</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>

<script>
	import E from 'wangeditor'

	import { Goods } from '@/api/index.js'

	import Upload from '@/components/Upload.vue'

	export default {
		props:['id'],
		name: 'editor',
		components: {
			Upload,
		},
		data() {
			return {
				form: {
					cate_1st: '',
					cate_2nd: '',
					cate_3rd: '',
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
				headers: {
					Authorization: `Bearer ${sessionStorage.token}`
				},
				params: {
					type: 'common',
				},
				url: 'http://localhost:3001/images/avatar/9536d350-82d3-11ea-8b89-91ab35c66876.jpeg',
			}
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
	.lunbo{
		display: inline-flex;
	}
</style>
