import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config'
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log(("connected to mongodb!")))
.catch((err)=>console.log(err));


const app = express();
app.use(express.json());  // middleware for parsing json
const PORT = 3000;

// Creating the routes
app.use('/api/user',userRouter);
app.use('/api/auth', authRouter);


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});