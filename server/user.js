const express = require('express')
const utils = require('utility')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const _filter = {'pwd': 0, '__v': 0}

Router.get('/list', function (req, res) {
    // User.remove({}, function (e, d) {})
    User.find({}, function (err, doc) {
        return res.json(doc)
    })
})

Router.post('/login', function (req, res) {
    const {user, pwd} = req.body
    User.findOne({user, pwd: md5Pwd(pwd)}, {'pwd': 0}, function (err, doc) {
        if (!doc) {
            return res.json({code: 1, msg: 'Username or password not correct'})
        }
        res.cookie('userid', doc._id)
        return res.json({code: 0, data: doc})
    })
})

Router.post('/register', function (req, res) {
    const {user, pwd, type} = req.body
    User.findOne({user}, function (err, doc) {
        if (doc) {
            return res.json({code: 1, msg: 'Username exist'})
        }

        const userModel = new User({user, type, pwd: md5Pwd(pwd)})
        userModel.save(function (e, d) {
            if (e) {
                return res.json({code: 1, msg: 'Back-end wrong'})
            }
            const {user, type, _id} = d
            res.cookie('userid', _id)
            return res.json({code: 0, data: {user, type, _id}})
        })

        // User.create cannot get _id before the new user is generated, should use .save
        // User.create({user, type, pwd: md5Pwd(pwd)}, function (e, d) {
        //     if (e) {
        //         return res.json({code: 1, msg: 'Back-end wrong'})
        //     }
        //     return res.json({code: 0})
        // })
    })
})

Router.get('/info', function (req, res) {
    const {userid} = req.cookies
    if (!userid) {
        return res.json({code: 1})
    }
    User.findOne({_id: userid}, _filter, function (err, doc) {
        if (err) {
            return res.json({code: 1, msg: 'Back-end wrong'})
        }
        if (doc) {
            return res.json({code: 0, data: doc})
        }
    })
})

function md5Pwd (pwd) {
    const salt = 'shi_Ming_zhao_410&(!#@'
    return utils.md5(utils.md5(pwd + salt))
}

module.exports = Router
