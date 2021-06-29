// var userModel = require("../models/userModel")
var userbookExports = require("../models/userbook")

function getBook() {
    return userbookExports.find()
        // hàm hiển thị tất cả dữ liệu 
}
function getBookSearch(name) {
    return userbookExports.find({
        name:name
    })        // hàm hiển thị theo name
}
function getBookID(id) {
    // console.log(id)
    return userbookExports.findOne({
        _id: id
            // hàm hiển thi dữ liêu theo id
    }) 
}

function existsSignUp(data) {
    return userbookExports.exists({
        // hàm check xem email tồn tại hay ko
        email: data
    })
}

function existsLogin(data1, data2) {
    return userbookExports.exists({
        email: data1,
        password: data2
    })
}

function existsBookId(data) {
    return userbookExports.exists(data)
}

function createBook(data) {
    console.log(data)
    return userbookExports.create(data)
        // hàm tạo mới dữ liệu
}

function updateBook(data1, data2) {
    return userbookExports.updateOne({
        // hàm cập nhật dữ liệu theo id
        _id: data1
    }, data2)
}

function deleteBook(data) {
    console.log(data,50)
    return userbookExports.deleteOne({
        // hàm xóa theo id
        _id: data
    })
}
function deleteBookEmail(data) {  
    console.log(data)
    return userbookExports.deleteMany({
        // hàm xóa theo id
        email: data
    })
}
function getEmailBook(email) {
    console.log(56,email)
    return userbookExports.find({
        email: email
    })
}

module.exports = {
    getEmailBook:getEmailBook,
    getBook: getBook,
    getBookID: getBookID,
    createBook: createBook,
    updateBook: updateBook,
    deleteBook: deleteBook,
    existsBookId: existsBookId,
    existsSignUp: existsSignUp,
    existsLogin: existsLogin,
    deleteBookEmail:deleteBookEmail,
    getBookSearch
}