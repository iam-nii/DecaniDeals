import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config'
import userRouter from './routes/user.route.js';

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log(("connected to mongodb!")))
.catch((err)=>console.log(err));


const app = express();
const PORT = 3000;

// Creating the routes
app.use('/api/user',userRouter);



app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});