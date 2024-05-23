import {
  bagProductionListing,
  filmProductionListing,
} from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    console.log(req.body.type);

    if (req.body.type === "bag") {
      const bagProduction = await bagProductionListing.create(req.body);
      return res.status(201).json(bagProduction);
    } else if (req.body.type == "film") {
      const filmProduction = await filmProductionListing.create(req.body);
      return res.status(201).json(filmProduction);
    } else {
      throw errorHandler(400, "Invalid listing type");
    }
  } catch (error) {
    next(error);
  }
};

export const showUserListing = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(
      errorHandler(401, "You can only view your own equipment listings")
    );

  try {
    console.log(req.body);
    const filmListings = await filmProductionListing.find({
      userRef: req.params.id,
    });
    const bagListings = await bagProductionListing.find({
      userRef: req.params.id,
    });
    res.status(200).json({ Film: filmListings, Bag: bagListings });
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  var isbag = false;
  var isfilm = false;

  var listing = await filmProductionListing.findById(req.params.id);
  if (!listing) {
    listing = await bagProductionListing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Equipment listing not found"));
    } else {
      isbag = true;
    }
  } else {
    isfilm = true;
  }
  if (req.user.id !== listing.userRef) {
    return next(
      errorHandler(401, "You can only delete your own equipment listings")
    );
  }
  try {
    if (isbag) {
      await bagProductionListing.findByIdAndDelete(req.params.id);
      res.status(200).json("Equipment listing deleted!");
    }
    if (isfilm) {
      await filmProductionListing.findByIdAndDelete(req.params.id);
      res.status(200).json("Equipment listing deleted!");
    }
  } catch (error) {
    next(error);
  }
};

// export const updateListing = async(req,res,next)=>{
//     var isbag = false;
//     var isfilm = false;

//     var listing = await filmProductionListing.findById(req.params.id);
//     if (!listing) {
//         listing = await bagProductionListing.findById(req.params.id);
//         if (!listing) {
//             return next(errorHandler(404, 'Equipment listing not found!'));
//         }else{
//             isbag=true;
//         }
//     }else{
//         isfilm=true;
//     }
//     if (req.user.id !== listing.userRef) {
//         return next(errorHandler(401, 'You can only update your own equipment listings!'));
//     }
//     // }
//     // if(!listing){
//     //     listing = await bagProductionListing.findById(req.params.id);
//     //     if(!listing){
//     //         return next(errorHandler(404, 'Equipment listing not found'));
//     //     }else{
//     //         isbag = true;
//     //     }
//     // }else{
//     //     isfilm = true;
//     // }
//     // if(req.user.id !== listing.userRef){
//     //     return next(errorHandler(401, 'You can only update your own equipment listings'))
//     // }

//     try {
//         if(isbag){
//             const updatedListing = await bagProductionListing.findByIdAndUpdate(
//                 req.params.id,
//                 req.body,
//                 {new:true}
//             );
//             res.status(200).json(updatedListing);
//         }
//         if(isfilm){
//             const updatedListing = await filmProductionListing.findByIdAndUpdate(
//                 req.params.id,
//                 req.body,
//                 {new:true}
//             );
//             res.status(200).json(updatedListing);
//         }

//     } catch (error) {
//         next(error);
//     }
// }

export const updateListing = async (req, res, next) => {
  var isbag = false;
  var isfilm = false;
  var listing = await filmProductionListing.findById(req.params.id);
  if (!listing) {
    listing = await bagProductionListing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Listing not found!"));
    } else {
      isbag = true;
    }
  } else {
    isfilm = true;
  }
  console.log(listing);
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only update your own listings!"));
  }
  try {
    if (isbag) {
      const updatedBagListing = await bagProductionListing.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json(updatedBagListing);
    }
    if (isfilm) {
      const updatedFilmListing = await filmProductionListing.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json(updatedFilmListing);
    }
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    let listing = await bagProductionListing.findById(req.params.id);
    if (!listing) {
      listing = await filmProductionListing.findById(req.params.id);
      if (!listing) {
        return next(errorHandler(404, "Listing not found!"));
      }
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try {
    console.log("Query Parameters: ", req.query);

    const limit = parseInt(req.query.limit, 10) || 9;
    const startIndex = parseInt(req.query.startIndex, 10) || 0;
    let type = req.query.type;
    let productionRate = parseInt(req.query.productionRate, 10);

    // Handle invalid or undefined productionRate
    if (isNaN(productionRate) || productionRate === "undefined" || productionRate === false) {
      productionRate = 0;
    }

    const searchTerm = req.query.searchTerm || " ";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";
    let listings = [];

    if (type === "bag") {
      listings = await bagProductionListing
        .find({
          name: { $regex: searchTerm, $options: 'i' },
          productionRate: { $gt: productionRate } // Add the greater than condition
        })
        .sort({ [sort]: order === 'desc' ? -1 : 1 })
        .limit(limit)
        .skip(startIndex);
    } else if (type === "film") {
      listings = await filmProductionListing
        .find({
          name: { $regex: searchTerm, $options: 'i' },
          productionRate: { $gt: productionRate } // Add the greater than condition
        })
        .sort({ [sort]: order === 'desc' ? -1 : 1 })
        .limit(limit)
        .skip(startIndex);
    } else {
      // Combined search for both "bag" and "film"
      let baglistings = await bagProductionListing
        .find({
          name: { $regex: searchTerm, $options: 'i' },
          productionRate: { $gt: productionRate } // Add the greater than condition
        })
        .sort({ [sort]: order === 'desc' ? -1 : 1 })
        .limit(limit)
        .skip(startIndex);

      let filmlistings = await filmProductionListing
        .find({
          name: { $regex: searchTerm, $options: 'i' },
          productionRate: { $gt: productionRate } // Add the greater than condition
        })
        .sort({ [sort]: order === 'desc' ? -1 : 1 })
        .limit(limit)
        .skip(startIndex);

      listings = [...baglistings, ...filmlistings];
    }

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
  