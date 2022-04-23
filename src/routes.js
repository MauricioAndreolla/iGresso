const passport = require('passport');
const express = require('express');
const routes = express.Router();

const authenticationMiddleware = (req, res, next)=>{
    if(req.isAuthenticated()) return next();
    res.redirect('/Login');
}

const HomeController = require('./controller/homeController');
const LoginController = require('./controller/loginController');
const AdminController = require('./controller/adminController');

routes.get('/', HomeController.index);
routes.get('/Login', LoginController.login);
routes.post('/Login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/Login?fail=true'
}));
routes.get('/Logout', LoginController.logout);

routes.get('/Admin', AdminController.index);
routes.get('/Admin/SyncImages', AdminController.syncImages);

module.exports = routes;     