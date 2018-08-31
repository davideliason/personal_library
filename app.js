var express = require('express');
var app = express();
var path = require('path');
var logger = require('morgan');
var MongoClient = require('mongodb').MongoClient;
var engines = require('consolidate');
var bodyParser = require('body-parser');

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));

MongoClient.connect('mongodb://localhost:27017/', function(err,db){
    var dbo = db.db('personal_library');

    app.get('/', (req,res) => {
        dbo.collection('mybooks').find().toArray((err,docs)=>{
            console.log(docs);
            res.render('books', {'books' : docs});
            
        });

    });

    app.get('/newbook',(req,res)=>{
        res.render('newbook', { "title" : "Add new book"});
    });

    app.post('/addbook', (req,res)=>{
        var newTitle = req.body.newtitle;
        var newAuthor = req.body.newauthor;

        console.log("okay posted" + newTitle + " " + newAuthor);

        dbo.collection('mybooks').insertOne({
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

app.listen(8080, ()=>{
    console.log("listening at 8080");
});