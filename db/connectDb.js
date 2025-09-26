import mongoose from "mongoose";

const connectDb = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
    }

    catch(error){
        console.error(`Error while connecting to databse \n${error.message}`)
        process.exit(1)

    }
}

export default connectDb
