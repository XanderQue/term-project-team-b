const express = require('express');
const router = express.Router();
const passport = require('../auth');
const User = require('../db/users');


router.post('/login',(request,response,next)=>{
    console.log('request :', request.body);
    passport.authenticate('local', {
        successRedirect: '../lobby',
        failureRedirect: '/',
        failureFlash: true
    })(request,response,next);
});


router.get('/logout', (request, response) => {
    request.logout();
    response.redirect('../');

});

router.get('/register', (request, response) => {
    response.render('register');
});

router.post('/register', (request, response, next) => {
    const { email, password, name } = request.body;
    console.log('register', name);
        User.create(email, password, name)
            .then(id => {
                console.log("User created log in: ");
                request.login({email, password}, error => {
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