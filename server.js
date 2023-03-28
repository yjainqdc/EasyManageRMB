const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();

//引入user.js
const users = require("./routes/api/user");
const profiles = require("./routes/api/profiles");


// mongoose.connect('mongodb://127.0.0.1:27017/test')
const db = require("./config/keys").mongoURI

//使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


mongoose.connect(db)
//验证是否连接上数据库了
mongoose
  .connect(db)
  .then(() => {
    console.log("MongoDB connected!");
  })
  .catch((err) => {
    console.log(err);
  });



//passport初始化
app.use(passport.initialize())
require("./config/passport")(passport);


app.get("/",(req,res) => {
    res.send("Hello World");
})

//使用routes
app.use("/api/users",users);
app.use("/api/profiles",profiles);

// const port = process.env.PORT || 5000;
const port = 5000;

app.listen(port,() =>{
    console.log(`Server running on port ${port}`);
})