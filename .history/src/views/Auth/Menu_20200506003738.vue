<template>
	<div>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>菜单权限</span>
			</div>
			<!-- <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree> -->
			<div class="custom-tree-container">
				<div type="warning" class="tip-tag">
					<div class="left-tip"><i class="el-icon-warning" style="fontSize:30px"></i></div>
					<div class="right-tip">
						<div>Tips</div>
						<div>设置后台管理系统的左侧菜单，目前至多支持两层菜单，三层以上菜单将不会显示。</div>
					</div>
				</div>
				<div class="block">
					<!-- <el-tree ref="tree" lazy :props="defaultProps" :data="data"> -->
					<el-tree ref="tree" :load="loadNode" lazy :props="defaultProps" node-key="id">
						<span class="custom-tree-node" slot-scope="{ node, data }">
							<span>{{node.label }}</span>
							<span>
								<el-tooltip class="item" effect="light" content="Left Top 提示文字" placement="left-start">
									<el-button type="text" size="mini" icon="el-icon-user-solid" :disabled="node.level==1">
										图标
									</el-button>
								</el-tooltip>
								<el-button type="text" size="mini" icon="el-icon-plus" @click.stop="openInsertModal(node,data)">
									添加
								</el-button>
								<el-button type="text" size="mini" icon="el-icon-edit" :disabled="node.level==1" @click.stop="openEditModal(node,data)">
									编辑
								</el-button>
								<el-button type="text" size="mini" icon="el-icon-delete" @click.stop="openRemoveModal(node,data)" :disabled="node.level==1">
									删除
								</el-button>
								<el-button type="text" size="mini">
									<span class="sort">显示序号：</span>
									<el-tag class="tag">{{data.order}}</el-tag>
								</el-button>
							</span>
						</span>
					</el-tree>
				</div>
			</div>
		</el-card>
		<!-- 添加模态框 -->
		<el-dialog title="添加节点" :visible.sync="insertVisible" width="30%">
			<el-form ref="insertForm" :model="insertForm" :rules="rules" label-width="80px">
				<el-form-item label="菜单名称" prop="name">
					<el-input v-model="insertForm.name"></el-input>
				</el-form-item>
				<el-form-item label="链接地址" prop="path">
					<el-input v-model="insertForm.path" placeholder="指定此菜单的链接地址,可选填"></el-input>
				</el-form-item>
				<el-form-item label="显示顺序" prop="order">
					<el-input v-model="insertForm.order" placeholder="显示顺序按照数字大小,如:2001"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="insertVisible = false">取 消</el-button>
				<el-button type="primary" @click="handleInsert('insertForm')">确 定</el-button>
			</span>
		</el-dialog>

		<!-- 编辑模态框 -->
		<el-dialog title="编辑节点" :visible.sync="editVisible" width="30%">
			<el-form ref="editForm" :model="editForm" :rules="rules" label-width="80px">
				<el-form-item label="菜单名称" prop="name">
					<el-input v-model="editForm.name"></el-input>
				</el-form-item>
				<el-form-item label="链接地址" prop="path">
					<el-input v-model="editForm.path" placeholder="指定此菜单的链接地址,可选填"></el-input>
				</el-form-item>
				<el-form-item label="显示顺序" prop="order">
					<el-input v-model="editForm.order" placeholder="显示顺序按照数字大小,如:2001"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="editVisible = false">取 消</el-button>
				<el-button type="primary" @click="handleEdit('editForm')">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import { Auth } from '@/api/index.js'

	export default {
		data() {
			return {
				defaultProps: {
					label: 'name',
					children: "children",
				},
				insertForm: {
					name: '',
					pId: '',
					order: '',
				},
				editForm: {
					name: '',
					pId: '',
					order: '',
				},
				rules: {
					name: [
						{ required: true, message: '请输入分类名称', trigger: 'blur' },
					],
					order: [
						{ required: true, message: '请输入菜单顺序', trigger: 'blur' },
					]
				},
				nodeData: {}, //节点数据
				node: {}, //节点对象
				insertVisible: false,
				editVisible: false,
			}
		},
		methods: {
			async loadNode(node, resolve) {
				console.log(node);
				// 根节点
				if (node.level == 0) {
					return resolve([{ name: '全部分类', pId: 0 }]);
				}
				if (node.level == 1) {
					// 取出node.data里的数据
					let { status, data } = await Auth.subcate({ pId: 1 });
					if (status) {
						resolve(data);
					}
				}
				if (node.level == 2) {
					// 取出node.data里的数据
					let id = node.data.id;
					// let { pId } = node.data;
					let { status, data } = await Auth.subcate({ pId: id });
					if (status) {
						resolve(data);
					}
				}
			},
			// 删除
			openRemoveModal(node, data) {
				this.$confirm('确定要删除此分类吗?', { type: 'warning' })
					.then(async () => {
						// 发送ajax
						let id = node.data.id;
						let { status } = await Auth.del({ id }); //扩展运算符
						if (status) {
							// 界面上的数据删除
							this.$refs.tree.remove(data);
							this.$message.success('删除成功');
						} else {
							this.$message.error(msg);
						}
					});
			},
			// 添加
			openInsertModal(node, data) {
				console.log(data)
				// 转存了父级分类id
				this.insertForm.pId = data.pId + 1;
				// 转存 父类节点
				this.node = node;
				this.insertVisible = true;
			},
			handleInsert(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						let { status, msg, data } = await Auth.insert({ ...this.insertForm }); //扩展运算符
						if (status) {
							// 关闭弹窗
							this.insertVisible = false;
							// 界面添加节点
							this.$refs.tree.append({ ...this.insertForm, ...data }, this.node);
						}
					}
				});
			},
			// 编辑
			openEditModal(node, data) {
				// 转存节点对象
				this.node = node;
				this.editForm = { ...data };
				this.editVisible = true;
			},
			handleEdit(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						let { status, msg } = await Auth.Edit({ ...this.editForm }); //扩展运算符
						if (status) {
							this.$message.success(msg);
							// 关闭弹窗
							this.editVisible = false;
							// 更新节点
							this.node.data = this.editForm;
						} else {
							this.$message.error(msg);
						}
					}
				});
			}
		},
	}
</script>

<style lang="less" scoped>
	.custom-tree-node {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		padding-right: 8px;
	}

	.xu {
		font-size: 12px;
		padding-left: 10px;
	}
	.tip-tag{
		margin-bottom: 20px;
		display: flex;
		justify-content: flex-start;
		align-items: center;

		.right-tip{
			margin-left: 15px;
		}
	}
</style>
