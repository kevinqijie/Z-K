const express = require('express');
const router = express.Router();
const User = require('../../modules/users');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const passport = require('passport')





//$route 请求方式 Get 路径'api/test'

// router.get('/test', (req, res) => {
//     // console.log(req.body.email)
//     res.send({
//         msg: 'login works'
//     })
//     // console.log(res)
// })


//注册接口
router.post('/register', (req, res) => {
    // console.log(req.body)
    //    res.send(req.body.email)
    // res.header("Access-Control-Allow-Origin", "*")
    //查询表 User
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                return res.status(330).json({
                    msg: 0,
                    message: '邮箱已经被注册'
                })
            } else {
                //头像模块 s 状态码 r 格式 d 错误 'mm' 默认
                const avatar = gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mm' });

                //实例一个模型 并赋值
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password,
                    identity: req.body.identity
                })


                //密码加密
                //依赖模块 bcrypt
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(newUser.password, salt, function (err, hash) {
                        // Store hash in your password DB.
                        console.log(newUser.password)
                        if (err) { res.json({

                            msg : 0,
                            message : '加密失败',
                            err 
                        })};

                        newUser.password = hash;
                        // console.log(newUser)


                        //在数据库绘制
                        newUser.save()
                            .then(user => {
                                res.json({
                                    msg: '1',
                                    message: '注册成功'
                                })
                            })
                            .catch(err => { res.json({
                                msg : 0,
                                message : '注册失败'
                            }) })
                    });
                });

                // console.log(newUser)


            }



            // res.send(user)
        })


})

// GET 'api/login'
// jwt passport 返回token

router.post('/login', (req, res) => {
    //    res.send({
    //        msg : '0',
    //        data : req.data
    //    })
    const email = req.body.email;
    const password = req.body.password;
    // console.log(email, password)

    //  console.log(email,password,req.query)
    //User.findOne('item') 
    User.findOne({ email  })

        .then(user => {
            if (!user) {
                return res.status(404).json({
                    msg: '0',
                    message: '用户不存在！'
                })
            }

            //要检查密码 bcrypt
            bcrypt.compare(password, user.password)
                .then(isPasswrod => {
                    if (isPasswrod) {
                        const rule = {
                            id: user.id,
                            name: user.name,
                            avatar: user.avatar,
                            identity: user.identity
                        }
                        // 规则 rule  加密名字 secret   过期时间expiresIn:3600  回调()=>{}
                        jwt.sign(rule, 'secret', { expiresIn: 3600 }, (err, token) => {
                            if (err) throw err;
                            res.json({
                                msg: "1",
                                token: "Bearer " + token,
                                message: '登陆成功'
                            })
                        })

                    } else {
                        return res.status(400).json({
                            msg: '0',
                            message: '密码错误！'
                        })
                    }
                })
        })
})

// $route GET api/current
//return user 返回用户信息
//@access Private 私密请求
// passport.authenticate('jwt',{session:false}) 验证路由及接口中的token
// 请求携带token 
//获取个人信息接口 @前端可自行解析token
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    // res.json({msg : '0'})
    //  console.log(req,1)
    res.json({
        msg: '0',
        data: {
            id: req.user.id,
            name: req.user.name,
            eamil: req.user.email,
            identity: req.user.identity
        }
    })
})

module.exports = router
