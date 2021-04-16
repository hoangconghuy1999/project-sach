const express = require("express");
var userConBook = require("../services/book")
var user = require("../services/user")
var router = express.Router();
var checkAuth = require("../middlewares/auth")
const PAGE_SIRE = 1

const bcrypt = require('bcrypt');

const saltRounds = 10;
var jwt = require('jsonwebtoken');
const { json } = require("body-parser");
const { route } = require("./userRouter");

router.get("/:token", checkAuth.checkAuthor,(req, res) =>{
    try {
        if (req.author) {

            return userConBook.getBook()
                .then((data) => {
                    res.json({
                        eror: false,
                        message: "hiển thị thành coong ",
                        value: data
                        
                    })
                   
                }).catch((err) => {
                    return res.json({
                        err: true,
                        message: "lỗi v" + err,
                    })
                });
        }
        return userConBook. getEmailBook(req.email)
              
            .then((data) => {
            // console.log(id)
            console.log(68,data)
                return res.json({
                   eror: false,
                   message: "hiển thị thành coong ",
                   value: data
                  
                })
            
            }).catch((err) => {
                return res.json({
                    err: true,
                    message: "lỗi x" + err,
                })
            })
     
        // }) 
    } catch (err) {

    }
});

// router.get("/:id/:token", function(req, res, next) {
//             try {
//                 var token = req.params.token;
//                 var decode = jwt.verify(token, "nodemy");
//                 user.getUserID(decode._id).then((user) => {
//                     if (user._id == req.params._id || user.roles === "admin") {                       
//                         return next();
//                     }
//                 }).catch((err) => {
//                     return req.json({
//                         err:"lỗi",
//                         messenge:"lỗi tìm kiếm "+err
//                     })

//                 });
//             } catch (error) {
//                 return res.json({
//                     err: "lỗi",
//                     message: "lỗi tìm kiếm" + error,
//                 })
//             }
// }),
//         function(req, res) {
//             var id = req.params.id;
//             userConBook
//             .getBookID(id)
//             .then((data) => {               
//                 if (data) {
//                     return res.json({
//                         error: false,
//                         messenge: "hiển thị chi tiet dữ liệu thành công",
//                         value: data,
//                     });
//                 }
//                 return res.json("khong ton tai id dos");
//             })
//             .catch((err) => {
//                 return res.json(err);
//             })
//         };

router.get("/:id/:token",checkAuth.checkAuthor,(req,res)=>{
      try{
           var id =req.params.id;
           userConBook
           .getBookID(id)
           .then((data) => {
              
               if (data) {
                   console.log(data,85)
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
           });
      }catch(err){
           return req.json({
               err:"lỗi",
               messenge:"lỗi tìm kiếm"+err
           })
      }
})

router.post("/:token", checkAuth.checkAuthor,checkAuth.checkBook, function(req, res) {
        // var token = jwt.sign({ _id: userConBook._id }, "nodemy", { expiresIn: "1d" });
    try{
        var email = req.email || req.body.email;
        var name = req.body.name;
        var obj = {
            name: name,
            email: email
        }
        
        
        userConBook
            .createBook(obj)

        .then((data) => {
            return res.json({
                error: false,
                message: "đăng kí thành công ",
                value: data,
                // token: token,
               

            })
        }).catch((err) => {
            return res.json({
                err: true,
                message: "đăng kí không thành công i"
            })
        })
    }catch(err){
        return res.json({
            err:true,
            message:"looix " +err
        })
    }

})

router.put("/:id/:token",checkAuth.checkAuthor, (req, res) => {
    try {
        var body = {};
        var id = req.params.id;       
        if (req.body.name) body.name = req.body.name;
        if (req.body.email) body.email = req.body.email;
        // userConBook
        //     .existsBookId(id)           
        //     .then((data) => {
        //         if (data) {
        //             console.log(data)
        //             return 
                    userConBook
                        .updateBook(id, body)
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
                // }
            //     res.json("khong co phan tu nay 1");
            // })
            // .catch((err) => {
            //     res.json("khong co phan tu nay 2");
            // });
    } catch (error) {
        return res.json({
            err: "lỗi",
            message: "lỗi tìm kiếm" + error,
        })
    }
});

// xóa tất cả book theo email bằng token
router.delete("/:token",checkAuth.checkAuthor,(req,res)=>{
    try{
       var email = req.body.email
        userConBook.deleteBookEmail(email)
        .then((data)=>{
             return res.json({
               error: false,
             message: "xóa book thành công"
            })
        }).catch((err) => {
            return res.json({
                error: true,
                message: "lỗi xóa book không thành công là :" + err
            })
        });
    }catch (error) {
        return res.json({
            error: true,
            message: "lỗi input :" + error
        })
    }
})
router.delete("/:id/:token",checkAuth.checkAuthor,(req,res)=>{
    try{
       var id = req.params.id
        userConBook.deleteBook(id)
        .then((data)=>{
             return res.json({
               error: false,
             message: "xóa book thành công"
            })
        }).catch((err) => {
            return res.json({
                error: true,
                message: "lỗi xóa book không thành công là :" + err
            })
        });
    }catch (error) {
        return res.json({
            error: true,
            message: "lỗi input :" + error
        })
    }
})

module.exports = router;