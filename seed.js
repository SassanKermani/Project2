//seting up 
var db = require('./models');

//chats seed for testing
var chats_list = [
	
	{
		name: "Dave",
		message: "sup"
	},
	{
		name: "Dug",
		message: "not much you"
	},
	{
		name: "Dave",
		message: "just working on stuff, you?"
	},
	{
		name: "Dug",
		message: "stuck on a but, i hate mongoose's documentation"
	},
	{
		name: "Dave",
		message: "ya its bad your boned"
	},
	{
		name: "Dug",
		message: "I'm going to be up all night on this arnt I?"
	},
	{
		name: "Dave",
		message: " yaaaaaaaa..... see ya tomorrow "
	}
];

// var user_list = [
// 	{ 
// 		"_id" : ObjectId("5a5f7962d27e5329be1bc6e9"), 
// 		"local" : { "password" : "$2a$10$fJsKoS9xuLLlzFNEaiuZ3eOruuoZE1rGXrBpGCD.mxQ6AzlQpncKq", 
// 		"email" : "DaveFreeman@gmail.com" 
// 	}
// ]

//putting it in the datta base and whiping anything that might have been there befor			chats
db.chat.remove({}, function(err, chats){
  if(err) {
    console.log('Error occurred in remove: ', err);
  } else {
    // create new records based on the array chats_list
    db.chat.create(chats_list, function(err, chats){
      if (err) { return console.log('err', err); }
      process.exit();
    });
  }
});


//putting it in the datta base and whiping anything that might have been there befor			users
 db.User.remove({}, function(err, User){
  if(err) {
    console.log('Error occurred in remove: ', err);
  } else {
    // create new records based on the array chats_list
    //db.User.create(user_list, function(err, User){
      //if (err) { return console.log('err', err); }
     //process.exit();
    //});
  }
});


