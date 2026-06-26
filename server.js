const express=require("express");
const mongoose=require("mongoose");
const Listing=require("./models/listing");

const path=require("path");

const app=express();


const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust_data";





async function main() {
    await mongoose.connect(MONGO_URL);
}

main()
.then(() => {
    console.log("DB connected");
})
.catch((err) => {
    console.log(err);
});


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended: true}));

app.get("/",(req,res)=>{
    res.send("Hi i am root");
})

app.get("/listings",async (req,res)=>{
   try{
    const allListings=await Listing.find();
    res.render("listings/index",{allListings});
    // res.status(200).json(data);
   }catch(err){
    res.status(500).json({
        message:err.message,
    })
   }
});


app.get("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/show",{listing});
})


// app.get("/testListing",async(req,res)=>{
//     let sampleListing=new Listing({
//         title:"My new villa",
//         description: "By the beach",
//         image:"",
//         price:2100,
//         location: "Calangute, goa",
//         country: "India",
//     })
//     await sampleListing.save();
//     console.log(sampleListing);
//     res.send("Sucess");

// });


app.listen(8080,()=>{
        console.log(`server is runing on ${8080}`);
})