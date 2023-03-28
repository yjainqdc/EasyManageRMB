
// import Vuex from 'vuex'
import { createStore } from 'vuex'
// app.config.devtools = true;

const types = {
    SET_AUTHENTICATED:"SET_AUTHENTICATED",
    SET_USER:"SET_USER"
};
const state = {
    //数据，相当于data
    isAuthenticated:false,
    user:{}
};
const getters = {
    //里面定义方法，操作state方发
    isAuthenticated: state => state.isAuthenticated,
    user: state => state.user
};
const mutations = {
    // 操作异步操作mutation
    [types.SET_AUTHENTICATED](state,isAuthenticated){
        if(isAuthenticated)state.isAuthenticated = isAuthenticated;
        else state.isAuthenticated = false
    },
    [types.SET_USER](state,user){
        if(user)state.user = user;
        else state.user = {};
    }
};
const actions = {
    //存储授权
    setAuthenticated:({commit},isAuthenticated) => {
        commit(types.SET_AUTHENTICATED,isAuthenticated);
    },
    //存储用户信息
    setUser:({commit},user) => {
        commit(types.SET_USER,user);
    },
    //清除
    clearCurrentState:({commit})=>{
        commit(types.SET_AUTHENTICATED,false);
        commit(types.SET_USER,null);
    }
}



const store = createStore({
    state,
    getters,
    mutations,
    actions
})
export default store;