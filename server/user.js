const express = require('express')
const utils = require('utility')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')

Router.get('/list', function(req, res){
    // User.remove({}, function (e, d) {})
    User.find({}, function(err, doc){
        return res.json(doc)
    })
})

Router.post('/login', function (req, res) {
    const {user, pwd} = req.body
    User.findOne({user, pwd: md5Pwd(pwd)}, {'pwd': 0}, function(err, doc){
        if(!doc){
            return res.json({code: 1, msg: 'Username or password not correct'})
        }
        return res.json({code: 0, data: doc})
    })
})

Router.post('/register', function(req, res){
    const {user, pwd, type} = req.body
    User.findOne({user}, function (err, doc) {
        if(doc){
            return res.json({code: 1, msg: 'Username exist'})
        }
        User.create({user, type, pwd: md5Pwd(pwd)}, function(e, d){
            if(e) {
                return res.json({code: 1, msg: 'Back-end wrong'})
            }
            return res.json({code: 0})
        })
    })
})

Router.get('/info', function (req, res) {
    return res.json({code: 1})
})

function md5Pwd(pwd){
    const salt = 'shi_Ming_zhao_410&(!#@'
    return utils.md5(utils.md5(pwd+salt))
}

module.exports = Router
