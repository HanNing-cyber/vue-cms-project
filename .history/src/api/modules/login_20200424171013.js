import axios from 'axios';



let login = (data) => axios.post('/admin/login',data);
let register = (data) => axios.post('/admin/register',data);

export default{
    login,
    register,

}