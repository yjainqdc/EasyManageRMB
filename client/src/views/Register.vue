<template>
    <div class="register">
        <section class = "form_container">
            <div class="manage_tip">
                <span class="title">皮薄馅大⚡Manage_System⚡</span>
                <el-form :model="registerUser" :rules="rules" ref="registerForm" label-width="80px" class="registerForm">
                    <el-form-item label="用户名" prop="name">
                        <el-input v-model="registerUser.name" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="registerUser.email" placeholder="请输入email"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="registerUser.password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="password2">
                        <el-input type="password" v-model="registerUser.password2" placeholder="请再次输入密码"></el-input>
                    </el-form-item>
                    <el-form-item label="选择身份" prop="identity">
                        <el-select v-model="registerUser.identity" placeholder="请选择身份">
                            <el-option label="管理员" value=true></el-option>
                            <el-option label="员工" value=false></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="submit_btn" @click="submitForm('registerForm')">注册</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </section>
    </div>
</template>

<script>
    export default{
        name:"register",
        components:{},
        data(){
            var validatePass2 = (rule, value, callback) => {
                if (value !== this.registerUser.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return{
                registerUser:{
                    name:"",
                    email:"",
                    password:"",
                    password2:"",
                    identity:false
                },
                rules:{
                    name:[
                        {required:true,massage:"用户名不能为空",trigger:"blur"},
                        {min:2,max:30,message:"长度在2到30之间",trigger:"blur"}
                    ],
                    email:[
                        {type:"email",required:true,massage:"邮箱格式不对",trigger:"blur"}
                    ],
                    password:[
                        {required:true,massage:"密码不能为空",trigger:"blur"},
                        {min:6,max:30,message:"长度在6到30之间",trigger:"blur"}
                    ],
                    password2:[
                        {required:true,massage:"确认密码不能为空",trigger:"blur"},
                        {min:6,max:30,message:"长度在6到30之间",trigger:"blur"},
                        {validator:validatePass2,trigger:"blur"}
                    ],
                    identity:[
                        {required:true,massage:"得选身份",trigger:"blur"}
                    ]
                }
            }
        },
        methods:{
            submitForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post("/api/users/register",this.registerUser)
                            .then(response =>{
                                //注册成功
                                this.$message({
                                    message:"账号注册成功，可以登陆啦",
                                    type:"success"
                                })
                                this.$router.push('/login');
                            })
                            .catch(err =>{
                                this.$message({
                                    message:"邮箱已存在"
                                })
                            })
                        
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        },
    }
</script>

<style scoped>
        .register {
        position: relative;
        width: 100%;
        height: 1080px;
        background: url(../assets/bg_register.jpg) no-repeat center center;
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
        .registerForm {
        margin-top: 20px;
        background-color: rgb(250, 250, 250);
        padding: 20px 40px 20px 20px;
        border-radius: 25px;
        box-shadow: 0px 10px 15px rgba(66, 64, 64, 0.8);
        }
        .submit_btn {
        width: 75%;
        }
</style>