import { createApp, VueElement } from 'vue'
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import ElementPlus from 'element-plus'
import * as ElIconModules from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import axios from './http'
import App from './App.vue'
import createRouter from './router'
import store from './store';


const app = createApp(App)
//统一注册图标
for(let iconName in ElIconModules){
    app.component(iconName,ElIconModules[iconName])
}
app.use(createRouter)
app.use(ElementPlus)
app.use(store)
app.config.globalProperties.$axios = axios
app.mount('#app')

// 若是没有开启Devtools工具，在开发环境中开启，在生产环境中关闭
if (process.env.NODE_ENV == 'development') {
    app.config.devtools = true;
} else {
    app.config.devtools = false;
}