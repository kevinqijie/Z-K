const mongoose = require('mongoose');
const  Schema = mongoose.Schema;


//创建 Schema 
// 数据库对象实例
//规定对象规则
const UserSchema = new Schema({
    name :{
        type : String,
        required : true
    },
    email :{
        type : String,
        required : true
    },
    password :{
        type : String,
        required : true
    },
    avatar :{
        type : String
        // required : true
    },
    date :{
        type : Date,
        default : Date.now
    },
    identity:{
     type:String,
     required : true
    }
})

//到处模型
module.exports = User = mongoose.model('Users',UserSchema)