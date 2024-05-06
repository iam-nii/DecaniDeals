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

export const deleteListing = async (req,res, next)=>{
    var isbag = false;
    var isfilm = false;

    var listing = await filmProductionListing.findById(req.params.id);
    if(!listing){
        listing = await bagProductionListing.findById(req.params.id);
        if(!listing){
            return next(errorHandler(404, 'Equipment listing not found'));     
        }else{
            isbag = true;
        }            
    }else{
        isfilm = true;
    }
    if(req.user.id !== listing.userRef){
        return next(errorHandler(401, 'You can only delete your own equipment listings'))
    }
    try {
        if(isbag){
            await bagProductionListing.findByIdAndDelete(req.params.id);
            res.status(200).json('Equipment listing deleted!');
        }
        if(isfilm){
            await filmProductionListing.findByIdAndDelete(req.params.id);
            res.status(200).json('Equipment listing deleted!');
        }
        
    } catch (error) {
        next(error);
    }
}