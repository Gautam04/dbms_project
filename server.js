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
   res.sendFile(__dirname+"/"+"register.html");
})

app.get('/register',function(req,res){
   var username = req.query.username;
   var email = req.query.email;
   var password = req.query.password;
   var passconf = req.query.passconf;
   console.log(password);
   console.log(passconf);
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
   // console.log(username);
   // console.log(password);
   con.query("SELECT * FROM members WHERE username='"+username+"'",function(err,result,fields){
      if(err) throw err;
      //console.log(result);
      if(result.length !==0)
     { var hash_password = result[0].password;
      bcrypt.compare(password,hash_password,function(err,res){
         if(res)
         {
               req.session.username = username;
               req.session.save();
               req.session.email = result[0].email;
               resp.send("Successfully logged in");

         }
         else
         {
            resp.send("Invalid Password");

         }
      });
      }
      else
      {
         resp.send("invalid username");
      }
   });
});


app.get('/booklist',function(req,res){
   con.query("SELECT * FROM books",function(err,result,fields){
      if(err) throw err;

      console.log(result);
      res.send(result);
   })
})


app.get("/getDetails",function(req,res){
   var username = req.session.username;
   //console.log("hello");
   con.query("SELECT * FROM members WHERE username='"+username+"'",function(err,result,fields){
      if(err) throw err;
      console.log(result);
      res.send(result);
   });
})

app.get("/getBooks",function(req,res){
   var username = req.session.username;
   //console.log("hello");
   con.query("SELECT * FROM books WHERE borrowed='"+username+"'",function(err,result,fields){
      if(err) throw err;
      console.log(result);
      res.send(result);
   });
})

app.get("/getAll",function(req,res){
   var username = req.session.username;
   //console.log("hello");
   con.query("SELECT * FROM books WHERE borrowed IS NULL",function(err,result,fields){
      if(err) throw err;
      console.log(result);
      res.send(result);
   });
})

app.get("/borrow",function(req,res){
   var name = req.query.name;
   var author = req.query.author;
   var username = req.session.username;
   //console.log("hello");
   con.query("UPDATE books SET borrowed='"+username+"' WHERE bname='"+name+"' AND author='"+author+"'",function(err,result){
      if(err) throw err;
      console.log(result);
      res.send(result);
   });
})


app.get("/return",function(req,res){
   var name = req.query.name;
   var author = req.query.author;
   var username = req.session.username;
   //console.log("hello");
   con.query("UPDATE books SET borrowed=NULL WHERE bname='"+name+"' AND author='"+author+"'",function(err,result){
      if(err) throw err;
      console.log(result);
      res.send(result);
   });
})

app.get('/logout',function(req,res){

req.session.destroy();
res.send("Session Destroyed");
});


var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})

