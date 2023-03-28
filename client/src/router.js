import Vue from "vue";
import { createRouter, createWebHistory } from 'vue-router'
import Index from "./views/Index.vue"
import Register from "./views/Register.vue"
import Login from "./views/Login"
import NotFound from "./views/404"
import Home from "./views/Home"
import InfoShow from "./views/InfoShow"
import FundList from "./views/FundList"
// Vue.use(Router);

const routerHistory = createWebHistory()



const routes=[
    {
        path:'/',
        redirect:'/index'
    },
    {
        path:'/index',
        name:'index',
        component:Index,
        //二级路由
        children:[
            {path:'',component:Home},
            {path:'/home',name:'home',component:Home},
            {path:'/infoshow',name:'infoshow',component:InfoShow},
            {path:'/fundlist',name:'fundlist',component:FundList}
        ]
    },
    {
        path:'/register',
        name:'register',
        component:Register
    },
    {
        path:'/:pathMatch(.*)',
        name:'404',
        component:NotFound
    },
    {
        path:'/login',
        name:'login',
        component:Login
    },
]

const router = createRouter({
    history: routerHistory,
    routes
})
// vue2写法
// export default new Router({
//     mode:'history',
//     base:process.env.BASE_URL_,
//     routers:[
//         {
//             path:'/',
//             redirect:'/index'
//         },
//         {
//             path:'/index',
//             name:'index',
//             component:Index
//         }
//     ]
// })


// 路由守卫
router.beforeEach((to,from,next) =>{
    const isLogin = localStorage.eleToken ? true:false;
    if(to.path == '/login'||to.path == '/register'){
        next(); 
    }else{
        isLogin ? next() : next('/login')
    }
})

export default router