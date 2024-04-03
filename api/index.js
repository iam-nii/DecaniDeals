import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';

dotenv.config({path: path.join('./', '..', '.env')});

const app = express(); // Creating the express server
app.use(express.json());  // middleware for parsing json
app.use(cookieParser());
const PORT = 3001;

// Connecting to the mongo database
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log(("connected to mongodb!"))) 
.catch((err)=>console.log(err));

// Creating the routes
app.use('/api/user',userRouter);
app.use('/api/auth', authRouter);


// Create a middleware to handle errors
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,        
    });
});
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});