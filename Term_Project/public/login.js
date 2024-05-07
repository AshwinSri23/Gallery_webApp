let submitButton = document.getElementById("submit");

submitButton.onclick = function(){
    let account = {};
    
    let xhttp = new XMLHttpRequest();
    account.username = "";
    account.password ="";
    account.username = document.getElementById("userName").value;
    account.password = document.getElementById("passWord").value;
    //Make get request to check if the account exists
    console.log(account);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if(this.status == 200){
                let length = JSON.parse(xhttp.responseText);
                if(length>0){
                    console.log
                    console.log("Account found");
                    window.location = '/arts';
                }else{
                    alert("Account not exist");
                }
            }
            
        }
    };
    xhttp.open("POST","account/findAccount", true);
    xhttp.setRequestHeader("Content-Type","application/json");
    xhttp.send(JSON.stringify(account));

}
