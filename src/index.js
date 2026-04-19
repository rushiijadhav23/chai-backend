// env variables should be available first, so we need to load then on priority
// require('dotenv').config({path: './env'})
import dotenv from "dotenv"
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path: './env'
})

connectDB() // after completion of this methd it returns a promise
.then(() => {
    // before starting my server i want to listen for any other errors
    app.on("Error", () => {
        console.log("Application unable to talk with db", error);
        throw error
    })

    // now after the db is connected it now listens to our express app
    app.listen( process.env.PORT || 8000, () => {
        console.log(`Server is running at port: http://localhost/${process.env.PORT}`)
    })
})
.catch((err) => {
    console.log("MONGODB connection failed!!!", err);
})













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