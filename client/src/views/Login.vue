<template>
    <div class="login">
        <section class = "form_container">
            <div class="manage_tip">
                <span class="title">皮薄馅大⚡Manage_System⚡</span>
                <el-form :model="loginUser" :rules="rules" ref="loginForm" label-width="60px" class="loginForm">
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="loginUser.email" placeholder="请输入email"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="loginUser.password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="submit_btn" @click="submitForm('loginForm')">登录</el-button>
                    </el-form-item>
                    <div class="tiparea">
                        <p>还没有账号？现在<router-link to='/register'>注册</router-link></p>
                    </div>
                </el-form>
            </div>
        </section>
    </div>
</template>

<script>

    //token解析的包
    import jwt_decode from 'jwt-decode'
    import { useStore } from "vuex"
    // import store from './store'
    export default{
        name:"login",
        setup() {
            const store = useStore()
            return { store }
        },
        components:{},
        data(){
            return{
                loginUser:{
                    email:"",
                    password:"",
                },
                rules:{
                    email:[
                        {required:true,type:"email",required:true,massage:"邮箱格式不对",trigger:"blur"}
                    ],
                    password:[
                        {required:true,massage:"密码不能为空",trigger:"blur"},
                        {min:6,max:30,message:"长度在6到30之间",trigger:"blur"}
                    ]
                }
            }
        },
        methods:{
            submitForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post("/api/users/login",this.loginUser)
                            .then(res =>{
                                //拿到token
                                // console.log(res)
                                const{ token } = res.data;
                                //将token存储到本地存储上
                                localStorage.setItem('eleToken',token);
                                //解析一下token
                                const decode = jwt_decode(token);
                                console.log(decode);

                                //vue2旧写法
                                // this.$store.dispatch("setAutenticated",!this.isEmpty(decode));
                                // this.$store.dispatch("setUser",decode);
                                //vue3写法[重点之重点]setup函数的原理整理一下
                                console.log(this.store)
                                this.store.dispatch("setAuthenticated",!this.isEmpty(decode));
                                this.store.dispatch("setUser",decode);


                                this.$router.push('/index');
                            })
                        
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
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

<style scoped>
        .login {
        position: relative;
        width: 100%;
        height: 1080px;
        background: url(../assets/bg.jpg) no-repeat center center;
        background-size: 100% 100%;
        }
        .form_container {
        width: 370px;
        height: 210px;
        position: absolute;
        top: 10%;
        left: 38%;
        padding: 25px;
        border-radius: 5px;
        text-align: center;
        }
        .form_container .manage_tip .title {
        font-family: "Microsoft YaHei";
        font-weight: bold;
        font-size: 26px;
        color: rgb(46, 49, 25);
        }
        .loginForm {
        margin-top: 20px;
        background-color: rgb(250, 250, 250);
        padding: 20px 40px 20px 20px;
        border-radius: 25px;
        box-shadow: 0px 10px 15px rgba(66, 64, 64, 0.8);
        }
        .submit_btn {
        width: 75%;
        }
        .tiparea{
            text-align: right;
            font-size: 11px;
            color: black;
        }
        .tiparea p a{
            color: aquamarine;
        }
</style>