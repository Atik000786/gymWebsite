const express=require("express");
const path=require("path");
const port=8080;
const mongoose=require("mongoose");
const bodyparser=require("body-parser");
const hostname="localhost";
const app=express();
// make static file.
app.use("/static",express.static("static"));
// set veiws engin as pug.
app.set("views engin","pug");
// set path for directory.
app.set("views", path.join(__dirname,"views"));
// url use for sending output.
app.use(express.urlencoded());
// use mongoose as json
app.use(bodyparser.json());
// api requests.
app.get("/",(req,res)=>{
    const params={};
    res.status(200).render("Home.pug",params);
});
app.get("/About",(req,res)=>{
    const params={};
    res.status(200).render("About.pug",params);
});
app.get("/Services",(req,res)=>{
    const params={};
    res.status(200).render("Services.pug",params);
});
app.get("/contact",(req,res)=>{
    const params={};
    res.status(200).render("Contact.pug",params);
});
var contactSchema=new mongoose.Schema({
    name:String,
    age:String,
    gender:String,
    Address:String,
    Email:String,
    concern:String
});
var contactModel=new mongoose.model("contactModel",contactSchema);
app.post("/Contact",(req,res)=>{
    var myData=new contactModel(req.body);
    myData.save().then(()=>{
        res.send("data is save in database");
    }).catch((err)=>{
        res.status(401).send(err);
    });
});
mongoose.connect("mongodb://localhost:27017/contactsDB").then(()=>{
    console.log("connect with mongodb.....");
}).catch((err)=>{
     console.log(err); 
});
app.listen(port,hostname,()=>{
  console.log(`server is running at http://${hostname}:${port}`);
});