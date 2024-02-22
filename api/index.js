import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config'

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log(("connected to mongodb!")))
.catch((err)=>console.log(err));


const app = express();
const PORT = 3000;


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});