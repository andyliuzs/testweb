/**
 * Created by andyliu on 16-12-23.
 */
var mongoose = require("mongoose");
var myDb = require('../data/db/MyDb')
var MySchema = mongoose.Schema;
var userSchema = new MySchema({
    name: String,
    password: String
}, {_id: true})

var User = myDb.model('User', userSchema);

//倒出模型
module.exports = User