import axios from 'axios';

// 文章列表
let list = (data) => axios.get('/user/list',{params:data});
// 删除用户
let remove = (id) => axios.delete(`/user/${id}`);
// 获取用户资料
let info = (data) => axios.get('/user',{params:data});

let edit = (id ,data ) => axios.put(`/user/${id}` ,data);

export default{   
    list,
    remove,
    info,
    edit,
}