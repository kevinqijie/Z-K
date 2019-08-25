const express = require('express');
const router = express.Router();
// const Porfile = require('../../modules/Porfiles');
const products = require('../../modules/Products')

const passport = require('passport')

// router.get('/test',(req,res)=>{
//   res.send({
//     msg:'www'
//   })
// })


//新增产品
router.post('/SetProducts',passport.authenticate('jwt', { session: false }),(req,res)=>{
    var newsprodcts = new products({
        name : req.body.name,
        price :req.body.price,
        Quantity : req.body.Quantity, 
        describe :req.body.describe
    })

    newsprodcts.save().then(pr=>{
      res.json({
        msg:'1',
        message :'添加成功'
      })
    })
    .catch(err=>{
      res.json(err)
    })
})
// 获取全部产品信息
router.get('/getProducts',passport.authenticate('jwt', { session: false }),(req,res)=>{
  products.find().then(pro=>{
    // console.log(pro)
    if (pro) {
       res.json({
         msg:'1',
         data:pro
       })
    }
  })


})
//获取单个信息
router.get('/getOneProducts',passport.authenticate('jwt', { session: false }),(req,res)=>{
     products.findOne({_id:req.query.id}).then(pro=>{
      //  console.log(pro,req.query.id)
       if (pro) {
          res.json({
            msg:'1',
            data:pro
          })
       }
     })
 
 
})


//更新产品
router.post('/SetProducts/edit',passport.authenticate('jwt', { session: false }),(req,res)=>{
  var newsprodcts = {
      name : req.body.name,
      price :req.body.price,
      Quantity : req.body.Quantity, 
      describe :req.body.describe
  }
  products.findOneAndUpdate({ _id: req.body._id }, { $set: newsprodcts }, { new: true })
  
  .then(pro=>{
    
     if (pro) {
       res.json({
         msg:'1',
         message:'更新成功'
       })
     }
  
  })
})

router.delete('/deletepro',(req,res)=>{
        products.findOneAndRemove({_id : req.body.id})
        .then(pro=>{
          console.log(pro)
          res.json({
            msg:"1",
            message :"删除成功"
          })
        })
})

module.exports = router;
