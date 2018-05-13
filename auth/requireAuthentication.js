const requireAuthentication = (request, response, next) => {
    if (request.isAuthenticated()) {
        console.log("auth "+ request.user);
        return next();
    } else {
        console.log("Not auth "+ request.user);
        response.redirect('/');
    }
};

module.exports = requireAuthentication;
