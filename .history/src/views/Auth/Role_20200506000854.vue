<template>
	<el-row>
		<el-col :span="12">
			<div class="bo">
				<el-card class="box-card">
					<div slot="header" class="clearfixs">
						<span>角色列表</span>
						<el-button type="primary" plain icon="el-icon-circle-plus-outline" @click="add">添加角色</el-button>
					</div>
					<el-table :data="tableData" style="width: 100%">
						<el-table-column prop="id" label="#">
						</el-table-column>
						<el-table-column prop="tag" label="分类">
							<template slot-scope="scope">
								<el-tag :type="scope.row.tag === '家' ? 'primary' : 'success'" disable-transitions>{{scope.row.name}}</el-tag>
							</template>
						</el-table-column>
						<el-table-column prop="date" label="操作">
							<template slot-scope="scope">
								<router-link :to="{name:'RoleUser',params:{id:scope.row.id}}">
									<el-button @click="getId(scope.row.id,scope.$index)" type="primary" circle plain class="tn"><i class="el-icon-edit"></i></el-button>
								</router-link>
								<el-button icon="el-icon-delete" type="danger" circle @click="removeHandle(scope.row.id,scope.$index)"></el-button>
								<el-button icon="el-icon-setting" circle @click="opensetting(scope.row.id)"></el-button>
							</template>
						</el-table-column>
					</el-table>
				</el-card>
			</div>
		</el-col>
		<el-col :span="12" v-show="show">
			<el-card class="box-card right_card" v-for="(item,index) in menuList" :key="item.id">
				<div slot="header" class="clearfix size">
					<i class="el-icon-collection-tag"></i>
					<span>{{item.name}}</span>
					<div class="swicth">
						<el-switch v-model="item.checked" @change="checkAll(item)"></el-switch>
					</div>
				</div>
				<div class="content" v-for="(subitem,index) in item.children">
					<div class="left">
						<span class="text">{{subitem.name}}</span>
					</div>
					<div class="right">
						<el-switch v-model="subitem.checked" @change="oncheck(subitem,item)"></el-switch>
					</div>
				</div>
			</el-card>
		</el-col>
		<!-- 编辑角色模态框 -->
		<el-dialog title="编辑角色" :visible.sync="editVisible">
			<el-form :model="editForm" :rules="rules" ref="editForm">
				<el-form-item prop="name" label="名称">
					<el-input v-model="editForm.name" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="editVisible = false">取 消</el-button>
				<el-button type="primary" @click="handleEdit('editForm')">确 定</el-button>
			</div>
		</el-dialog>
	</el-row>
</template>

<script>
	import { Role } from '@/api/index.js'

	export default {
		data() {
			return {
				tableData: [],
				rules: {
					name: [
						{ required: true, message: '请输入角色名称', trigger: 'blur' },
					]
				},
				editForm: {
					name: '',
				},
				editModal: false,
				editVisible: false,
				show: false,
				menuList: [],
				addData: [],
				removeData: [],
				openId: '',
			}
		},
		created() {
			this.loadList();
		},
		methods: {
			// 获取列表
			async loadList() {
				let { status, data } = await Role.list();
				if (status) {
					this.tableData = data;
				}
			},
			// 添加
			add() {
				this.$prompt('角色名称', '添加角色', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
					})
					.then(async ({ value }) => {
						let { status, data } = await Role.add(value);
						if (status) {
							this.tableData.push({ id: data.id, name: value });
							this.$message({
								type: 'success',
								message: '添加成功',
							});
						}

					})
					.catch(() => {
						this.$message({
							type: 'info',
							message: '取消输入'
						});
					});
			},
			// 删除
			removeHandle(id, index) {
				this.$confirm('确定要删除此角色吗?', { type: 'warning' })
					.then(async () => {
						// 发送ajax 
						let { status } = await Role.remove({ id });
						if (status) {
							// 界面上的数据删除
							this.tableData.splice(index, 1);
							this.$message.success('删除成功');
						}
					});
			},
			// 获取
			getId(uid, index) {
				this.id = uid;
				this.editVisible = true;
				// 将结点数据还原到模态框中
				this.editForm = { ...this.tableData[index] };
			},
			// 编辑
			handleEdit(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						let { status, msg } = await Role.edit({ ...this.editForm });
						console.log({ ...this.editForm })
						if (status) {
							// 关闭弹窗
							this.editVisible = false;
							this.$message.success(msg);
							// 更新界面列表
							this.loadList();
						} else {
							this.$message.error(msg);
						}
					}
				})
			},
			// 设置按钮
			async opensetting(id) {
				// 转存id
				this.openId = id;
				this.show = true;
				let { status, data } = await Role.menu({ id });
				if (status) {
					this.menuList = data;
				}
			},
			// 一级开关添加
			async checkAll(data) {
				if (data.checked == true) {
					data.children.forEach(async (item) => {
						item.checked = data.checked;
						await Role.addmenu({ role_id: this.openId, menu_id: item.id });
					})
					await Role.addmenu({ role_id: this.openId, menu_id: data.id });
				} else {
					data.children.forEach(async (item) => {
						item.checked = data.checked;
						await Role.removemenu(this.openId, item.id);
					})
					await Role.removemenu(this.openId, data.id);
				}
			},
			// 单独选择添加
			async oncheck(subdata, data) {
				if (subdata.checked == true) {
					data.checked = subdata.checked;
					await Role.addmenu({ role_id: this.openId, menu_id: subdata.id });
					await Role.addmenu({ role_id: this.openId, menu_id: data.id });
				} else {
					data.checked = subdata.checked;
					await Role.removemenu(this.openId, subdata.id);
					await Role.removemenu(this.openId, data.id);
				}
			},

		},
	}
</script>

<style lang="less" scoped>
	.tn {
		margin-right: 10px;
	}

	.clearfixs {
		display: flex;
		justify-content: space-between;
	}

	.right_card {
		margin-bottom: 10px;

		.size {
			font-size: 14px;
			color: #409eff;

			i {
				margin-right: 3px;
			}

			.swicth {
				float: right;
			}
		}

		.content {
			display: flex;
			justify-content: space-between;
			margin-bottom: 10px;

			.text {
				font-size: 12px;
				color: #909399;
			}
		}
	}
</style>
