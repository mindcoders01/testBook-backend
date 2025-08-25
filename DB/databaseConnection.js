const mongoose = require('mongoose')
const db=process.env.MONGODB_URL

exports.connectDB =()=>{
    try{
       mongoose.connect(db);
       console.log("Database is connected")

    }catch(err){
        console.log("Error in Connecting to mongodb",err)
    }
}