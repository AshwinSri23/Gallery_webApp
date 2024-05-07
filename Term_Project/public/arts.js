
let submitButton = document.getElementById("submit");



submitButton.onclick = function(){
    let xhttp = new XMLHttpRequest();
    let searchQuery = {};
    let queries = [];
    let title = document.getElementById("title").value;
    let artist = document.getElementById("name").value;
    let category = document.getElementById("category").value;  
    searchQuery.title="BOb";
    searchQuery.artist="";
    searchQuery.title = title; 
    searchQuery.artist = artist;
    //console.log(searchQuery);

    for(key in searchQuery){
        if(searchQuery[key].length>0){
            queries.push(key+"="+searchQuery[key]);
        }
    }
    queries = queries.join('&');
    
    console.log("Query:"+queries);

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if(this.status == 200){
                let artworks = document.getElementById("pieces");
                artworks.innerHTML = "";
                artworks.innerHTML = this.responseText;
                console.log(this.responseText);
                let previous = document.getElementById("previous");
                let next = document.getElementById("next");
                //console.log(this.responseText);
                //updatePage();
            }
        }
    };

    xhttp.open("POST","/arts", true);
    xhttp.setRequestHeader("Content-Type","application/json");
    xhttp.send(JSON.stringify(searchQuery));
}


function updatePage(){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if(this.status == 200){
                let artworks = document.getElementById("pieces");
                artworks.innerHTML = "";
                artworks.innerHTML = this.responseText;
                console.log("Successfully updated page");
            }
        }
    };

    xhttp.open("GET","/arts", true);
    xhttp.setRequestHeader("Content-Type","text/html");
    xhttp.send();
}
