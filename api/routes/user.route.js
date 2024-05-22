import express from 'express';
import { test,updateUser,deleteUser,getUser } from '../controllers/user.controllers.js';
import { verifyToken } from '../utils/verifyUser.js';
import {showUserListing} from '../controllers/listing.controller.js'

const router = express.Router();

router.get('/test', test);
router.post('/update/:id', verifyToken, updateUser)
router.delete('/delete/:id', verifyToken, deleteUser)
router.get('/listings/:id',verifyToken,showUserListing);
router.get('/:id',verifyToken, getUser)

export default router;