const express=require("express");
const app=express();
const port=8080;
app.set("view engine","ejs");
const path=require("path");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"/public/CSS")));
app.use(express.static(path.join(__dirname,"/public/JS")));
app.use(express.urlencoded({extended:true}));
const methodOverride=require("method-override");
app.use(methodOverride('_method'));

const Chat=require("./models/chat.js");
const mongoose=require("mongoose");
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

main().then(()=>{
    console.log("connected to database");
}).catch((err)=>{
    console.log(err);
})

app.listen(port,()=>{
    console.log(`app is listening on port ${port}`);
})

app.get("/chats",async(req,res)=>{
    let allChats=await Chat.find({});
    res.render("show.ejs",{allChats});
})

app.get("/chats/new",(req,res)=>{
    res.render("form.ejs");
})

app.post("/chats",async(req,res)=>{
    let {to,from,message}=req.body;
    let chat1=new Chat({to:to,from:from,message:message,created_at:new Date()});
    let newChat=await chat1.save();
    console.log(newChat);
    res.redirect("/chats");
})

app.get("/chats/:id/edit",async(req,res)=>{
    let {id}=req.params;
    let findedChat=await Chat.findById(id);
    res.render("update.ejs",{findedChat});
})

app.put("/chats/:id",async(req,res)=>{
    let {id}=req.params;
    let {message}=req.body;
    await Chat.findByIdAndUpdate(id,{message:message},{runValidators:true,new:true});
    res.redirect("/chats");
})

app.delete("/chats/:id",async(req,res)=>{
    let {id}=req.params;
    await Chat.findByIdAndDelete(id);
    res.redirect("/chats");
})