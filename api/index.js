import express from "express";
import mongoose, { Mongoose } from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

mongoose.connect(process.env.MONGO).then(() => {
    console.log('successfully connected');
})

const app = express();

app.listen(3000, () => {
    console.log('Server is running')
});

