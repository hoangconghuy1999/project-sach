require('dotenv').config()
var express = require('express');
var app = express();
var path = require("path");
var bodyParser = require("body-parser")
var initRouter = require('./routers/index')
var logger = require("morgan");
const router = require('./routers/routerBook');
let rouerUser = require("./routers/userRouter")
var cors = require('cors')

// var upload = multer({ dest: 'uploads/' })
app.use(cors())
app.use(express.static("publics"))
app.use(express.static("uploads"))
    // app.use(express.static(__dirname + "/publics"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

initRouter(app);
app.listen(process.env.PORT, function() {
        console.log("ddang ket noi tai cong 3000");
    })
   