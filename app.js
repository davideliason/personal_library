var express = require('express');
var app = express();
var path = require('path');
var logger = require('morgan');
var MongoClient = require('mongodb').MongoClient;
var engines = require('consolidate');
var bodyParser = require('body-parser');
var dotenv = require('dotenv');
dotenv.config();
var url = process.env.MONGOLAB_URI;
var port = process.env.PORT || 8080;

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));

const assert = require('assert');
const dbName = 'personal_library';

MongoClient.connect(url, function(err,client){
   
    if (err) return console.log(err)
    db = client.db('personal_library')
  

    // RETRIEVE
    app.get('/', (req,res) => {
        db.collection('mybooks').find().toArray((err,docs)=>{
            console.log(docs);
            res.render('books', {'books' : docs});
            
        });

    });

    app.get('/json', (req,res) => {
        db.collection('mybooks').find().toArray((err,docs)=>{
            res.json(docs);
        });

    });

    app.get('/index', (req,res) => {
        res.render('index', {"user" : "username"});
    });

    app.get('/newbook',(req,res)=>{
        res.render('newbook', { "title" : "Add new book"});
    });

    // CREATE
    app.post('/addbook', (req,res)=>{
        var newTitle = req.body.newtitle;
        var newAuthor = req.body.newauthor;

        console.log("okay posted" + newTitle + " " + newAuthor);

        db.collection('mybooks').insertOne({
            "title" : newTitle,
            "author" : newAuthor
        },(err,doc)=>{
            if(err){res.send("error saving info")}
            else {
                res.redirect("/");
            }
        });
    });
});

app.listen(port, ()=>{
    console.log("listening at 8080");
});