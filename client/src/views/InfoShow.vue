<template>
    <div class="infoshow">
        <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="8">
                <div class='user'>
                    <img :src="user.avatar" class='avatar'>
                </div>
            </el-col>
            <el-col :span="16">
                <div class='userinfo'>
                    <div class="userinfo">
                        <div class="user-item">
                            <el-icon><User /></el-icon>
                            <span>{{user.name}}</span>
                        </div>
                        <div class="user-item">
                            <el-icon><Operation /></el-icon>
                            <span>{{opt}}</span>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import { useStore } from "vuex"
    export default{
        name:"infoshow",
        setup(){
            const store = useStore();
        },
        computed:{
            user(){
                return this.$store.getters.user
            },
            opt(){
                if(this.user.identity){
                    return "管理员（高级权限）"
                }else{
                    return "用户体验者"
                }
            }
        }
    }
    
</script>



<style scoped>
    .infoshow {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    /* padding: 16px; */
    }
    .row-bg {
    width: 100%;
    height: 100%;
    }
    .user {
    text-align: center;
    position: relative;
    top: 30%;
    }
    .user img {
    width: 150px;
    border-radius: 50%;
    }
    .user span {
    display: block;
    text-align: center;
    margin-top: 20px;
    font-size: 20px;
    font-weight: bold;
    }
    .userinfo {
    height: 100%;
    background-color: #eee;
    }
    .user-item {
    position: relative;
    top: 30%;
    padding: 26px;
    font-size: 28px;
    color: #333;
    }
</style>