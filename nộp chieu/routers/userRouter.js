const express = require("express");
// const user = require("../services/user");
// var book = require("../services/book")
var router = express.Router();
var userControl = require("../services/user");
// var userConBook = require("../services/book")
const PAGE_SIRE = 1

const bcrypt = require('bcrypt');
let checkAuth = require("../middlewares/auth")
const saltRounds = 10;
var jwt = require('jsonwebtoken');
const { json } = require("body-parser");
router.get("/page/:page/:pageSize",checkAuth.checkAuthor,(req, res) => {
    try {
        if(req.checkAuth) {
            let x = Number(req.params.page)
            let y = Number(req.params.pageSize)
            x = (x - 1) * y
            return user.getUserID(req.id)
            .skip(x)
            .limit(y)
            .then((data) => {
                res.json({
                    error: false,
                    messenge: "hiển thị chi tiết dữ liệu thành công",
                    value: data
                })
            }).catch((err) => {
                res.json({
                    error: true,
                    messenge: "lỗi tìm kiếm 2 :" + err
                })   
            });  
        }
        return null  
    } catch (error) {
        return res.json({
            err: true,
            message: "lỗi input 2 :" + error,
        })
    }
    
})
router.get("/decode", (req, res) => {
    try {
        var token = req.query.token || req.headers.authorization.split("Bearer")[1];
        var decode = jwt.verify(token, "nodemy")
        userControl.getDetailUser(decode._id)
            .then((result) => {
                console.log(result)
                res.json({
                    messenge: "giair max thanhf cong",
                    user: result
                })
            })
    } catch (error) {
        res.json(error)
    }
});
router.get("/:token", async function(req, res, next) {
    try {
        var token = req.params.token;
        var decode = jwt.verify(token, "nodemy");
        var handleUser = async() => {
            var data = await userControl.getUserID(decode._id)
            
            return data
        }
        var data = await handleUser();
        // .then((data) => {
        if (data.roles === "admin") {
            req.author = 1
            return next()
        }
        if (data.roles === "user") {
            req.author = 0
            req.id = data._id
            return next()
        }
        return res.json({
                error: true,
                messenge: "Bạn chưa đăng nhập",
            })
            // })
            // .catch((err) => {
            //     return res.json({
            //         error: true,
            //         messenge: err,
            //     })
            // })

    } catch (error) {
        return res.json({
            error: "lỗi",
            messenge: "lỗi 1:" + error,
        })
    }
}, function(req, res) {
    try {
        if (req.author) {

            return userControl.getUser()
                .then((data) => {
                    res.json({
                        eror: false,
                        message: "hiển thị thành coong ",
                        value: data
                    })
                }).catch((err) => {
                    return res.json({
                        err: true,
                        message: "lỗi" + err,
                    })
                })
        }
        return userControl.getUserID(req.id)
            .then((data) => {
               
                return res.json({
                    eror: false,
                    message: "hiển thị thành coong ",
                    value: data
                })
            }).catch((err) => {
                return res.json({
                    err: true,
                    message: "lỗi" + err,
                })
            })

    } catch (error) {
        res.json(131,error)
    }
});

