import express from "express";
import { signin, signup, google, signOut } from '../controllers/auth.controller.js';

const auth = express.Router();

auth.post('/signup',signup);
auth.post('/signin',signin);
auth.post('/google', google);
auth.get('/signout', signOut);

export default auth;