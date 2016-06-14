/**
 * Created by andyliu on 16-6-12.
 */

var mongoose = require("mongoose");

// 连接字符串格式为mongodb://主机/数据库名
var db = mongoose.createConnection('localhost', 'test');

db.on('error', console.error.bind(console, '连接错误'));
db.once('open', function () {
    console.log('连接成功')
    //在这里创建你的模式和模型

});
var MySchema = mongoose.Schema;
var userSchema = new MySchema({
    name: String,
    password: String
}, {_id: true})

var User = db.model('User', userSchema);

//倒出模型
module.exports = User

