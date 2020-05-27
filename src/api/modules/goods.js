import axios from 'axios';

// 商品列表
let list = (goods) => axios.get('/api/admin/goods/list', { params: goods }) //取出sessionStorage里的token

// 获取商品子级分类
let subcate = (data) => axios.get('/api/category/sub', { params: data });

// 获取商品所有分类
let all = (data) => axios.get('/api/category/all', { params: data });

// 删除商品
let remove = (id) => axios.delete('/api/admin/goods', { params: id });

// 发布新商品 
let release = (data) => axios.post('/api/admin/goods', data);

// 删除分类
let del = (id) => axios.delete('/api/category', { params: id });

// 添加分类
let insert = (data) => axios.post('/api/category', data);

// 编辑分类
let Edit = (data) => axios.put('/api/category', data);

export default { 
	list,
	subcate,
	all,
	remove,
	release,
	del,
	insert,
	Edit,
}
