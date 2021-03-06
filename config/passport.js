var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

module.exports = function(passport){
	
	passport.serializeUser(function(user, callback){
		callback(null, user.id);
	});

	passport.deserializeUser(function(id, callback){
		User.findById(id, function(err, user){
			callback(err, user);
		});
	});

	passport.use('local-login', new LocalStrategy({
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true
		}, 
		function(req, email, password, callback) {
			User.findOne({ 'local.email' : email }, function(err, user){
				
				if(err){
					return callback(err);
				};

				//no user found
				if(!user){
					return callback(null, false, req.flash('loginMessage', 'No user found.'));
				}

				//wrong password
				if(!user.validPassword(password)){
					return callback(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
				}

				return callback(null, user);

			})
	}));

	///////////////////////////////////////////////////////////////////////////////////

	

	//////////////////////////////////////////////////////////////////////////////////

	passport.use('local-signup', new LocalStrategy({
    	
    	usernameField : 'email',
    	passwordField : 'password',
    	passReqToCallback : true
	   	
   	},

   	function(req, email, password, callback) {

   		//find a user with this e-mail
   		User.findOne({ 'local.email' :  email }, function(err, user){
   			if(err) return callback(err);

   			//if theer alread is a user with this email
   			if(user){
   				return callback(null, false, req.flash('signupMessage', 'This email is already used.'));
   			}else{
   				//the is no user with this e-mail
   				//create a new user
   				var newUser = new User();
   				newUser.local.email = email;
   				newUser.local.password = newUser.encrypt(password);

   				console.log(" this shoud be the user name of the acout created email" + email)

   				newUser.save(function(err) {
	 				 if (err) throw err;
	  				return callback(null, newUser);
				});

   			};

   		});

   }));

};

