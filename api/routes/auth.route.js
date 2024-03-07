import express from "express";
import { signin, signup, google } from '../controllers/auth.controller.js';

const auth = express.Router();

auth.post('/signup',signup);
auth.post('/signin',signin);
auth.post('/google', google);

export default auth;