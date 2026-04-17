// env variables should be available first, so we need to load then on priority
// require('dotenv').config({path: './env'})
import dotenv from "dotenv"
import connectDB from "./db/index.js";

dotenv.config({
    path: './env'
})

connectDB();













/* DB Connection with 1st approach with IIFE
import mongoose from "mongoose";
import { DB_NAME } from "./constants";
import express from "express";
const app = express()
( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("Error", () => {
            console.log("Application unable to talk with db", error);
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on http://localhost:${process.env.PORT}`);
        })
    } catch (error) {
        console.error("Error: ", error)
        throw err
    }
})()
*/