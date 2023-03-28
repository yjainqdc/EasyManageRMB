<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
    //token解析的包
    import jwt_decode from 'jwt-decode'
    import { useStore } from "vuex"
    export default{
        name:"app",
        setup() {
            const store = useStore()
            return { store }
        },
        components:{},
        created(){
          if(localStorage.eleToken){
              //解析一下token
              const decode = jwt_decode(localStorage.eleToken);     
              //存储到vuex
              this.store.dispatch("setAuthenticated",!this.isEmpty(decode));
              this.store.dispatch("setUser",decode);      
          }
        },


        methods:{
            isEmpty(value){
            return(
                value === undefined||
                value === null||
                (typeof value === "object" && Object.keys(value).length === 0)||
                (typeof value === "string" && value.trim().length === 0)
            );
        }
        },        
    }
</script>


<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
