<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>用户列表</span>
		</div>
		<template>
			<el-table :data="tableData" :default-sort="{prop: 'date', order: 'descending'}">
				<el-table-column prop="id" label="#" width="40">
				</el-table-column>
				<el-table-column prop="avatar" label="头像" width="120" sortable>
					<template slot-scope="scope">
						<el-avatar :size="60" :src="scope.row.avatar" fit="cover"></el-avatar>
					</template>
				</el-table-column>
				<el-table-column prop="username" label="账号" sortable width="100">
				</el-table-column>
				<el-table-column prop="fullname" label="姓名" sortable>
				</el-table-column>
				<el-table-column prop="sex" label="性别" sortable width="100">
				</el-table-column>
				<el-table-column prop="tel" label="手机" sortable width="120">
				</el-table-column>
				<el-table-column prop="role" label="角色" sortable>
					<template slot-scope="scope">
						<el-tag :type="scope.row.role_name=='超级管理员'?'danger':'primary'">{{scope.row.role_name}}</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="login_time" label="上次登录" sortable width="150">
				</el-table-column>
				<el-table-column prop="login_count" label="登录次数" sortable width="100">
				</el-table-column>
				<el-table-column label="操作" width="120px">
					<template slot-scope="scope">
						<!-- <router-link :to="{name:'UserEditor',params:{id:scope.row.id}}"> -->
						<el-button icon="el-icon-edit" type="primary" size="mini" plain class="btn" @click="openEditor(scope.row.id)"></el-button>
						<!-- </router-link> -->

						<el-button icon="el-icon-delete" @click="removeHandle(scope.row.id,scope.$index)" type="danger" size="mini" plain></el-button>
					</template>
				</el-table-column>
			</el-table>
		</template>
		<el-dialog title="修改信息" :visible.sync="editerVisible" width="40%">
			<el-form :model="editFrom" :rules="rules" ref="editFrom" label-width="80px">
				<el-form-item label="姓名" prop="username">
					<el-input v-model="editFrom.fullname"></el-input>
				</el-form-item>
				<el-form-item label="性别" prop="sex">
					<el-radio-group v-model="editFrom.sex">
						<el-radio label="男"></el-radio>
						<el-radio label="女"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="手机" prop="tel">
					<el-input v-model="editFrom.tel"></el-input>
				</el-form-item>
				<el-form-item label="权限" prop="role">
				<!-- 	<el-input v-model="editForm.role" placeholder="请选择权限">
						
					</el-input> -->
				</el-form-item>
				<el-form-item label="头像" prop="avatar">
					<el-upload class="avatar-uploader" :headers="headers" action="http://localhost:3003/api/upload/common"
					 :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
						<img v-if="imageUrl" :src="imageUrl" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						<div slot="file" slot-scope="{file}">
							<img class="el-upload-list__item-thumbnail" :src="imageUrl" alt="">
							<span class="el-upload-list__item-actions">
								<span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
									<i class="el-icon-delete"></i>
								</span>
							</span>
						</div>
					</el-upload>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="edit = false">取 消</el-button>
		 		<el-button type="primary" @click="handleEdit('editFrom')">确 定</el-button>
			</div>
		</el-dialog>
	</el-card>
</template>

<script>
	import { User } from '@/api/index.js'
	export default {
		data() {
			return {
				tableData: [],
				editerVisible: false,
				imageUrl: '',
				disabled: false,
				editFrom: {},
				headers: {
					Authorization: `Bearer ${sessionStorage.token}`
				},
				id: '',
				rules: {
					username: [
						{ type: 'string', message: '请输入姓名', trigger: 'blur' },
					],
					sex: [
						{ message: '请选择性别', trigger: 'change' }
					],
					tel: [
						{ type: "string", message: '请输入手机号！', trigger: 'blur' },
						{ type: "string", pattern: /^1[3456789]\d{9}$/, message: '请输入正确手机号', trigger: 'blur' }
					],
					role: [
						{ message: '请选择权限', trigger: 'change' }
					],
					avatar: [
						{ type: "string", message: '请添加图片！', trigger: 'blur' },
					],
				},
			}
		},
		created() {
			this.loadList();
		},
		methods: {
			async loadList() {
				let { status, data } = await User.list();
				if (status) {
					this.tableData = data;
				}
			},
			async loadOne(id) {
				let { status, data } = await User.profile({ id: id });
				if (status) {
					this.editFrom = data;
					this.imageUrl = data.avatar;
				}
			},
			removeHandle(id, index) {
				this.$confirm('确定要删除此账户吗？', { type: 'warning' })
					// 确定删除
					.then(async () => {
						// 发送ajax给后台
						let { status, msg } = await User.remove({ id });
						if (status) {
							// 删除界面上的数据
							this.tableData.splice(index, 1);
							this.$message.success('删除成功')
						}

					})
			},
			openEditor(id) {
				// 打开弹框
				this.editerVisible = true;
				//缓存id
				this.id = id;
				this.loadOne(id);
			},
			handleEdit(formName) {
				this.$refs[formName].validate(async valid => {
					if (valid) {
						let { status, data, msg } = await User.edit({ ...this.editForm });
						if (status) {
							this.editerVisible = false;
							this.$message.success('修改成功');
							this.loadList();
						}
					}
				})
			},
			handleAvatarSuccess() {
				this.imageUrl = URL.createObjectURL(file.raw);
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			},
			handleRemove(file) {
				console.log(file);
			},
		}
	}
</script>

<style lang="less" scoped="scoped">
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
</style>
