const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//创建 Schema 
// 数据库对象实例
//规定对象规则
const PorfileSchema = new Schema({
    name:{
        type:String,
        required :true
    },
    date: {
        type: Date,
        default: Date.now
    },
    describe: {
        type: String,
        // required: true
    },
    income: {
        type: String,
        required: true
    },
    expend: {
        type: String,
        required: true
    },
    cash: {
        type: String,
        required: true
    },
    Remarks : {
        type: String
        // required: true
    }
})

//导出模型
module.exports = Porfile = mongoose.model('Porfile', PorfileSchema)