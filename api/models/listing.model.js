import mongoose from 'mongoose';

const filmProductionSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        address:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        productionRate:{
            type: Number,
            required:true
        },
        filmThickness:{
            type: Number,
            required:true
        },  
        imageUrls:{
            type:Array,
            required:true
        },
        userRef:{
            type:String,
            required:true
        }     
    },{timestamps: true}
);
const bagProductionSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        address:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        productionRate:{
            type: Number,
            required:true
        },
        rubberWidth:{
            type: Number,
            required:true,
        }, 
        rubberDepth:{
            type:Number,
            required:true
        },
        imageUrls:{
            type:Array,
            required:true
        },
        userRef:{
            type:String,
            required:true
        }
    },{timestamps: true}
);
const bagProductionListing = mongoose.model('bagProductionListing',bagProductionSchema);
const filmProductionListing = mongoose.model('filmProductionListing',filmProductionSchema);

export {bagProductionListing, filmProductionListing};