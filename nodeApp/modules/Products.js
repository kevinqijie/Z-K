const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductsSchema = new Schema({
  name: {
    //产品名
    type: String,
    required: true
  },
  price: {
    //单价
    type: Number,
    required: true
  },
  Quantity: {
    //产品数量
    type: Number,
    required: true
  },
  describe: {
    //产品描述
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Products = mongoose.model('Products', ProductsSchema)