var express = require('express');
var User = require('../data/User')
var Live = require('../data/Live')
var router = express.Router();
var Model = require('../data/Model')

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/helloworld', function (req, res, next) {
    res.render('helloworld', {title: 'hello world'});
})

// router.get('/testscoket', function (req, res, next) {
//     res.render('testsocket', {title: '测试socketio'});
// })
router.get('/geturl', function (req, res, next) {
    var model = req.body.model;
    var buildVersion = req.body.buildVersion;
    console.log('get test datta model=' + model + ",buildVersion=" + buildVersion);
    var returnVar = Model[model.toLowerCase()];
    if (returnVar == '' || returnVar == 'undefined' || returnVar == undefined) {
        returnVar = Model.default;
    }
    console.log('return data =' + returnVar);
    res.end(returnVar);

});
router.post('/geturl', function (req, res, next) {
    var model = req.body.model;
    var buildVersion = req.body.buildVersion;
    console.log('get test datta model=' + model + ",buildVersion=" + buildVersion);
    var returnVar = Model[model.toLowerCase()];
    if (returnVar == '' || returnVar == 'undefined' || returnVar == undefined) {
        returnVar = Model['default'];
    }
    console.log('return data =' + returnVar);
    res.end(returnVar);
});


router.post('/testupload', function (req, res, next) {
    var str;
    try {
        str = JSON.stringify(req.body);
        console.log('get test datta =' + str.toString());
    } catch (error) {
        console.log(error)
    }


    var returnVar = "{'result':'failed'}";
    if (str != null && str != "") {
        returnVar = "{'result':'ok'}";
    }
    res.end(returnVar);
});

// router.post('/userlist', function (req, res, next) {
//     var model = req.body.model;
//     var buildVersion = req.body.buildVersion;
//     console.log('post test datta model=' + model + ",buildVersion=" + buildVersion);
//     res.end("{'url':'http://www.baidu.com'}");
// });
router.post('/userlist', function (req, res, next) {


    var name = req.body.name;
    var password = req.body.password;
    var objPage = {
        pageNumber: 1,//当前页
        pageCount: 0,//总共页数
        thisPageCount: 10,//每页多少
        maxPageCount: 10
    }

    if ('pageNumber' in req.body) {
        if (req.body.pageNumber != "") {
            objPage.pageNumber = req.body.pageNumber;
        }

    }

    if ('thisPageCount' in req.body) {
        if (req.body.thisPageCount != "") {
            objPage.thisPageCount = req.body.thisPageCount;
        }
    }
    var skipCount = (objPage.pageNumber * objPage.thisPageCount) - objPage.thisPageCount;

    if (name || password) {
        var query = {};
        query['name'] = new RegExp(name);
        query['password'] = new RegExp(password);

        User.count(query, function (err, totalCount) {
            if (err) {
                console.error(err.toString())
            } else {
                console.log('一共有' + totalCount + "条数据");
                objPage.pageCount = Math.ceil(totalCount / objPage.thisPageCount);
                User.find(query, function (err, users) {
                    if (err) {
                        console.error('查询错误')
                    } else {
                        res.render('userlist', {
                            title: '用户检索',
                            name: name,
                            password: password,
                            userlist: users,
                            page: objPage
                        });
                    }
                }).sort({_id: -1}).skip(skipCount).limit(objPage.thisPageCount);
            }
        });

        //
        // User.find(query, function (error, users) {
        //     if (error) {
        //         console.error('查询错误')
        //     } else {
        //         res.render('userlist', {title: '用户检索', name: name, password: password, userlist: users});
        //     }
        // }).sort({_id: -1}).skip(skipCount).limit(objPage.thisPageCount);
    } else {
        User.count(function (err, totalCount) {
            if (err) {
                console.error(err.toString())
            } else {
                console.log('一共有' + totalCount + "条数据");
                objPage.pageCount = Math.ceil(totalCount / objPage.thisPageCount);
                User.find(function (err, users) {
                    if (err) {
                        console.error('查询错误')
                    } else {
                        res.render('userlist', {title: '用户列表', name: "", password: "", userlist: users, page: objPage});
                    }
                }).sort({_id: -1}).skip(skipCount).limit(objPage.thisPageCount);
            }
        });
    }


})

router.get('/userlist', function (req, res, next) {
    var objPage = {
        pageNumber: 1,//当前页
        pageCount: 0,//总共页数
        thisPageCount: 10,//每页多少
        maxPageCount: 10
    }
    var skipCount = (objPage.pageNumber * objPage.thisPageCount) - objPage.thisPageCount;


    if ('page' in req.body) {
        objPage.pageNumber = req.body.page.pageNumber;
    }

    if ('page' in req.body) {
        objPage.thisPageCount = req.body.page.thisPageCount;
    }
    User.count(function (err, totalCount) {
        if (err) {
            console.error(err.toString())
        } else {
            console.log('一共有' + totalCount + "条数据");
            objPage.pageCount = Math.ceil(totalCount / objPage.thisPageCount);
            User.find(function (err, users) {
                if (err) {
                    console.error('查询错误')
                } else {
                    res.render('userlist', {title: '用户列表', name: "", password: "", userlist: users, page: objPage});
                }
            }).sort({_id: -1}).skip(skipCount).limit(objPage.thisPageCount);
        }
    });


});
router.post('/insert', function (req, res, next) {
    var name = req.body.name;

    var password = req.body.password;
    var entity = new User({name: name, password: password});
    entity.save();
    console.log('插入成功')
    return res.redirect('/userlist');
})


router.post('/delete', function (req, res, next) {
    var _id = req.body._id;

    User.remove({_id: _id}, function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log('删除成功')
            return res.redirect('/userlist');
        }
    });


})

router.post('/updateview', function (req, res, next) {
    var _id = req.body._id;
    User.find({_id: _id}, function (error, user) {
        if (error) {
            console.error('获取当前联系人失败')
        } else {
            console.log('跳转成功')
            res.render('updateview', {title: '修改信息', user: user});
        }
    })
})

router.post('/update', function (req, res, next) {
    var _id = req.body._id;
    var name = req.body.name;
    var password = req.body.password;
    User.update({_id: _id}, {$set: {name: name, password: password}}, function (error) {
        if (error) {
            console.error('获取当前联系人失败')
        } else {
            console.log('修改成功成功')
            res.redirect('/userlist')
        }
    });
})


module.exports = router;

// exports.userlist = function (db) {
//     return function (req, res) {
//         //表名称
//         var collection = db.get('mycoll');
//         collection.find({}, {}, function (e, docs) {
//             res.render('userlist', {"userlist": docs});
//         });
//     }
// }
