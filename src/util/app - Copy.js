var express= require('express');
const { get } = require('express/lib/response');


var app = express();
var mysql = require('mysql');

var port = process.env.PORT || 3000;
console.log (port);
app.use('/assets',express.static(__dirname+'/public'));

var con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password",
    database:"nodelogin"
});

app.get('/', function(req, res){

   
   
    con.query('select id, username, password email from nodelogin.accounts',
    function(err, rows){
        if(err) throw err;
        console.log(rows);
    });
   

    res.send('<html><head><link href=assets/style.css type=text/css rel=stylesheet/><h1>Hello Jesus</h1></head></html>')
});

app.get('/person/:id', function(req, res){
    console.log("Request Url "+req.url);
    res.send('<html><head><link href=assets/style.css type=text/css rel=stylesheet/></head><body><h1>Person: '+
    req.params.id + '</h1></body></html>');
});

app.use('person/:id', function(req, res, next){
    console.log("Request Url : "+req.url);
      

})
app.get('/api',function(req, res){
    res.json({firstname:'John', lastname:'Doe'});
});

app.listen(port);
