const express = require('express')
const mongoose = require('mongoose')

// connect to mongo, use imooc
const DB_URL = 'mongodb://127.0.0.1:27017/imooc'
mongoose.connect(DB_URL)
mongoose.connection.on('connected', function(){
    console.log('mongo connect success')
})
// create user model
const User = mongoose.model('user', new mongoose.Schema({
    user: {type: String, require: true},
    age: {type: Number, require:true}
}))

// create a user's data
// User.create({
//     user: 'xiaoming',
//     age: 10
// }, function(err, doc){
//     if(!err){
//         console.log(doc)
//     }else{
//         console.log(err)
//     }
// })

// User.remove({}, function(err, doc){
//     console.log(doc)
// })

User.update({user: 'xiaoming'}, {'$set': {age: 28}}, function(err, doc){
    console.log(doc)
})

// create app
const app = express()
app.get('/', function(req, res){
    res.send('<h1>Hello World</h1>')
})
app.get('/data', function(req, res){
    User.findOne({user: 'xiaoming'}, function(err, doc){
        res.json(doc)
    })
})
app.listen(9093, function(){
    console.log('Node app start at port 9093')
})