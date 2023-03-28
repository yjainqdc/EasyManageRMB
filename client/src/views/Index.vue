<template>
    <div class="index">
        <HeadNav class="head"></HeadNav>
        <LeftMenu></LeftMenu>
        <router-view class="other"></router-view>
    </div>
</template>

<script>
    import { useStore } from "vuex"
    import HeadNav from "../components/HeadNav"
    import LeftMenu from '../components/LeftMenu'
    export default{
        name:"index",
        setup() {
            const store = useStore()
            // console.log(store)
            return { store }
        },
        components:{
            HeadNav,
            LeftMenu
        }
    }
</script>

<style scoped>
    .index{
        height: 980px;
        width: 100%;
        overflow: hidden;
    }
    .head{
        position: fixed;/*固定位置*/
		top:0;
		z-index:9999;/*设置优先级显示，保证不会被覆盖*/
    }
    .other{
        margin-top: 70px;
        margin-left: 180px;
    }
</style>