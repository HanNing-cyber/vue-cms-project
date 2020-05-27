<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>订单列表</span>
		</div>
		<el-table :data="tableData" style="width: 100%">
			<el-table-column prop="id" label="#" width="50"></el-table-column>
			<el-table-column width="500" prop="goodsList">
				<template slot-scope="scope">
					<el-table :data="scope.row.goodsList" stripe style="width: 100%">
						<el-table-column label="商品">
							<template slot-scope="scope">
								<div class="goods">
									<img :src="scope.row.img_md" class="img" alt=""> 
									<div>{{scope.row.name}}</div>
								</div>
							</template>
						</el-table-column>
						<el-table-column prop="goods_price" label="单价" width="120"></el-table-column>
						<el-table-column prop="goods_num" label="数量"></el-table-column>
					</el-table>
				</template>
			</el-table-column>
			<el-table-column prop="payment" label="付款总额" width="180"></el-table-column>
			<el-table-column prop="create_time" label="下单时间" width="180"></el-table-column>
			<el-table-column prop="status" label="状态" width="180"></el-table-column>
			<el-table-column label="操作" width="180">
				<template>
					<el-button size="mini" type="primary" icon="el-icon-deit" pain>编辑</el-button>
					<el-button size="mini" type="danger" icon="el-icon-deit" pain>删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</el-card>
</template>

<script>
	import { Order } from '@/api/index.js'

	export default {
		data() {
			return {
				tableData: [],
				goodsList: [],
			}
		},
		created() {
			// 获取列表数据
			this.loadList();
		},
		methods: {
			async loadList() {
				let { status, data, total } = await Order.list({ pageIndex: 1, pageSize: 4 });
				if (status) {
					this.tableData = data;
					// 获取商品的数据
					var arr = [];
					data.forEach((item) => {
						arr.push(item.goodsList);
						return arr;
					});
					// 合并
					this.goodsList = arr;
				}
			},
		}
	}
</script>

<style lang="less" scoped>
	.btn {
		margin-right: 10px;
	}

	.goods {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.img {
		width: 70px;
	}
</style>
