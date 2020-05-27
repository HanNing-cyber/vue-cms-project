import axios from 'axios';

// // 文章列表
let list = (data) => axios.get('/api/admin/list',{params:data});
let role = (data) => axios.get('/api/role/list', { params: data });
// // 删除用户
let remove = (id) => axios.delete('/api/admin' , {params:id});
// // 获取用户资料
// let info = (data) => axios.get('/user',{params:data});

// let edit = (id ,data ) => axios.put(`/user/${id}` ,data);

export default{   
    list,
    role,
    remove,
//     info,
//     edit,
}