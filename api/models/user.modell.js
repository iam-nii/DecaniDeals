import mongoose from 'mongoose';


// Creating a schema
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required: true,
    }
},{timestamps:true}) //Telling mongodb to record the time a user is added to the database and the time it is updated

const User = mongoose.model('User', userSchema);

export default User;
