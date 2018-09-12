var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "vmprt",
    password: "55671704"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("CREATE DATABASE database", function (err, result) {
        if (err) throw err;
        console.log("Database created");
    });
});