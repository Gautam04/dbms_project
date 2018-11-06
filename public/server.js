var express = require('express');
var mysql = require('mysql');
var bcrypt = require('bcrypt');
var fs = require('fs');
var session = require('express-session');
var app = express();

var bodyParser = require('body-parser');


app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

app.use(express.static('public'));



var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "4jan1999"
});

con.connect(function(err){
   if(err) throw err;
   console.log("Connected");
   con.query("USE project",function(err,result)
   {
      if(err) throw err;
      console.log("Database changed");
   });
});

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


app.get('/login.htm',function(req,res){
   res.sendFile(__dirname+"/"+"login.html");
})

app.get('/homepage.htm',function(req,res){
   res.sendFile(__dirname+"/"+"homepage.html");
})

app.get('/register.htm',function(req,res){
   res.sendFile(__dirname+"/"+"registration.html");
})

app.get('/register',function(req,res){
   var username = req.query.username;
   var email = req.query.email;
   var password = req.query.password;
   var passconf = req.query.passconf;
   if(passconf!=password)
   {
      response = "Invalid";
      res.end(response);
   }
   else
   {
      var hash = bcrypt.hashSync(password,5);
      //console.log(hash);
      con.query("INSERT INTO members VALUES('"+username+"','"+email+"','"+hash+"')",function(err,result)
   {
      if(err) throw err;
      //console.log("Database changed");
      res.end("Registration successful")
   });
   }
 });

app.get('/login',function(req,resp){
   var sess = req.session;
   var username = req.query.username;
   var password = req.query.password;
   con.query("SELECT * FROM members WHERE username='"+username+"'",function(err,result,fields){
      if(err) throw err;
      var hash_password = result[0].password;
      bcrypt.compare(password,hash_password,function(err,res){
         if(res)
         {
               req.session.username = username;
               req.session.email = result[0].email;
               con.query("INSERT INTO logged_in VALUES('"+username+"')",function(err,result){
                  if(err) throw err;
                  resp.end("Succesrsfully logged in");
               })
         }
         else
         {
            resp.end("Invalid Password");

         }
      });
   });
});


app.get('/booklist',function(req,res){
   con.query("SELECT * FROM books",function(err,result,fields){
      if(err) throw err;

      console.log(result);
      res.send(result);
   })
})

// app.get('/logout',function(req,res){

// req.session.destroy(function(err){
// if(err){
// console.log(err);
// }
// else
// {
// res.redirect('/');
// }
// });


var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})

