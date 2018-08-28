var express = require("express"),
    app     = express(),
    engines = require('consolidate'),
    MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    morgan = require('morgan'),
    session = require('express-session'),
    bodyParser = require('body-parser');

// middleware
app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({ secret: 'this-is-a-secret-token', 
                  cookie: { maxAge: 60000 },
                  saveUninitialized: true,
                  resave: false
                 }
                ));


MongoClient.connect('mongodb://localhost:27017/personal_library', function(err, db) {

    assert.equal(err, null);
    console.log("Successfully connected to MongoDB.");

    app.get('/', (req,res)=>{
        var sessData = req.session;
            sessData.someAttribute = "foo";
        res.render('home', {'user' : "David", "titles" : ['2001', 'Dune']});
    });

    app.get("/books", (req,res) =>{
        var someAttribute = req.session.someAttribute;
        db.collection('personal_library').find().toArray(function(err, docs) {

            res.render('books', { 'books' : docs, passed_attribute: someAttribute});
           
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
        db.collection('personal_library').insertOne({ "title" : favorite_book + "new", "author" : "new author"});
        console.log("new title inserted into dob");
        res.send("your favorite books is" + favorite_book);
    });


    app.listen(8080, () => {
        console.log("listening at port 8080");
    });

});



