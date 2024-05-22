import express from 'express';
import { createListing, deleteListing , updateListing, getListing } from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create',verifyToken, createListing);
router.get('/get/:id', getListing);
router.post('/update/:id',verifyToken, updateListing);
router.delete('/delete/:id',verifyToken, deleteListing);


export default router;