const express = require('express');
const app = express();
//连接mongodb 的 依赖
const mongoose = require('mongoose');

const bodyParser = require('body-parser');

//引入路由
const users = require('./routes/api/user')
const porfile = require('./routes/api/porfile')
const Products = require('./routes/api/Products')


const passport = require('passport');
// import {router} from './routes/api/user'

// app.get('/',(req,res)=>{
//     res.send('hello world')
// })



//连接数据
const db = require('./config/keys').mongoURI;






//post 安装 body-parser
// 使用body-parser中间件
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));





mongoose.connect(db, { useNewUrlParser: true })
.then(res=>{
    console.log('连接成功')
    // console.log(db)
})
.catch(err=>{
    console.log(err)
})



//初始化passport
app.use(passport.initialize());

//require ('引入地址')(反向赋值)
require('./config/passport')(passport);





//设置路由根路径
app.use('/api',users);
app.use('/api',porfile);
app.use('/api',Products);

const port = process.env.PORT || 5000;



app.listen(port)

