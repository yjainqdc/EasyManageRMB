//login register
 const express = require("express");
 const router = express.Router();
 //密码加密第三方插件
 const bcrypt = require("bcrypt");
 //头像第三方库
 const gravatar = require('gravatar');
 const  jwt = require('jsonwebtoken');
 const keys = require("../../config/keys")

 //passport
 const passport = require("passport")

 //引入数据库
 const User = require("../../models/User")


 //$router GET api/users/test
 //@description 返回请求json数据
 //@access public
 router.get("/test",(req,res) =>{
     res.json({msg:"login works"})
 })


 //$router POST api/users/register
 //@description 发送json数据
 //@access public
 router.post("/register",(req,res) =>{
    //发送了json数据
    console.log(req.body);

    //查询数据库中是否拥有邮箱
    User.findOne({email:req.body.email})
        .then((user) => {
            if(user){
                return res.status(400).json({email:"邮箱已被注册！"})
            }else{
                const avatar = gravatar.url(req.body.email,{s:'200',r:'pg',d:'mm'})
                //整合一个User实例
                const newUser = new User({
                    name:req.body.name,
                    email:req.body.email,
                    avatar:avatar,
                    password:req.body.password,
                    identity:req.body.identity
                })
                //密码加密
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                                .then(user => res.json(user))
                                .catch(err => console.log(err))
                        // Store hash in your password DB.
                    });
                })
            }
        })
})

 //$router POST api/users/login
 //@description 返回token jwt passport
 //@access public
 router.post("/login",(req,res) =>{
    //发送了json数据
    console.log(req.body);
    const email = req.body.email
    const password = req.body.password
    User.findOne({email})
        .then(user => {
            //用户不存在
            if(!user){
                return res.status(404).json({email:"用户不存在！"})
            }
            //用户存在，密码匹配
            bcrypt.compare(password,user.password)
                    .then(isMatch => {
                        if(isMatch){
                            // res.json({msg:"seccess"})
                            //token
                            // jwt.sign("规则","加密名字","过期时间","箭头函数")
                            const rule = {
                                id:user.id,
                                name:user.name,
                                avatar:user.avatar,
                                identity:user.identity
                            }
                            jwt.sign(rule,keys.secretOrKey,{expiresIn:3600},(err,token) =>
                             {
                                if(err) throw err;
                                res.json({
                                    sucess:true,
                                    token:"Bearer " + token
                                })
                            })

                        }else{
                            return res.status(400).json({password:"密码错误！"})
                        }
                    })
        })


})


 //$router GET api/users/current
 //@description 返回current user
 //@access Private
// router.get("/currrent","验证token",(req,res)
router.get("/current",passport.authenticate("jwt",{session:false}),(req,res)=>{
    res.json({
        id:req.user.id,
        email:req.user.email,
        name:req.user.name,
        identity:req.user.identity
    })
})


module.exports = router