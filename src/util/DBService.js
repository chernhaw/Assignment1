var express= require('express');
const { get } = require('express/lib/response');

var port = process.env.PORT || 3000;
var dbService = express();
var mysql = require('mysql');


var con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password",
    database:"nodelogin"
});

dbService.get('/', function(req, res){

   
   
    con.query('select id, username, password email from nodelogin.accounts',
    function(err, rows){
        if(err) throw err;
        console.log(rows);
    });
   

    res.send('<html><head><link href=assets/style.css type=text/css rel=stylesheet/><h1>Hello Jesus</h1></head></html>')
});

dbService.get('/person/:id', function(req, res){
    console.log("Request Url "+req.url);
    res.send('<html><head><link href=assets/style.css type=text/css rel=stylesheet/></head><body><h1>Person: '+
    req.params.id + '</h1></body></html>');
});


dbService.get('/api',function(req, res){
    res.json({firstname:'John', lastname:'Doe'});
});

dbService.listen(port);

 