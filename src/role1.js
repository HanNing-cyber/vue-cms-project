import axios from 'axios';

// 角色列表
let list = (data) => axios.get('/api/role/list', { params: data });

// 添加角色
let add = (data) => axios.post('/api/role', { name: data });

// 删除角色
let remove = (id) => axios.delete('/api/role', { params: id });

// 编辑角色
let edit = (data) => axios.put('/api/role', data);

// 获取商品子级分类 
let subcate = (data) => axios.get('/api/menu/sub', { params: data });

//删除子级分类
let del = (id) => axios.delete('/api/menu', { params: id });

// 添加子菜单
let insert = (data) => axios.post('/api/menu', data);

// 编辑子菜单
let Edit = (data) => axios.put('/api/menu', data);

// 获得角色菜单栏
let menu = (data) => axios.get('/api/role/config', { params: data });

// 添加菜单
let addmenu = (data) => axios.post('/api/role/menu', data);

// 删除菜单
let removemenu = (rid, mid) => axios.delete(`/api/role/menu?role_id=${rid}&menu_id=${mid}`);

// 获取子菜单图片
let icon = (data) => axios.put('/api/menu/icon', data);

export default {
	list,
	add,
	remove,
	edit,
	subcate,
	del,
	insert,
	Edit,
	menu,
	addmenu,
	removemenu,
	icon,
}
