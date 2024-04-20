import User from '../models/user.model.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import {errorHandler} from '../utils/error.js'

export const signup = async (req, res,next)=> {

    const {username,email,password} = req.body;
    if (!username || !email ||!password||
        username == "" ||  email == "" ||  password == ""){
        return next(errorHandler(400,"All fields are required !"));
    }

    const hashedPassword = bcrypt.hashSync(password,10); // 10 is the salt round number

    const newUser = new User({ 
        username:username,
        email:email,    
        password:hashedPassword,
    });
    await newUser.save()
    res.status(201).json("User created successfully!");      
}
export const signin = async (req, res,next)=> {

    // Get the email and password from the signin form
    const {email,password} = req.body;
    try {
        // Search for the email provided in the database with the findone method
        const validUser = await User.findOne({email});
        if(!validUser) return next(errorHandler(404,'User not found!'));
        
        // Using the compareSync method, check if the password giiven is the same as the password stored with the provided email.
        const validPassword = bcrypt.compareSync(password,validUser.password);
        if(!validPassword) return next(errorHandler(401, 'Invalid credentials!'));

        // Create a token containing user id and secret key
        const token = jwt.sign({id:validUser._id},process.env.JWT_SECRET);

        // Destructuring the password from the rest of the data received
        const {password:pass, ...otherInfo} =  validUser._doc;

        res.cookie('access_token',token, {httpOnly:true}) // Sending the cookie
        .status(200) // send the code 200 if successful
        .json(otherInfo); // send the user details back
        
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export const google = async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = user._doc;
        res
          .cookie('access_token', token, { httpOnly: true })
          .status(200)
          .json(rest);
      } else {
        const generatedPassword =
          Math.random().toString(36).slice(-8) +
          Math.random().toString(36).slice(-8);
        const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
        const newUser = new User({
          username:
            req.body.name.split(' ').join('').toLowerCase() +
            Math.random().toString(36).slice(-4),
          email: req.body.email,
          password: hashedPassword,
          avatar: req.body.photo,
        });
        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = newUser._doc;
        res
          .cookie('access_token', token, { httpOnly: true })
          .status(200)
          .json(rest);
      }
    } catch (error) {
      next(error);
    }
};

export const signOut = async(req,res,next) =>{
  try {
    res.clearCookie('access_token')
    res.status(200).json('User has been signed out')
  } catch (error) {
    next(error)
  }
}