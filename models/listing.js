const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const listingSchema=new Schema({
    title:{
        type:String,
        required:true,
        
    },
    description:{
        type:String
    },
    image:{
        type:String,
        deafult: "https://unsplash.com/photos/town-square-with-church-tower-and-buildings-PzlLv1gmz9A",
        set:(v)=> v===""?"https://unsplash.com/photos/town-square-with-church-tower-and-buildings-PzlLv1gmz9A":v,
    },
    price:Number,
    location:String,
    country:String
});

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;