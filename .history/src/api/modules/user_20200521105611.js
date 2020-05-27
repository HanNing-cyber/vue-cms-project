import axios from 'axios';

// 管理员列表
let roleList = (data) => axios.get('/api/admin/list', { params: data });


// 删除管理员列表
let remove = (id) => axios.delete('/api/admin', { params: id });

// 获取管理员个人资料
let profile = (id) => axios.get('/api/admin', { params: id });

// 编辑管理员
let edit = (data) => axios.put('/api/admin/', data);

export default {
	list,
	remove,
	edit,
	profile,
	// roleList,
}
