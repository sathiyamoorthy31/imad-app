var express = require('express');
var morgan = require('morgan');
var path = require('path');
var crypto = require('crypto');

var app = express();
app.use(morgan('combined'));

var articleone = {
    title: 'article one',
    heading: 'articles one',
    date: 'feb 27,2018',
    content:`<p>
                hello thus is my first article and i am really happy to do this article
            </p>
            <p>
                hello thus is my first article and i am really happy to do this article
            </p>
            <p>
                hello thus is my first article and i am really happy to do this article
            </p> `
};

function createtemplate (data){
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;
var htmltemplate =`
    <html>
    <head>
        <title>
            ${title} </title>
          <link href="/ui/style.css" rel="stylesheet" />
       
    </head>
    <body>
        <div class="container">
        <div>
            <a href="/">Home</a>
        </div>
        <hr/>
        <h3>${heading}</h3>
        <div>${date}</div>
        <div>
            
            ${content}
        </div>
        </div>
    </body>
    
    
</html>
`;
   return htmltemplate;
}

function hash (input,salt){
    //how do we create hash?
    var hashed = crypto.pbkdf25sync(input,salt,10000,512,'sha512');
    return hashed.toString('hex');
}
app.get('/hash/:input',function(req,res){
    var hashedString = hash(req.params.input,'this-is-some-random-string');
    res.send(hashedString);
    
}); 












app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/article-one', function (req,res){
      res.send(createtemplate(articleone));

});

app.get('/article-two', function (req,res){
   res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
});

app.get('/article-three', function (req,res){
    res.send('Article three will be req and served here');
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
