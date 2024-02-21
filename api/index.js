import express from 'express';
import mongoose from 'mongoose';
import pkg from 'pg';
import 'dotenv/config'

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log(("connected to mongodb!")))
.catch((err)=>console.log(err));
// const client = Client({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'decanidealsdb',
//     password: 'root',
//     port: 3001,
//   })

// const {Client} = pkg;

const app = express();
const PORT = 3000;

// const conn = mongoose.connection(); 

// conn.open('open',()=>{
//     console.log('connection successfully established');
// })
// (async()=>{
//     const db = new Client({
//         user: process.env.USER,
//         host: process.env.HOST,
//         database: process.env.DATABASE,
//         password: process.env.PASSWORD,
//         port: process.env.PORT
//     })  

//     await db.connect((err)=>{
//         console.log("connecting to db...")
//         if(err){
//             console.log("Connection error:", err.stack);
//         }else{
//             console.log('connected');
//         }
//     })
// })


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});