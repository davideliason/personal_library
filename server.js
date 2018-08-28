var express = require("express"),
    app     = express(),
    engines = require('consolidate');

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.get('/', function(req,res){
    res.render('book', { title : 'Test Title'});
});

app.use(function(req, res){
    res.sendStatus(404);
    });

app.listen(8080, () => {
    console.log("listening at port 8080");
});