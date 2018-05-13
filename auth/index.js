const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../db/users');

const lookup = (email, password, done) => {
    User.find(email)
        .then(({ id, hash, email }) => {
            console.log("found user : "+ email);
            if (bcrypt.compareSync(password, hash)) {
                console.log("Password match");
                done(null, { id, email });
            } else {
                console.log("Password did not match");
                done('Please verify your email and password', false);
            }
        })
        .catch(error => {
            console.log(error);
            done('Please verify your email and password', false);
        });
};

const strategy = new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    lookup
);

passport.serializeUser(User.serialize);
passport.deserializeUser(User.deserialize);
passport.use(strategy);

module.exports = passport;