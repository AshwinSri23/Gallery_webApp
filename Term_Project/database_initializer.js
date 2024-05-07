const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const Art = require("./models/ArtModel.js");
const Artist = require("./models/ArtistModel.js");

let artList = [];
let artNumber = 0;
let obj=[];

//Reading the gallery.json file
fs.readdir("./art", async function(err, files){
    for(let i = 0; i < files.length; i++){
        let vend = require("./art/" + files[i]);
        obj = JSON.parse(JSON.stringify(vend));
        //let newObj = {Title: obj.Title, Artist: obj.name, : obj.min_order, delivery_fee: obj.delivery_fee, supplies: obj.supplies};
        //console.log(obj);
        for(let i=0; i<(artList.length); i++){
            let a = new Art({
                Title:  obj[i]["Title"],
                Artist: obj[i]["Artist"],
                Year: obj[i]["Year"],
                Category: obj[i]["Category"],
                Medium: obj[i]["Medium"],
                Description: obj[i]["Description"],
                Poster: obj[i]["Poster"]
            });
    
            //console.log("Art:");
            //console.log(a);
            artList.push(a);
            

        }
    }
    console.log(artList);
   
});





//Adding the art pieces to the database

mongoose.connect('mongodb://127.0.0.1/gallery');
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async function() {

    await mongoose.connection.drop()
	console.log("Dropped database. Starting re-creation.");
    //console.log(artList);
    let addedProducts = 0;
    artList.forEach((a)=>{
        a.save()
            .then(result=>{
                addedProducts++;
                //console.log(result);
                if(addedProducts >= artList.length){
                    //console.log(artList);
                    console.log("All products added");
                   
                }

            })
            .catch(err=>{
                throw err;
            })
        //console.log(addedProducts);
    });
    //console.log(addedProducts);
   
    console.log("Connected to database");
});




