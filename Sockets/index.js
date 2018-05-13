const socketio = require('socket.io');
const passportSocketIo = require('passport.socketio');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('../auth');

const io = socketio();

io.use(
    passportSocketIo.authorize({
        key: 'connect.sid',
        secret: process.env.COOKIE_SECRET,
        store: new (require('connect-pg-simple')(session))(),
        passport,
        cookieParser
    })
);

io.on('connection', socket => {
    [require('./chat')].forEach(fn => fn(io));
});

module.exports = io;