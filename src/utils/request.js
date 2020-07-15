/**
 * 1. 先引入axios
 * 2. axios.create方法创建实例
 * 3. 使用实例对象，创建请求拦截器
 * 4. 使用实例创建响应拦截器
 * 5. export 抛出实例对象
 * 6. main.js 中引入request文件对象
 */

import  axios from "axios";

import store from "@/store/index";

//2. create方法创建一个axios的实例
const Server = axios.create({
    baseURL: "",
    timeout: 3000,
});

//3. 使用server方法创建请求拦截器, 请求发送出去之前执行的
Server.interceptors.request.use(function(config){

    store.commit("setLoading",true);//设置loading加载组件
    return config;
},function(error){
    return Promise.reject(error);
});

//4. 使用Server方法创建响应拦截器  服务端数据返回到组件之前执行
Server.interceptors.response.use(function(response){
    //console.log(response);
    //判断接口返回的数据成功，直接返回数据中data数据
    if(response.status == 200){
        setTimeout(()=>{
            store.commit("setLoading",false);//设置loading加载组件隐藏
        },1000);
        return response.data;
    }
    return response;
},function(error){
    return Promise.reject(error);
});

//5. 抛出实例化对象
export default Server;

