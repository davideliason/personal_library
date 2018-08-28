var express = require("express"),
    app     = express(),
    engines = require('consolidate'),
    MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    bodyParser = require('body-parser');

// middleware
app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({extended: true}));

MongoClient.connect('mongodb://localhost:27017/personal_library', function(err, db) {

    assert.equal(err, null);
    console.log("Successfully connected to MongoDB.");

    app.get('/', (req,res)=>{
        res.render('home', {'user' : "David", "titles" : ['2001', 'Dune']});
    });

    app.get("/books", (req,res) =>{
        db.collection('personal_library').find().toArray(function(err, docs) {

            res.render('books', { 'books' : docs});
           
         });
    })

    app.get('/book/:title', (req,res)=>{

        var title_query = req.params.title;
        db.collection('personal_library').find({"title" : title_query}).toArray(function(err, docs) {

            res.render('book', { 'books' : docs});
           
         });
    });

    app.post('/favorite_book', (req,res)=>{
        var favorite_book = req.body.title;
        res.send("your favorite books is" + favorite_book);
    });

    app.listen(8080, () => {
        console.log("listening at port 8080");
    });

});



