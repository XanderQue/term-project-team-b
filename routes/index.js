const express = require('express');
const router = express.Router();
const requireAuthentication = require('../auth/requireAuthentication');

router.get('/', function(request, response, next) {
    response.render('index');
});

router.get('/lobby', requireAuthentication,(request, response) => {
    const { user } = request;
    console.log('lobby', user);
    response.render('lobby', { user });
});

router.get('/gamePage', requireAuthentication, function(request, response, next) {
    response.render('gamePage');
});

router.get('/register', (request, response) => {
    response.render('register');
});

module.exports = router;