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

export const showUserListing = async(req,res,next)=>{
    if(req.user.id !== req.params.id)
        return next(errorHandler(401, 'You can only view your own equipment listings'))

    try{
        console.log(req.body)
        const filmListings = await  filmProductionListing.find({userRef:req.params.id});
        const bagListings = await  bagProductionListing.find({userRef:req.params.id});
        res.status(200).json({"Film":filmListings,"Bag":bagListings});
    }catch(error){
        next(error) 
    }

}