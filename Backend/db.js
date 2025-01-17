const mongoose= require("mongoose");
require('dotenv').config();
// const url="mongodb://localhost:27017/FlatData";
const url=process.env.DB_URL;
mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}) 



const db=mongoose.connection;

db.on('connected',()=>{
    console.log("database is connected");
})

db.on('disconnected',()=>{
    console.log("database is disconnected");
})

db.on('error',()=>{
    console.log("error");
})

module.exports={
    db
}