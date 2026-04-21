import mongoose from "mongoose";

const connectDB=async():Promise<void>=>{
    const uri=process.env.MONGO_URI || "mongodb://localhost:27017/synchro";
    try{
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    }
    catch(error){
        console.log("Failed to connect to MongoDB",error);
        process.exit(1);
    
    }
}

export default connectDB;