const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRouter = require('./user');
const model = require('./model');
const User = model.getModel('user');
const Chat = model.getModel('chat');

// Chat.remove({}, function(e, d) {});

// create app
const app = express();
// work with express
const server = require('http').Server(app);
const io = require('socket.io')(server);
io.on('connection', function(socket) {
  socket.on('sendmsg', function(data) {
    const { from, to, msg } = data;
    const chatid = [from, to].sort().join('_');
    Chat.create({ chatid, from, to, content: msg }, function(drr, doc) {
      io.emit('recvmsg', Object.assign({}, doc._doc));
    });
  });
});
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user', userRouter);
server.listen(9093, function() {
  console.log('Node app start at port 9093');
});
