/**
 * Created by andyliu on 16-12-23.
 */
var mongoose = require("mongoose");
var myDb = require('../data/db/MyDb')
var MySchema = mongoose.Schema;
var liveSchema = new MySchema({
    name: String,
    role: Number,
    startTime: Number
}, {_id: true})
var Live = myDb.model('Live', liveSchema);
module.exports = Live