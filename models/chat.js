//setting up mongoose and Schema
var mongoose = require ('mongoose')
	var Schema = mongoose.Schema;

//Schema for chat
var chatSchema = new Schema({
	name: String,
	message: String
});

//model for chat
var chat = mongoose.model('chat', chatSchema);

module.exports = chat;