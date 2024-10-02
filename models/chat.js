const { create } = require("domain");
const mongoose=require("mongoose");
const { type } = require("os");

let chatSchema=new mongoose.Schema({
    from:{
        type:String,
        required:true,
    },
    to:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        maxLength:50,
    },
    created_at:{
        type:Date,
        required:true,
    },
    updated_at:{
        type:Date,
        default:new Date(),
    }
})

const Chat=mongoose.model("Chat",chatSchema);

module.exports=Chat;