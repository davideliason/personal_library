var express = require("express"),
    app     = express(),
    engines = require('consolidate');

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.get('/book/:title', function(req,res, next){
    var title = req.params.title;
    res.render('book', { title : title});
});

app.use(function(req, res){
    res.sendStatus(404);
    });

app.listen(8080, () => {
    console.log("listening at port 8080");
});