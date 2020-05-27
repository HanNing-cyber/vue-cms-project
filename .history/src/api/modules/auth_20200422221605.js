import axios from 'axios';

// 列表
let list = (data) => axios.get('/role/list', { params: data });
//删除
let remove = (id) => axios.delete(`/role/${id}`);
//添加
let add = (name) => axios.post('/role', { name });
//编辑
let edit = (id, data) => axios.put(`/role/${id}`, data);
export default {
	list,
	remove,
	add,
	edit
}
