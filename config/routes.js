//getting express
var express = require('express');
var router = express.Router();

//getting body parser to parse psot
var bodyParser = require('body-parser');

//for manipulate POST methods
//var methodOverride = require('method-override');
var passport = require("passport");

//controllers
var usersController = require('../controllers/users');
var staticsController = require('../controllers/statics');
var chatsController = require('../controllers/chats');

//seeingif the user is authenticated
function authenticatedUser(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/');
};

//routes
router.route('/')
	.get(staticsController.home);

router.route('/signup')																//top bit is restriced bottom is not 
	.get(authenticatedUser, usersController.getSignup)
	.post(authenticatedUser, usersController.postSignup);
	
	// .get( usersController.getSignup)
	// .post( usersController.postSignup);

router.route('/login')
	.get(usersController.getLogin)
	.post(usersController.postLogin);

router.route('/logout')
	.get(usersController.getLogout);

router.route('/homePage')
	.get(authenticatedUser, chatsController.getHomePage);

//this is were you are going to put the rout to your messaging app!!!!!!

module.exports = router;



