const express = require('express');
const router = express.Router();
const passport = require('../auth');
const User = require('../db/users');


router.post('/login',passport.authenticate('local', {
    successRedirect: '../lobby',
    failureRedirect: '/'
}));

router.get('/register', (request, response) => {
    response.render('users/register');
});

router.post('/register', (request, response, next) => {
    const { email, password, name } = request.body;
    console.log('register', password);
    User.create(email, password, name)
        .then(id => {
            request.login({ email, password}, error => {
                if (error) {
                    return next(error);
                } else {
                    return response.redirect('../lobby');
                }
            });
        })
        .catch(error => {
            console.log(error);
            response.redirect('/failbot');
        });
});

module.exports = router;