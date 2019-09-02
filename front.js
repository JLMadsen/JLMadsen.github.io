window.onload = function() {
    let button = document.getElementById("testBTN");
    button.addEventListener("click", function(){
        addArticle();
    });
    //initialize();
}

function initialize(){
    console.log("initialize");

    // get articles from sql
    var con = connect();
    
    // add newsitems
    addArticle();

    // add liveitems

}

function connect(){
    console.log("connect");

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
    console.log("getProperties");

    fetch('file.txt')
    .then(response => response.text())
    .then(text => console.log(text))
}

var counter = 0;
function addArticle(){
    counter++;
    console.log("addArticle");

    /**
     * contains:
     * title
     * picture
     * text
     * time and date
     * importance
     */

    // create node
    var node = document.createElement("p");

    // create title
    var title = document.createTextNode("BREAKING NEWS "+ counter);

    // append title to node
    node.appendChild(title);

    // gove node correct class for formatting
    node.className = "post";

    // add to page
    document.getElementById("content").appendChild(node);

}