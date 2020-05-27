import axios from 'axios';


// // 获取管理员资料

let info = (data) => axios.get('/api/admin',{params:data})

let edit = (data) => axios.post('/api/admin',data)
let subcate = (data) => axios.get('/api/role/list' , {params:data});
export default{
    info,
    edit,
    subcate,

}