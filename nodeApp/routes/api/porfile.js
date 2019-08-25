const express = require('express');
const router = express.Router();
const Porfile = require('../../modules/Porfiles');
const User = require('../../modules/users')
const Products = require('../../modules/Products')

const passport = require('passport')





//$route 请求方式 post 路径'api/porfile'
//@desc 创建信息接口
router.post('/porfile', passport.authenticate('jwt', { session: false }), (req, res) => {
    // var newPorfile = new Porfile({

    //     product: req.body.product,
    //     expend: req.body.expend,
    //     describe: req.body.describe,
    //     balance: req.body.balance,
    //     name : req.user.name
    // })
    // newPorfile.save()
    //     .then(porfile => {
    //         //
    //         res.json({
    //             msg: '0',
    //             message: '添加成功'
    //         })
    //     })
    //     .catch(err => {
    //         res.json(err)
    //     })

    User.findOne({ _id: req.user._id })
        .then(use => {
            if (use) {
                var newUse = use
                newUse.Balance = newUse.Balance - req.body.expend
                User.findOneAndUpdate({ _id: req.user._id }, { $set: newUse }, { new: true })
                    .then(Use => {
                        if (Use) {
                            console.log(Use)
                            var newPorfile = new Porfile({

                                product: req.body.product,
                                expend: req.body.expend,
                                describe: req.body.describe,
                                balance: Use.Balance,
                                name: req.user.name,
                                productId : req.body.productId
                            })
                            newPorfile.save()
                                .then(porfile => {
                                   if(porfile){
                                       Products.findOne({_id:req.body.productId})
                                       .then(pds=>{
                                           if(pds){
                                               var newPds = pds
                                                 newPds.Quantity = newPds.Quantity - req.body.Quantity
                                                 Products.findOneAndUpdate({_id :req.body.productId},{$set:newPds},{new:true})
                                                 .then(Prod=>{
                                                     if(Prod){
                                                         res.json({
                                                             message:"购买成功"
                                                         })
                                                     }
                                                 })
                                           }
                                       })
                                   }
                                })
                                .catch(err => {
                                    res.json(err)
                                })
                        }
                    })
            }
        })
})

////$route 请求方式 get 路径'api/allInformation'
//获取全部信息
router.get('/allInformation', passport.authenticate('jwt', { session: false }), (req, res) => {
    if (req.user.identity == 'admin') {
        Porfile.find()
            .then(porfile => {
                // console.log(porfile)
                if (porfile.length !== 0) {
                    res.json({
                        msg: 1,
                        data: porfile
                    })
                } else {

                    return res.status(404).json({
                        msg: 0,
                        message: '没有对应的内容'
                    })
                }
            })
            .catch(err => { res.status(404).json(err) })
    } else {
        Porfile.find({ name: req.user.name })
            .then(porfile => {
                // console.log(porfile)
                if (porfile.length !== 0) {
                    res.json({
                        msg: 1,
                        data: porfile
                    })
                } else {

                    return res.status(404).json({
                        msg: 0,
                        message: '没有对应的内容'
                    })
                }
            })
            .catch(err => { res.status(404).json(err) })
    }




})


// //获取单个信息
router.get('/allInformation/single', passport.authenticate('jwt', { session: false }), (req, res) => {
    Porfile.findOne({ _id: req.query.id })
        .then(porfile => {
            // console.log(porfile)
            if (!porfile) {
                return res.status(404).json({
                    msg: 0,
                    message: '没有对应的内容'
                })
                // console.log(porfile)
            } else {
                res.json({
                    msg: 1,
                    data: porfile
                })
            }
        })
        .catch(err => {
            res.status(404).json(err)
        })
})


//$route 请求方式 post 路径'api/porfile/edit'
//@desc 更新信息
router.post('/porfile/edit', passport.authenticate('jwt', { session: false }), (req, res) => {

    var newPorfile = {
        describe: req.body.describe,
        income: req.body.income,
        expend: req.body.expend,
        cash: req.body.cash,
        Remarks: req.body.Remarks
    }
    Porfile.findOneAndUpdate({ _id: req.body.id }, { $set: newPorfile }, { new: true })
        .then(por => {
            if (por) {
                res.json({
                    msg: 1,
                    message: `id:${req.body.id} 更改成功`
                })
            } else {
                res.status('400').json({
                    msg: '0',
                    message: `id:${req.body.id}更新失败`
                })
            }
        })

})

//$route 请求方式 post 路径'api/porfile/delete'
//@desc 删除信息
router.delete('/porfile/delete', passport.authenticate('jwt', { session: false }), (req, res) => {


    Porfile.findOneAndRemove({ _id: req.body.id })
        .then(pro => {
            pro.save().then(porfile => res.json({
                msg: 1,
                message: '删除成功'
            }))
        })
        .catch(err => {
            res.json({
                msg: 0,
                message: '删除失败',
                err
            });
        });

})
module.exports = router;
