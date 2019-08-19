const express = require('express');
const router = express.Router();
const Porfile = require('../../modules/Porfiles');

const passport = require('passport')





//$route 请求方式 post 路径'api/porfile'
//@desc 创建信息接口
router.post('/porfile', passport.authenticate('jwt', { session: false }), (req, res) => {
    // console.log(req.body.email)
    // res.send({
    //     msg: 'login works'
    // })
    // console.log(res)
    var newPorfile = new Porfile({
        describe: req.body.describe,
        income: req.body.income,
        expend: req.body.expend,
        cash: req.body.cash,
        Remarks: req.body.Remarks,
        name : req.user.name
    })
    newPorfile.save()
        .then(porfile => {
            //
            res.json({
                msg: '0',
                message: '添加成功'
            })
        })
        .catch(err => {
            res.json(err)
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
    }else{
        Porfile.find({name : req.user.name})
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
router.get('/allInformation/single/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Porfile.findOne({ _id: req.param.id })
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
        .then(pro => {
            res.json({
                msg: 1,
                message: `id:${req.body.id} 更改成功`
            })
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