router.get("/:id/:token", function(req, res, next) {
        try {
            var token = req.params.token;
            var decode = jwt.verify(token, "nodemy");
            userControl.getUserID(decode._id).then((user) => {
                if (user._id === req.params._id || user.roles === "admin") {
                    return next();
                }
            }).catch((err) => {
                 return res.json(err+"lỗi rồi")
            });
        } catch (error) {
            return res.json({
                err: "lỗi",
                message: "lỗi tìm kiếm" + error,
            })
        }
    }),
    function(req, res) {
        var id = req.params.id;
        console.log(id)
        userControl
            .getUserID(id)
            .then((data) => {
                if (data) {
                    return res.json({
                        error: false,
                        messenge: "hiển thị chi tiet dữ liệu thành công",
                        value: data,
                    });
                }
                return res.json("khong ton tai id dos");
            })
            .catch((err) => {
                return res.json(err);
            })
    };


    router.post("/sign-up", checkAuth.checkAuthEmail, function(req, res) {
        var username = req.body.username;
        var email = req.body.email;
        var password = req.body.password;
        var roles = req.body.roles
        console.log("bạn đang ở function sau");
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                // return console.log(hash)
                var obj = {
                    username: username,
                    email: email,
                    password: hash,
                    roles: roles
                }
                userControl
                    .createUser(obj)
                    .then((obj) => {
                        res.json({
                            error: false,
                            message: "đăng kí thành công ",
                            value: obj

                        })
                    }).catch((err) => {
                        res.json({
                            error: true,
                            message: "đăng kí không thành công i"
                        })
                    });
            })
        })

    }),




    router.post("/login", function(req, res) {
        var email = req.body.email;
        var password = req.body.password;
        userControl.checkEmail(email).then((user) => {
            if (!user) {
                return res.json({
                    message: "Nguời dùng không tồn tại",
                    error: true
                })
            }
            bcrypt.compare(password, user.password).then(function(result) {
                if (result) {
                    var token = jwt.sign({ _id: user._id }, "nodemy", { expiresIn: "1d" });
                    // giá trị mà mình sẽ sử dụng sau khi người dùng gửi lại mã token này
                    // privateKey: là thông tin khóa bí mật(khóa này không được tiết lộ ra ngoài)
                    // option: thông tin thuật toán mã hóa, ... thời gian tồn tại của token: expiresIn dưới dạng ms
                    return res.json({
                        message: "Đăng nhập thành công",
                        error: false,
                        user: user,
                        token: token,
                    })
                }

                return res.json({
                    message: "Đăng nhập không thành công",
                    error: true,
                })
            });
        }).catch((err) => {
            res.json({
                error: true,
                message: "không thể kết nối được server"
            })
        });
    }),
    router.put("/:id/:token", (req, res, next) => {
            try {
                var token = req.params.token;
                var decode = jwt.verify(token, "nodemy");
                userControl.getUserID(decode._id).then((user) => {

                    if (user._id == req.params.id || user.roles === "admin") {
                        return next();
                    }
                }).catch((err) => {

                });
            } catch (error) {
                return res.json({
                    err: "lỗi",
                    message: "lỗi tìm kiếm" + error,
                })
            }
        },
        function(req, res) {
            var body = {};
            var id = req.params.id;
            if (req.body.email) body.email = req.body.email;
            if (req.body.username) body.username = req.body.username;
            if (req.body.password) body.password = req.body.password;
            if (req.body.phone) body.phone = req.body.phone;
            if (req.body.school) body.school = req.body.school;
            userControl
                .existsId(id)
                .then((data) => {
                    if (data) {
                        console.log(data)
                        return userControl
                            .updateUser(id, body)
                            .then((data) => {
                                return res.json({
                                    error: false,
                                    messenge: "cập nhật dữ liệu thành công",
                                    value: data
                                })
                            })
                            .catch((err) => {
                                res.json("caapj nhaatj thaats baij");
                            });
                    }
                    res.json("khong co phan tu nay");
                })
                .catch((err) => {
                    res.json("khong co phan tu nay");
                });

        }),
    router.delete("/:id/:token", (req, res, next) => {
            try {
                var token = req.params.token;
                var decode = jwt.verify(token, "nodemy");
                console.log(token)
                userControl.getUserID(decode._id)
                    .then((user) => {
                        console.log(user)
                        if (user._id == req.params.id || user.roles === "admin") {
                            return next();
                        }
                    })
                    .catch((err) => {

                    });
            } catch (error) {
                res.json({
                    err: "lỗi",
                    message: "lỗi tìm kiếm" + error,
                })
            }

        },

        function(req, res) {

            var id = req.params.id;
            userControl
                .deleteUser(id)
                .then((data) => {
                    console.log(data)
                    return res.json({
                        error: false,
                        messenge: "xóa thamhf công",
                    });
                })
                .catch((err) => {
                    return res.json({
                        error: true,
                        messenge: err,
                    });
                });
        })


module.exports = router;