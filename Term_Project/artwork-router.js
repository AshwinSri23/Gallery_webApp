const mongoose = require("mongoose");
const Art = require("./models/ArtModel.js");
const express = require("express");
const { render } = require("pug");
const app = express();
let router = express.Router();
let info;

router.get('/',queryParser,findArtWorks);
//router.get('/artworkSearch',renderPage);





//Making a function to find the specific artworks indicated by the user in their form. 
async function findSpecificArtWorks(req,res,next){
    let startIndex = ((req.query.page-1)*5)
    let amount = 5;
    let searchQuery = req.body;
    
    //Finding a specific artwork based on the search query
    //console.log(req.body);
    console.log("FIndSpecificArtwork");
    await Art.find()
        .where("Title").equals(searchQuery.title)
        .skip(startIndex)
        .limit(amount)
        .exec()
        .then(results=>{
            //Storing the results
            data = results;
            console.log("Results:");
            console.log(data);

            if (!results) {
                res.status(404).send("Unknown ID");
                return;
            } else {
                console.log("Results:");
                console.log(res.artWorks);
                req.query.page = 1;
                res.status(200).render('pages/arts',{artworks: data,current: req.query.page});
                return;
            }
        })
        .catch(err=>{
            res.status(500).send();
            console.log(err);
        })

}



//Making a function to initialize the query parameters(Done once the user first click next for next page)
function queryParser(req,res,next){
    //finding the page property in the query object. 
    try {
		req.query.page = req.query.page || 1;
		req.query.page = Number(req.query.page);
		if (req.query.page < 1) {
			req.query.page = 1;
		}
	} catch {
		req.query.page = 1;
	}
    next();
}


async function findArtWorks(req,res,next){
    //Calculating where we start in the artwork collection
    //We calculate the number of elements that we need to skip
    let startIndex = ((req.query.page-1)*5)
    let amount = 5;
    console.log("FIndArtwork");
    console.log(req.query.title);
    
    //When do we want to do this?
    if(req.query.title === undefined){
        await Art.find()
        .skip(startIndex)
        .limit(amount)
        .exec()
        .then(results=>{
            //Storing the results
            data = results;
            info = "";
           
            //console.log(res.artWorks);
            if (!results) {
                res.status(404).send("Unknown ID");
                return;
            } else {
               
                res.status(200).render('pages/arts',{artworks: data,current: req.query.page,queryString:""});
                data = "";
                return;
            }
            next();
            return;
        })
        .catch(err=>{
            res.status(500).send();
            console.log(err);
        })
    }else{
        if(info!=req.query.title){
            info = req.query.title;
        }
        
        console.log(info);
        await Art.find()
        .where("Title").equals(info)
        .skip(startIndex)
        .limit(amount)
        .exec()
        .then(results=>{
            //Storing the results
            data = results;
            console.log("Results");
            console.log(results);
            //console.log(res.artWorks);
            if (!results) {
                res.status(404).send("Unknown ID");
                return;
            } else {
                
                res.status(200).render('pages/arts',{artworks: data,current: req.query.page,queryString: "title="+info});
                data = "";
                return;
            }
            next();
            return;
        })
        .catch(err=>{
            res.status(500).send();
            console.log(err);
        })
    }

    
    
}

function renderPage(req,res,next){
    res.format({
      'text/html': function(){
        //console.log(res.artWorks);
        res.render('pages/arts',{artworks: res.artWorks,current: req.query.page});
        //console.log("Updated page");
    },
      default: function(){res.status(406).send('Not Acceptable');}
    });
    next();
  };
module.exports = router;