const mongoose = require("mongoose");
const Account = require("./models/AccountModel.js");
const express = require("express");
const app = express();
let router = express.Router();
//app.use(express.json());
//app.set('view engine', 'pug');
//app.use("/account/register/",express.static("public"));
router.get("/register",registrationPage);

router.post("/addAccount",addAccount);
router.post("/findAccount",findAccount);

function findAccount(req,res,next){
    let number = 0;
    res.format({
        'application/json': function(){
            let account = req.body;
           
            /*let account = new Account();  
            account.userName = req.body.username;
            account.passWord= req.body.password;*/
            console.log("Username:");
            console.log(account.username);
            console.log("Password:");
            console.log(account.password);
            Account.find()
                    .where("userName").equals(account.username)
                    .where("passWord").equals(account.password)
                    .exec()
                    .then(result=>{
                        console.log(result.length);
                        console.log(result);
                        number = result.length;
                        res.status(200).send(JSON.stringify(number));  
                    })
                    .catch(err=>{
                        throw err;
                    });  
        },
        default: function(){res.status(400).send('Bad Request');}
    });
    
}



function addAccount(req,res,next){
    res.format({
      'application/json': function(){
        //console.log(req.body);
        let account = new Account();  
        account.userName = req.body.username;
        account.passWord= req.body.password;
        Account.find()
            .where("userName").equals(account.userName)
            .exec()
            .then(result=>{
                if(result.length===0){
                    account.save()
                    .then(result=>{
                        //Checking if there exists a user with the same username
                        if(!result){
                            res.status(400).send('Bad Request');
                            return;
                        }
                    })
                    .catch(err=>{
                        throw err;
                    });
                }
            })
            .catch(err=>{
                throw err;
            });
        
        

        res.status(200).send();
    },
       default: function(){res.status(406).send('Not Acceptable');}
    });
    
    next();
}

function registrationPage(req,res,next){
    res.format({
      'text/html': function(){res.render('pages/register',{});},
      'application/json': function(){res.status(200).send("Works")},
       default: function(){res.status(406).send('Not Acceptable');}
    });
    
    next();
}

module.exports = router;