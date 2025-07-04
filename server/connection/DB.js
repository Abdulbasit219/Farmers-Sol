import mongoose from "mongoose";

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.DB);
        console.log(`Successfully connected to database ${conn.connection.host}`)
    }catch(err){
        console.log(`Error connecting to database ${err}`)
    }
} 

export default connectDB