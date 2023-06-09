//profile
const express = require("express");
const router = express.Router();
const  jwt = require('jsonwebtoken');

//passport
const passport = require("passport")

//引入数据库
const Profile = require("../../models/Profiles")


//$router GET api/profiles/test
//@description 返回请求json数据
//@access public
router.get("/test",(req,res) =>{
    res.json({msg:"profile works"})
})

//$router POST api/profiles/add
//@description 创建接口信息
//@access Private
router.post("/add",passport.authenticate("jwt",{session:false}),(req,res)=>{
    const profileFields = {};
    if (req.body.type) profileFields.type = req.body.type;
    if (req.body.describe) profileFields.describe = req.body.describe;
    if (req.body.income) profileFields.income = req.body.income;
    if (req.body.expend) profileFields.expend = req.body.expend;
    if (req.body.cash) profileFields.cash = req.body.cash;
    if (req.body.remark) profileFields.remark = req.body.remark;
    if (req.body.data) profileFields.data = req.body.data;

    new Profile(profileFields).save().then(profile =>{
        res.json(profile)
    })
})

//$router POST api/profiles
//@description 获取所有信息
//@access Private
router.get("/",passport.authenticate("jwt",{session:false}),(req,res)=>{
    Profile.find()
        .then(profile =>{
            if(!profile){
                return res.status(404).json('没有任何内容');
            }
            res.json(profile);
        })
        .catch(err=>{res.status(404).json(err)})

})

//$router POST api/profiles/:id
//@description 获取单个信息
//@access Private
router.get("/:id",passport.authenticate("jwt",{session:false}),(req,res)=>{
    Profile.findOne({_id:req.params.id})
        .then(profile =>{
            if(!profile){
                return res.status(404).json('没有任何内容');
            }
            res.json(profile);
        })
        .catch(err=>{res.status(404).json(err)})

})


//$router POST api/profiles/edit
//@description 编辑接口信息
//@access Private
router.post("/edit/:id",passport.authenticate("jwt",{session:false}),(req,res)=>{
    const profileFields = {};
    if (req.body.type) profileFields.type = req.body.type;
    if (req.body.describe) profileFields.describe = req.body.describe;
    if (req.body.income) profileFields.income = req.body.income;
    if (req.body.expend) profileFields.expend = req.body.expend;
    if (req.body.cash) profileFields.cash = req.body.cash;
    if (req.body.remark) profileFields.remark = req.body.remark;
    if (req.body.data) profileFields.data = req.body.data;

    Profile.findOneAndUpdate(
        {_id:req.params.id},
        {$set:profileFields},
        {new:true}
    ).then(profile => res.json(profile))
    new Profile(profileFields).save().then(profile =>{
        res.json(profile => res.json(profile))
    })
})

//$router POST api/profiles/delete/:id
//@description 获取单个信息
//@access Private
router.delete("/delete/:id",passport.authenticate("jwt",{session:false}),(req,res)=>{
    Profile.findOneAndRemove({_id:req.params.id}).then(profile => {
        res.json(profile)
    })
    .catch(err=>{res.status(404).json("删除失败")})

})


module.exports = router