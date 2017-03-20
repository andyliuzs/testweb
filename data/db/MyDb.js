/**
 * Created by andyliu on 16-6-12.
 */
var mongoose = require("mongoose");
// String
// Number
// Date
// Buffer
// Boolean
// Mixed
// ObjectId
// Array
// 连接字符串格式为mongodb://主机/数据库名
var MyDb = mongoose.createConnection('localhost', 'test');
MyDb.on('error', console.error.bind(console, '数据库连接错误'));
MyDb.once('open', function () {
    console.log('数据库连接成功')
    //在这里创建你的模式和模型
});
module.exports = MyDb;
