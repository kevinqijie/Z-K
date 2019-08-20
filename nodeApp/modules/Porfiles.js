const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//创建 Schema 
// 数据库对象实例
//规定对象规则
const PorfileSchema = new Schema({
    //身份
    name:{
        type:String,
        required :true
    },
    //消费时间
    date: {
        type: Date,
        default: Date.now
    },
    //产品
    product: {
        type: String,
        // required: true
    },
    //支出
    expend: {
        type: String,
        required: true
    },
    //描述
    describe: {
        type: String,
        required: true
    },
    //余额
    balance: {
        type: String,
        required: true
    }
})

//导出模型
module.exports = Porfile = mongoose.model('Porfile', PorfileSchema)