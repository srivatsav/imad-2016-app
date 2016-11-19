var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool
var config = {
    user: 'srivatsav',
    databse: 'srivatsav',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};
var app = express();
app.use(morgan('combined'));
var crypto = require('crypto');

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


var pool = new Pool(config);
app.get('/test-db',function(req,res){
    pool.query('SELECT * FROM test',function(err, result){
        if(err)
        {
            res.status(500).send(err.toString());
        }
        else
        {
            res.send(JSON.stringify(result.rows));
        }
    });
});

var counter = 0;
app.get('/counter',function(req, res){
   counter = counter+1;
   res.send(counter.toString());
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

//using crypto library foor hashing..
function hash(input,salt)
{
    var hashedString = crypto.pbkdf2Sync(input,salt,10000,512,'sha512'); 
    return hashedString.toString('hex');
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

var names = [];
app.get('/submit-name',function(req, res) {
    var name = req.query.name;
    names.push(name);
    
    res.send(JSON.stringify(names));
});

app.get('/articles/:aName', function(req, res){
    
    
    pool.query("select * from article where title = $1",[req.params.aName],function(err,result)
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
                var articleData = result.rows[0];
                res.send(buildTemplate(articleData));
            }
        }
    });
   
});
app.get('/ui/main.js', function (req, res) {
   res.sendFile (path.join(__dirname, 'ui', 'main.js'));
});



var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
