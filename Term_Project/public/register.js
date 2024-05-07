let submitButton = document.getElementById("submit");
//const mongoose = require("mongoose");
//const express = require("express");
//const Account = require("./models/AccountModel.js");


submitButton.onclick = function(){
    let account = {};
    let xhttp = new XMLHttpRequest();
    account.username = document.getElementById("userName").value;
    account.password = document.getElementById("passWord").value;
    
    if(account.password.length < 3 || account.username.length < 3){
        alert("The User must have a username and password that is at least 3 characters or greater");
    }else{
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                if(this.status == 200){
                    console.log("Account added");
                    window.location = '/';
                }
            }
        };
        xhttp.open("POST","/account/addAccount", true);
        xhttp.setRequestHeader("Content-Type","application/json");
        xhttp.send(JSON.stringify(account));
        console.log("Yes");
    }


    //Make post request to add the account to the database
    
}
