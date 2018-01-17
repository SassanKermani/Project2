//getting passport
var passport = require("passport");

//GET /signup
function getSignup(req, res){
	res.render('signup.ejs', {message: req.flash('signupMessage') } );
}

// POST /signup
function postSignup(req, res, next){
	var signupStrategy = passport.authenticate('local-signup', {
		successRedirect : '/logout' ,
		failureRedirect : '/signup',
		failureFlash : true
	});
	return signupStrategy(req, res, next);
}

// GET /login
function getLogin(request, response) { 
	response.render('login.ejs', {message: request.flash('loginMessage') });
}

// POST /login 
function postLogin(request, response, next){
	var loginStrategy = passport.authenticate('local-login', {
		successRedirect : '/homePage',
		failureRedirect : '/login',
		failureFlash : true
	});

	return loginStrategy(request, response, next)
}

//PUT /login


// GET /logout
function getLogout(request, response) {
	request.logout();
	response.redirect('/');
}


module.exports = {
  getLogin: getLogin,
  postLogin: postLogin ,
  getSignup: getSignup,
  postSignup: postSignup,
  getLogout: getLogout,
}