import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDB = async () => {
    try {
        // here we store the response after connection
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

        // just to check what connectionInstance gives us
        // console.log(connectionInstance);
        
        // this is done to know which mongodb instance we are connected to PROD, TESTING etc
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
        
    } catch (error) {
        console.log("MONGODB Connection Failed: ", error);
        process.exit(1) // this is exit the code similar to throw keyword
    }
}

export default connectDB;