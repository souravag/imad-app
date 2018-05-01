var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var config = {
    user:'souravagarwal54321',
    database:'souravagarwal54321',
    host:'db.imad.hasura.io',
    port:'5432',
    password:'db-souravagarwal54321-42599';
}
var app = express();
app.use(morgan('combined'));
var articles = {
    'article-one':{
        title:'Article One',
        date:'9 March 2018',
        heading:'Article One web app',
        content:` 
                    <p>
                        This is my first article.This is my first article.This is my first article.This is my first article.This is my first article.This is my first article.I am enjoying it.I am enjoying it.I am enjoying it.I am enjoying it.I am enjoying it.
        
                    </p>
                    <p>
                                This is my first article.This is my first article.This is my first article.This is my first article.This is my first article.This is my first article.I am enjoying it.I am enjoying it.I am enjoying it.I am enjoying it.I am enjoying it.
                    </p>
                    <p>
                                This is my first article.This is my first article.This is my first article.This is my first article.This is my first article.This is my first article.I am enjoying it.I am enjoying it.I am enjoying it.I am enjoying it.I am enjoying it.
                    </p>`
                },
    'article-two':{
        title:'Article two',
        date:'9 March 2018',
        heading:'Article Two web app',
        content:` 
                    <p>
                        This is my first article.This is my first article.This is my first article.This is my first article.This is my first article.This is my first article.I am enjoying it.I am enjoying it.I am enjoying it.I am enjoying it.I am enjoying it.
        
                    </p>
                    <p>
                            This is my second article.This is my first article.This is my first article.This is my first article.This is my first article.This is my first article.I am enjoying it.I am enjoying it.I am enjoying it.I am enjoying it.I am enjoying it.
                    </p>
                `
        },
    'article-three':{
        title:'Article Three',
        date:'11 March 2018',
        heading:'Article Three web app',
        content:` 
                    <p>
                        This is my third article.This is my first article.This is my first article.This is my first article.This is my first article.This is my first article.I am enjoying it.I am enjoying it.I am enjoying it.I am enjoying it.I am enjoying it.
        
                    </p>
                    <p>
                            This is my second article.This is my first article.This is my first article.This is my first article.This is my first article.This is my first article.I am enjoying it.I am enjoying it.I am enjoying it.I am enjoying it.I am enjoying it.
                    </p>
                `
    }
};

function createTemp(data) {
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;
    var htmlTemp = `
    <html>
    <head>
        <title>
            ${title}
        </title>
        <meta name="viewport" content ="width=device-width, initial-scale=1" /> 
        <link href="/ui/style.css" rel="stylesheet" />
         <link href="http://img2.turbomilk.com/portfolio/identity/iconfinder/iconfinder_logo.jpg" rel="icon" type="image/icon"/>
    </head>
    <body>
    
        <div>
            <a href='/'>Home</a>
        </div>
        <div>
            ${date}
        </div>
        <hr />
        <h3>
            ${heading}
        </h3>
        <div class ="styling">
            <div>
               ${content}
            </div>
        </div>
        <hr />
        <input type="text" id="${title}" paceholder="name"></input>
        <input type="submit" id="submit_btn${title}" value="submit"></input>
        <ul id="nameList${title}"></ul>
    </body>
</html>

    `;
    return htmlTemp;
}
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config);
app.get('/test-db', function(req,res) {
    pool.query('SELECT * FROM test',function(err,result) {
       if(err)
       {
           res.status(500).send(err.toString());
       }
       else
       {
           res.send(JSON.stringify(result));
       }
    });
});

var counter=0;
app.get('/counter', function(req,res) {
    counter = counter+1;
    res.send(counter.toString());
});
var names=[];
app.get('/username',function(req,res) {
   var name=req.query.name;
   names.push(name);
   res.send(JSON.stringify(names));
});
var comments=[];
app.get('/article-one/comment', function(req,res) {
   var com = req.query.comment;
   comments.push(com);
   res.send(JSON.stringify(comments));
});

app.get('/:articleName', function(req,res){
    //articleName == article-one
    var articleName= req.params.articleName;
    res.send(createTemp(articles[articleName]));
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
