const mongoose=require("mongoose");
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

main().then(()=>{
    console.log("connected to database");
}).catch((err)=>{
    console.log(err);
})

const Chat=require("./models/chat.js");

let insertChat=[
    {
        from:"Aditya",
        to:"Raj",
        message:"Let's do coding",
        created_at:new Date(),
    },
    {
        from:"Bob",
        to:"Suzi",
        message:"Wake up early",
        created_at:new Date(),
    },
    {
        from:"Raj",
        to:"Nazim",
        message:"Go for a walk",
        created_at:new Date(),
    },
    {
        from:"Bob",
        to:"Adam",
        message:"Let's play chess",
        created_at:new Date(),
    },
    {
        from:"Avi",
        to:"Souvik",
        message:"Will you come college tomorrow",
        created_at:new Date(),
    },
    {
        from:"Sawar",
        to:"Suzan",
        message:"Hope you are doing well",
        created_at:new Date(),
    }
]

Chat.insertMany(insertChat);