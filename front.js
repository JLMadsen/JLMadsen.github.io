window.onload = function() {
    //initialize();
}

function initialize(){
    // get articles from sql
    var con = connect();
    
    // add newsitems

    // add liveitems

}

function connect(){
    var mysql = require('mysql');

    var con = mysql.createConnection({
    host: "localhost",
    user: "yourusername",
    password: "yourpassword"
    });

    con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    });

    return con;
}

function getProperties(){
    fetch('file.txt')
    .then(response => response.text())
    .then(text => console.log(text))
}