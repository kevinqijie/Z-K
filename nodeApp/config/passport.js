const JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
// const User = require('../modules/users');
const User = mongoose.model('Users')
// console.log(User)





const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "secret";


// 导出passport 对象
module.exports = passport =>{
    //进行token 验证
    // @jwt_payload token携带信息
    passport.use(new JwtStrategy(opts, (jwt_payload, done) =>{
        console.log(jwt_payload)
        User.findOne({ _id : jwt_payload.id})
       
        .then(user=>{
            if(user){

                //此处return 的值 req 接收
                return done(null,user)
                // console.log(done(null,user))
                // console.log(user)
            }
            // console.log('1')
            return done(null,false)
        })
        .catch(err=>{console.log(err)})
     }))
}