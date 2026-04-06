//this is for connection of mongoose

import mongoose from "mongoose";

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("mongodb connected");
    }
    catch(error){
        console.log("Failed to connect to mongodb:", error.message);
        process.exit(1);
    }
};
export default connectDB;