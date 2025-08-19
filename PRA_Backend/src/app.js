let express=require("express");
let bodyParser=require("body-parser");
let db=require("../db.js");
require("dotenv").config();
const cookieParser = require("cookie-parser");
let router=require("./routes/routes.js");

let app=express();

let cors=require("cors");
app.use(cookieParser());
app.use(cors({
   origin: "http://localhost:5173", 
   credentials: true
}));


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

app.use("/",router);

app.set("views engine","ejs");

module.exports=app;