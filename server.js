//setting up express
express = require('express');
app = express();

//bringing in stuf to work with db
var bodyParser= require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())									//may not need this depending on how things go
var mongoose = require('mongoose');

//things I need to bring in for passport
var passport = require('passport');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');				//not sure if we need this
var session = require('express-session');

//so we can use ejs 
app.set('views', './views');
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));				//not sure if we need this

app.use(cookieParser());									//not sure if we need this
//app.use(bodyParser());

app.use(session({ secret: 'test' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//conecting to my moudels
var db = require('./models');

//conecting to db on server.js
mongoose.connect('mongodb://localhost/CANIBAL'); 
require('./config/passport')(passport);

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});

/****************
 *    ROUTES    *
 * for passport *
 ****************/

var routes = require('./config/routes');
app.use(routes);

/**********
 * ROUTES *
 **********/

//get all
app.get('/chat', function(req, res){

	db.chat.find(function(err, chats){
		if(err){
			return console.log("error at /chats get: " + err);
		}
		res.json(chats);
	});
});

//post
app.post('/chat', function(req, res){
	let newChat = new db.chat(req.body);

	newChat.save(function handleDBChatSaved(err, savedChat){
		//res.json(savedChat);
	});
});

//put
app.put('/chat/:id', function(req, res){
	let id = req.params.id;
	db.chat.findById( id, function(err, data){
		if(err){
			return console.log("err at /chats put" + err);
		}
		data.name = req.body.name;
		data.message = req.body.message;
		data.save(function(err, postChat){
			if(err){
				console.log( "err at /chats put data.save" + err);
			}
			res.json({postChat});
		});
	});
});

//delete
app.delete('/chat/:id', function(req, res){
	let id = req.params.id
	db.chat.findOneAndRemove( { _id: chatId }, function(err, deleteedChat){
		res.json(deletedChat);
	});
});


//seting up server
app.listen(3000, function(){
	console.log("up at 3000")
});



//use this api to date the chats for free points
// http://worldclockapi.com/api/jsonp/cet/now?callback=mycallback

//requirements
// https://github.com/den-materials/project-2
