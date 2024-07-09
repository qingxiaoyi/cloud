import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://127.0.0.1:5173/cloud',
    timeout: 1000 * 30, // 请求超时时间设置为30秒
});

// 添加请求拦截器
instance.interceptors.request.use(
    (config) => {
        // 在发送请求之前做些什么
        return config;
    },
    (error) => {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 添加响应拦截器
instance.interceptors.response.use(
    (response) => {
        // 对响应数据做点什么
        console.log('response',response)
        return response;
    },
    (error) => {
        console.log('error',error)
        // 对响应错误做点什么
        return Promise.reject(error);
    }
);

export default instance;