var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var bodyParser = require('body-parser');
var session = require('express-session');
var config = {
    user: 'srivatsav',
    databse: 'srivatsav',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};
var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
    secret: 'randomSecretValue',
    cookie: {maxAge: 1000*60*60*24*30},
    resave: true,
    saveUninitialized: true
}));
var crypto = require('crypto');
var pool = new Pool(config);
function buildTemplate(data)
{
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;
    
    var htmlTemplate = `<html>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>
                ${title}
            </title>
           <link href="/ui/style.css" rel="stylesheet"/>
            
        </head>
        <body>
            <div class="container">
                
                <div><a href="/" Home></a></div>
                <hr/>
                <h3>${heading}</h3>
                <div>${date.toDateString()}</div>
                <div>
                    ${content}
                </div>
            </div>
        </body>
    </html>`;
    return htmlTemplate;
}


app.post('/create-user',function(req, res){
    
   var username = req.body.username;
   var password = req.body.password;
   
   var salt = crypto.randomBytes(128).toString('hex');
   var dbString = hash(password,salt); 
   pool.query('INSERT into "user" (username,password) VALUES ($1, $2)',[username,dbString],function(err, result){
      
      if(err)
      {
          res.status(500).send(err.toString());
      }
      else
      {
          res.send('User'+ username+' successfully created.');
      }
   });
});

app.post('/login',function(req, res){
    
   var username = req.body.username;
   var password = req.body.password;
   
   pool.query('SELECT * FROM "user" WHERE username = $1',[username],function(err, result){
      
      if(err)
      {
          res.status(500).send(err.toString());
      }
      else
      {
          if(result.rows.length===0)
          {
              res.send(403).send("Invalid Username/Password");
          }
          else
          {
              var dbString = result.rows[0].password;
              var salt = dbString.split('$')[2];
              var hashedPassword = hash(password,salt);
              if(hashedPassword===dbString)
              {
                //set a session
                req.session.auth = {userName: result.rows[0].username};
                
                //set cookie with sessinId
                res.send(req.session.auth.userName.toString());    
                
                
              }
              else
              {
                res.send(403).send("Invalid Username/Password");    
              }
              
          }
      }
   });
});


app.get('/check-login',function(req, res){
   if(req.session && req.session.auth && req.session.auth.userName){
       res.send(req.session.auth.userName.toString());
   }else{
       res.send('false');
   }
    
});

app.get('/logout',function(req, res){
   delete req.session.auth;
   res.send('You are logged out.');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/tabContent.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'tabContent.js'));
});

//using crypto library foor hashing..
function hash(input,salt)
{
    var hashed = crypto.pbkdf2Sync(input,salt,10000,512,'sha512'); 
    return ['pbkdf2',"10000",salt,hashed.toString('hex')].join('$');
}
app.get('/hash/:input',function(req, res){
    
   var hashedString = hash(req.params.input,'random-string');
   res.send(hashedString);
});

app.get('/ui/about.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'about.html'));
});
app.get('/ui/home.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'home.html'));
});
app.get('/form.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'form.html'));
});
app.get('/form.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'form.css'));
});
app.get('/animate-custom.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'animate-custom.css'));
});


app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/post/:id',function(req, res){
  res.sendFile(path.join(__dirname, 'ui', 'article.html'));
});
app.get('/ui/comment.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'comment.js'));
});
app.get('/articles/:aId', function(req, res){
    
    
    pool.query("select * from article where id = $1",[req.params.aId],function(err,result)
    {
        if(err)
        {
            res.status(500).send(err.toString());
        }
        else
        {
            if(result.rows.length === 0)
            {
                res.status(404).send('Article not found');
            }
            else
            {
                res.send(buildArticleTemplate(result.rows));
            }
        }
    });
   
});

app.get('/articles',function(req, res){
   
   pool.query('SELECT * FROM "article"',function(err, result){
       if(err){
           res.status(500).send(err.toString());
       }
       else
       {
           if(result.rows.length ===0)
           {
               res.send('No articles Found..! Create one');
           }
           else
           {
               var articleArray = result.rows;
               var htmlTemp ;
            	          
            	          for (var i=0;i<articleArray.length;i++)
            	          {
            	             htmlTemp += buildArticleTemplate(articleArray[i]);
            	          }
            	                   
            	       
            	      res.send(htmlTemp);
            	      
            	      }
            	      
           }
       
   });
});
app.get('/ui/main.js', function (req, res) {
   res.sendFile (path.join(__dirname, 'ui', 'main.js'));
});
app.get('/comment.js',function(req, res) {
    res.sendFile (path.join(__dirname,'ui','comment.js'));
});

function buildArticleTemplate(data)
{
    var id = data.id;
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;
    
    var htmlTemplate = 
               `<hr/>
                <h3>${heading}</h3>
                <div>${date.toDateString()}</div>
                <div>
                    ${content}
                </div>
                </br><button class = "btn" href="javascript:void(0)" onclick="commentHandler(${id})" id="cmnt_btn">Comment</button>
                </br>
                <hr/>`;
           
    return htmlTemplate;
}

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
