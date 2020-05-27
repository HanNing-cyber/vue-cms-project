// import axios from 'axios';

// // 管理员登陆

// //ES5写法
// // function login(data){
// //     return axios.post('/admin/login',data);
// // }

// // ES6写法
// let login = (data) => axios.post('/admin/login',data);
// let register = (data) => axios.post('/admin/register',data);
// let list = (data) => axios.get('/admin/list',{params:data});

// // 删除管理员
// let remove = (data) => axios.post('/admin/delete',{id:data});
// // 获取管理员资料
// let info = (data) => axios.get('/admin/info',{params:data})

// let edit = (data) => axios.post('/admin/info',data)
// export default{
//     login,
//     register,
//     list,
//     remove,
//     info,
//     edit

// }