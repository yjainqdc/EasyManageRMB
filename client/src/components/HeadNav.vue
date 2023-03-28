<template>
    <header class="head-nav">
        <el-row>
            <el-col :span="18" class='logo-container'>
                <img src="../assets/logo.png" class='logo' alt="">
                <span class='title'>皮薄馅大管理系统</span>
            </el-col>
            <el-col :span="6" class="user">
                <div class="userinfo">
                    <!-- <img src="https://img2.baidu.com/it/u=90008525,3017751883&fm=253&fmt=auto&app=138&f=JPEG?w=384&h=384" class="avatar" alt=""> -->
                    <img :src="user.avatar" class="avatar" alt="">
                    <div class="welcome">
                        <p class="name comename">欢迎</p>
                        <p class="name avatarname">{{user.name}}</p>
                    </div>
                <span class='username'>
                        <!-- 下拉箭头 -->
                        <el-dropdown trigger='click' @command="setDialogInfo" class="el-dropdown">
                            <span class="el-dropdown-link">
                                        <el-icon class="el-icon--right" s><ArrowDown /></el-icon>
                            </span>
                            <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item command="info">个人信息</el-dropdown-item>
                                <el-dropdown-item command="logout">退出</el-dropdown-item>
                            </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                </span>
                </div>
            </el-col>
        </el-row>
    </header>
</template>

<script>
    import { useStore } from "vuex"

    export default{
        name:"index",
        setup() {
            const store = useStore()
            // console.log(store)
            return { store }
        },
        computed:{
            user(){
                return this.$store.getters.user;
            }
        },
        methods:{
            setDialogInfo(cmdItem){
                // console.log(cmdItem)
                switch(cmdItem){
                    case "info":
                        this.showInfoList();
                        break;
                    case "logout":
                        this.logout();
                        break;
                }
            },
            showInfoList(){
                this.$router.push("/infoshow");
            },
            logout(){
                //清除token
                localStorage.removeItem("eleToken");
                //设置vuex store
                this.$store.dispatch('clearCurrentState');
                //跳转
                this.$router.push('/login');
            }
        },
        components:{}
    }
</script>

<style scoped>
    .head-nav {
    width: 100%;
    height: 60px;
    min-width: 600px;
    padding: 5px;
    background: #524a4a;
    color: #fff;
    border-bottom: 1px solid #524a4a;
    }
    .logo-container {
    line-height: 60px;
    min-width: 400px;
    }
    .logo {
    height: 40px;
    width: 40px;
    margin-right: 5px;
    vertical-align: middle;
    display: inline-block;
    }
    .title {
    vertical-align: middle;
    font-size: 15px;
    font-family: "song";
    letter-spacing: 3px;
    }
    .user {
    line-height: 60px;
    text-align: right;
    float: right;
    padding-right: 10px;
    }
    .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%; 
    vertical-align: middle;
    display: inline-block;
    }
    .welcome {
    display: inline-block;
    width: auto;
    vertical-align: middle;
    padding: 0 5px;
    }
    .name {
    line-height: 20px;
    text-align: center;
    font-size: 14px;
    }
    .comename {
    font-size: 12px;
    }
    .avatarname {
    color: #409eff;
    font-weight: bolder;
    }
    .username {
    cursor: pointer;
    margin-right: 5px;
    }
    .el-dropdown {
    color: #fff;
    }
    .example-showcase .el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
    }
    .el-icon--right{
        margin-top: 30px;
        color:#fff;
    }
</style>