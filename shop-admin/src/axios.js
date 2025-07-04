import axios from 'axios'
import {ElNotification} from "element-plus";
import {useCookies} from '@vueuse/integrations/useCookies'// useCookies
import {getToken} from "~/composables/auth.js";
import {toast} from "~/composables/util.js";
import {store} from "~/store";

const service = axios.create({
    // baseURL:"http://ceshi13.dishait.cn" //在vue.config.js中配置了代理
    baseURL: '/api' // 使用代理路径
})

export default service

// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // 添加token ,统一添加 token
    // const  cookit=useCookies();
    // const token = cookit.get('admin-token');

    const token = getToken()
     if(token){//存在
         config.headers["token"] = token;
     }
     return config;

}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);//
});


// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response.data.data; // 只返回 data 部分
}, function (error) {
    const msg = error.response.data.msg || "请求失败"

    if(msg == "非法token，请先登录！"){
        console.log("非法");
        store.dispatch("logout").finally(()=>location.reload())
    }
    toast(msg,"error")
    return Promise.reject(error);
    // console.error("登录请求失败:", err); // 记录完整的错误对象，便于调试
    //
    // let errorMessage = '登录失败';
    //
    // // 检查错误类型并提取合适的错误信息
    // if (err.response) {
    //     // 服务器返回了错误响应（例如 401、500 等状态码）
    //     errorMessage = err.response.data?.msg || `请求失败 (${err.response.status})`;
    // } else if (err.request) {
    //     // 请求已发送，但没有收到响应
    //     errorMessage = '服务器未响应，请稍后重试';
    // } else {
    //     // 请求设置时出错（例如 URL 错误）
    //     errorMessage = '请求配置错误: ' + err.message;
    // }
    //
    // ElNotification({
    //     title: '登录错误',
    //     message: errorMessage,
    //     type: 'error',
    //     duration: 3000,
    // });
    //
    // console.log("错误处理完成");
    // return Promise.reject(err);
});