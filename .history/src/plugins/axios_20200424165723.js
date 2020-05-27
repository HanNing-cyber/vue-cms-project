import axios from 'axios';
import { Loading,Message } from 'element-ui';
// 路由实例
import router from '@/router/index'
// loading实例
let loading;
//设置默认参数
axios.defaults.baseURL='http://localhost:3001';

// 请求拦截器
axios.interceptors.request.use(function(config){
    // 开启loding
    loading=Loading.service({background:'rgba(0,0,0,0.7'});
    console.log(config);
    // 在发送请求之前，在headers头加token
    if(config.url=='/admin/login' || config.url=='/admin/register'){
        return config;
    }
    let token = sessionStorage.token;
    // 判断是否已经登录，拥有token
    // 没有token，提示用户，跳转登录页面
    if(!token){
        Message.error('token令牌失效，请重新登录！')
        setTimeout(()=>{
            router.replace('/login');
            loading.close();
        },2000);
        return;
    }
    // 拥有token，在headers头添加token
    config.headers.Authorization=`Bearer ${token}`;
    return config;
},function(error){
    // 对请求错误做些什么
    return Promise.reject(error);
})


axios.interceptors.response.use(function (response) {
    // 关闭loading
    loading.close();
    //在这里你可以判断后台返回数据携带的请求码
    if (response.status === 200) {
    return response.data
    } 
    // else {
    // // 非200请求抱错
    // throw Error(response.data.msg || '服务异常')
    // }
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default axios;