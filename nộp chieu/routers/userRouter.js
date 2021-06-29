const express = require("express");
// const user = require("../services/user");
// var book = require("../services/book")
var router = express.Router();
var userControl = require("../services/user");
// var userConBook = require("../services/book")
const PAGE_SIRE = 1
var multer  = require('multer')
const bcrypt = require('bcrypt');
let checkAuth = require("../middlewares/auth")
const saltRounds = 10;
var jwt = require('jsonwebtoken');
const { json } = require("body-parser");
var {
    DELETE_SUCCESS,
    SUCCESSFULLY_ADDED_FEEDBACK,
    SERVER_ERROR,
    GET_LIST_USER,
    UPDATE_SUCCESS,
    CHECK_INPUT
  } = require('../config/error');
router.get("/page/:page/:pageSize",checkAuth.checkAuthor,(req, res) => {
    try {
        if(req.author) {
            console.log(req.author)
            let x = Number(req.params.page)
            let y = Number(req.params.pageSize)
            x = (x - 1) * y
            console.log(req.id)
            return userControl.getUser(req.id)

            .skip(x)
            .limit(y)
            .then((data) => {
            console.log(data,99)
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
router.get("/", checkAuth.checkAuthor,(req, res) => {
   
    try {
        if (req.author==0) {

            return userControl.getUserID(req.id)
                .then((data) => {
                    console.log(data,67)
                    res.json({
                        eror: false,
                        message: "hiển thị thành coong ",
                        value: [data]
                    })
                }).catch((err) => {
                    return res.json({
                        err: true,
                        message: "lỗi" + err,
                    })
                })
        }
        // if(req.author==1){
        return userControl.getUser()
            .then((data) => {
                console.log(data,82)
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
        // }

    } catch (error) {
        res.json(error)
    }
});        
router.get("/:id", checkAuth.checkAuthor, (req, res) => {
        var id = req.params.id;
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
});
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
                    var token = jwt.sign({ _id: user._id }, "nodemy", { expiresIn: "3d" });
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
 router.put("/:id",checkAuth.checkAuthor, (req, res) => {
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
router.delete("/:id",checkAuth.checkAuthor, (req, res) => {
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
router.delete("/delete/:email",checkAuth.checkAuthor, async(req, res) => {
            var email = req.params.email;
        let user =await   userControl
                .deleteUseremail(email)
                return user
                // .then((data) => {
                //     console.log(data)
                //     return res.json({
                //         error: false,
                //         messenge: "xóa thamhf công",
                //     });
                // })
                // .catch((err) => {
                //     return res.json({
                //         error: true,
                //         messenge: "no công" + err,
                //     });
                // });
})

var storage = multer.diskStorage({
            destination: function (req, file, cb) {
              cb(null, 'uploads')
            },
            filename: function (req, file, cb) {
              cb(null,  Date.now()+ '-' + file.originalname)
            }
          })
           
          var upload = multer({ storage: storage })
        
        
// router.post('/uploadfile', upload.single('myFile'), async(req, res, next) => {
//         var img = req.body
//         if (!file) {
//             const error = new Error('Please upload a file')
//             error.httpStatusCode = 400
//             return next(error)
//         }
//        if(res.file){
//         img.file = req.file
//         let  keynameing = [file.filename]
//          console.log(keynameing)
        
//         let dataimg =await  userControl.createUser(keynameing)
//         console(dataimg,270)
//         return dataimg
//        }
router.post('/uploadfile',upload.single('myFile'),async (req, res, next)=>{
        try {
          var data =req.body
          console.log('ok');
          console.log(req.file);
          return res.redirect('http://localhost:3000/BookCreation')
          return res.status(500).json({
              data:'thành công  '
          })
          return
          if(!data.name){
            return res.status(500).json(sendError(CHECK_INPUT))
          }
          if(req.file){
            data.file = req.file
            var dev = process.env.NODE_ENV === "production" ?  process.env.HOST_DOMAIN : process.env.HOST_DOMAIN_DEV 
            data.avatar = `${dev}/${req.file.destination}/${req.file.filename}`
          }
          var feedback = await feedbackModel.createUser(data)
          return res.status(200).json(sendSuccess(SUCCESSFULLY_ADDED_FEEDBACK, feedback))
        } catch (error) {
            return res.status(500).json(sendError(SERVER_ERROR))
        }
    })
// })
     
module.exports = router;