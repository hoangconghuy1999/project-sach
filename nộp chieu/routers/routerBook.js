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
var multer  = require('multer');
const { query } = require("express");

router.get("/", checkAuth.checkAuthor,(req, res) =>{
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

router.get("/:id/",checkAuth.checkAuthor,(req,res)=>{
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

router.post("/", checkAuth.checkAuthor,checkAuth.checkBook, function(req, res) {
        // var token = jwt.sign({ _id: userConBook._id }, "nodemy", { expiresIn: "1d" });
    try{
        var email = req.email || req.body.email;
        var name = req.body.name;
        var img = req.body.img
        var obj = {
            name: name,
            email: email,
            img:img
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
                message: "đăng kí không thành công i"+ err
            })
        })
    }catch(err){
        return res.json({
            err:true,
            message:"looix " +err
        })
    }

})

router.put("/:id/",checkAuth.checkAuthor, (req, res) => {
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
router.delete("/",checkAuth.checkAuthor,(req,res)=>{
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
router.delete("/:id/",checkAuth.checkAuthor,(req,res)=>{
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
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null,  Date.now()+ '-' + file.originalname)
    }
  })
   
  var upload = multer({ storage: storage })

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
  var feedback = await feedbackModel.createBook(data)
  return res.status(200).json(sendSuccess(SUCCESSFULLY_ADDED_FEEDBACK, feedback))
} catch (error) {
    return res.status(500).json(sendError(SERVER_ERROR))
}
})
// router.get('/search', function (req, res){
//     // declare the query object to search elastic search and return only 200 results from the first result found.
//     // also match any data where the name is like the query string sent in
//     let body = {
//       size: 200,
//       from: 0,
//       query: {
//         match: {
//             name: req.query['t']
//         }
//       }
//     }
//     // perform the actual search passing in the index, the search query and the type
//     client.search({index:'scotch.io-tutorial',  body:body, type:'cities_list'})
//     .then(results => {
//       return  res.json(results)
//     //   res.send(results.hits.hits);
//     })
//     .catch(err=>{
//       console.log(err)
//       res.send([]);
//     });
//   })
router.get('/search/:name',function (req, res){
    try{
   var name =req.params.name;
   let inputObj={$regex:`.*${name}.*`}
   userConBook.getBookSearch(inputObj)
        .then((data) => {
            console.log(data,67)
            res.json({
                eror: false,
                message: "hiển thị thành công ",
                value: [data]
            })
        }).catch((err) => {
            return res.json({
                err: true,
                message: "lỗi" + err,
            })
        })
  
    }catch(err){
        return req.json({
           err:"lỗi",
           messenge:"lỗi không có sách đó"+err
    })
}
});
module.exports = router;