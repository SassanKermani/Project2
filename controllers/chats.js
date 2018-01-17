var db = require('../models');

function getHomePage(req, res){
	
	db.chat.find(function(err, chats){
		if(err){
			return console.log("error at /chats get: " + err);
		}
		//console.log(chats);
		res.render('homePage.ejs', {chats} );
	});
};


module.exports = {
	getHomePage: getHomePage
}