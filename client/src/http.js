import axios from 'axios';
import { ElLoading } from 'element-plus'
import router from './router';



let loading;
function startLoading(){
    loading = ElLoading.service({
        Lock:true,
        text:"稍安勿躁，很快就成....",
        background:'rgba(0,0,0,0.5)'
    });
}
function endLoading(){
    loading.close();
}




//请求拦截
axios.interceptors.request.use(config =>{
        //加载动画
        startLoading();

        //应该设置请求头（Authorization）
        if(localStorage.eleToken){
            config.headers.Authorization = localStorage.eleToken;
        }

        return config;
    },error => {
        return Promise.reject(e);
    })

//响应拦截
axios.interceptors.response.use(response =>{
        //结束动画
        endLoading()
        return response;
    },error => {
        //结束动画
        endLoading();
        // ElMessage.error(error.response.data);

        // 获取错误状态码,token过期处理
        const { status } = error.response;
        if(status == 401){
            Message.error('token失效，请重新登录!');
            //清除token
            localStorage.removeItem('eleToken');
            //跳转
            router.push('/login')
        }


        return Promise.reject(error);
    })

export default axios