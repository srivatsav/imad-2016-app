var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles = {
    'article-one': {
    
    title: 'Article One template.!',
    heading: 'Article One',
    date: 'Sept 22 2016',
    content: 
    `<p> Content for my first article..!</p>
    <p> Content for my first article..!</p>
    <p> Content for my first article..!</p>`
    
},
    'article-two': {
    
    title: 'Article 2 template.!',
    heading: 'Article 2',
    date: 'Sept 22 2016',
    content: 
    `<p> Content for my 2 article..!</p>
    <p> Content for my 2 article..!</p>
    <p> Content for my 2 article..!</p>`
    
},
    'article-three': {
    
    title: 'Article 3 template.!',
    heading: 'Article 3',
    date: 'Sept 22 2016',
    content: 
    `<p> Content for my 3 article..!</p>
    <p> Content for my 3 article..!</p>
    <p> Content for my 3 article..!</p>`
    
}
};


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
                <div>${date}</div>
                <div>
                    ${content}
                </div>
            </div>
        </body>
    </html>`;
    return htmlTemplate;
}

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

app.get('/about.html', function(req,res){
    res.sendFile(path.join(__dirname,'ui','about.html'))
})

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

var names = [];
app.get('/submit-name',function(req, res) {
    var name = req.query.name;
    names.push(name);
    
    res.send(JSON.stringify(names));
});

app.get('/:aName', function(req, res){
    var articleName = req.params.aName;
   res.send(buildTemplate(articles[articleName]));
});
app.get('/ui/main.js', function (req, res) {
   res.sendFile (path.join(__dirname, 'ui', 'main.js'));
});



var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
