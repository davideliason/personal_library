var express = require('express');
var app = express();
var path = require('path');
var logger = require('morgan');
var MongoClient = require('mongodb').MongoClient;
var engines = require('consolidate');

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

MongoClient.connect('mongodb://localhost:27017/', function(err,db){
    var dbo = db.db('personal_library');

    app.get('/', (req,res) => {
        dbo.collection('mybooks').find().toArray((err,docs)=>{
            console.log(docs);
            res.render('books', {'books' : docs});
            
        });

    });
});

app.listen(8080, ()=>{
    console.log("listening at 8080");
});