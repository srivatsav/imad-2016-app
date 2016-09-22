var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var pageContent={
    
    title: 'Article One template.!',
    heading: 'Article One',
    date: 'Sept 22 2016',
    content: 
    `<p> Content for my first article..!</p>
    <p> Content for my first article..!</p>
    <p> Content for my first article..!</p>`
    
};

function buildPage(data)
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

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/article-one', function(req, res){
   res.send(buildPage(pageContent));
});

app.get('/article-two', function(req, res){
   res.sendFile(path.join(__dirname, 'ui', 'article2.html'));
});
app.get('/article-three', function(req, res){
   res.sendFile(path.join(__dirname, 'ui', 'article3.html'));
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
