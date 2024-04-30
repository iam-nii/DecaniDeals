import { bagProductionListing, filmProductionListing } from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";


export const createListing = async(req,res,next)=>{
    try {
        console.log(req.body.type);
        
        if (req.body.type === 'bag'){
            const bagProduction = await bagProductionListing.create(req.body);
            return  res.status(201).json(bagProduction);
        }
        else if (req.body.type == 'film'){
            const filmProduction = await filmProductionListing.create(req.body);
            return  res.status(201).json(filmProduction);
        }
        else{
            throw errorHandler(400,"Invalid listing type");
        }
        
    } catch (error) {
        next(error)
    }
}