var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto= require('crypto');
var bodyparser = require('body-parser');
var config = {
    user:'souravagarwal54321',
    database:'souravagarwal54321',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password: process.env.DB_PASSWORD
};
var app = express();
app.use(morgan('combined'));
app.use(bodyparser.json());

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
        <div class="bold text-big">
            ${date.toDateString()}
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
        <div class ="events">
        <hr />
        <input type="text" id="${title}" paceholder="name"></input>
        <input type="submit" id="submit_btn${title}" value="submit"></input>
        <ul id="nameList${title}"></ul>
        </br>
        </hr>
        </div>
    </body>
</html>

    `;
    return htmlTemp;
}
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config);
console.log('Connection pool created!');
app.get('/test-db', function(req,res) {
    pool.query('SELECT * FROM test', function(err,result) {
        console.log('Database loaded!');
       if(err)
       {
           console.log('error!');
           res.status(500).send(err.toString());
       }
       else
       {
           res.send(JSON.stringify(result.rows));
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

app.get('/articles/:articleName', function(req,res){
    //articleName == article-one
    
   
    pool.query("SELECT * FROM articles WHERE title= $1", [req.params.articleName], function(err,result){
        if(err)
        {
            res.status(500).send(err.toString());
        }
        else
        {
            if(result.rows.length === 0)
            {
                res.status(404).send('The Article you are looking for is Not Found!')
            }
            else {
                 var articledata=result.rows[0];
                 res.send(createTemp(articledata));
            }
        }
    });
    
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

function hash(input,salt)
{
    var hashed=crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
    return ['pbkdf2Sync',salt,10000,hashed.toString('hex')].join('$');
}

app.post('/createuser', function(req,res) {
    
   // {"username":"amazed","password":"test-db"}
    var username=req.body.username;
    var password=req.body.password;
    var salt=crypto.randomBytes(128).toString('hex');
    var dbstring = hash(password,salt);
    pool.query('INSERT INTO "user" (username,password) VALUES($1,$2)', [username,dbstring],function(err,result){
       if(err)
       {
            res.status(500).send(err.toString());
       }
       else
       {
           res.send('User successfully created' +username);
       }
    });
});

app.get('/hash/:input', function(req,res) {
   var hashedValue = hash(req.params.input,'this is random string');
   res.send(hashedValue);
});

app.post('/login', function(req,res) {
    
    var username=req.body.username;
    var password=req.body.password;
    pool.query('SELECT password FROM "user" WHERE username= $1',[username], function(err,result) {
        if(err)
        {
            res.status(500).send(err.toString());
        }
        else
        {
            if(result.rows.length===0)
            {
                res.status(403).send('Username/Password is invalid!');
            }
            else
            {
                var dbstring = result.rows[0];
                var salt=dbstring.split('$')[2];
                var hashedPassword = hash(password,salt);
                if(hashedPassword===dbstring) {
                    res.send('Successfully logged in!');
                }
                else{
                    res.status(403).send('Username/Password is invalid!');
                }
            }
        }
    });
});

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
