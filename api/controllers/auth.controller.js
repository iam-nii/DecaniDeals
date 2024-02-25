import User from '../models/user.model.js'
import bcrypt from 'bcryptjs';

export const signup = async (req, res,next)=> {

    const {username,email,password} = req.body;

    const hashedPassword = bcrypt.hashSync(password,10); // 10 is the salt round number

    const newUser = new User({ 
        username:username,
        email:email,
        password:hashedPassword,
    });

    await newUser.save()
    .then(()=>{
        res.send("User created successfully");
    })
    .catch((err)=>{
        next(err);
    })

      
}