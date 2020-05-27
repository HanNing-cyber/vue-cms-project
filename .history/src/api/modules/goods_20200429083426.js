import axios from 'axios';
// 获取子级分类
// let subcate = (data) => axios.get('/api/category/all' , {params:data});
// 获取所有分类
let list= (data) => axios.get('/api/admin/goods/list' , {params:data});
// // 添加分类
// let insert = (data) => axios.post('/category/add' ,data)
// // 删除分类
// let remove = (data) => axios.post('/category/delete',{id:data});
let remove = (data) => axios.post('/admin/delete',{id:data});
// // 编辑分类
// let edit = (data) => axios.post('/category/edit',data)

export default{
    list,
}