//getting mongoose
var mongoose = require('mongoose'); 

//conects to db
mongoose.connect('mongodb://localhost/CANIBAL');

//brings in and sends out models
module.exports.chat = require('./chat.js');
module.exports.User = require('./user.js')