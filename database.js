var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');


MongoClient.connect('mongodb://localhost:27017/personal_library', function(err, db) {

    assert.equal(err, null);
    console.log("Successfully connected to MongoDB.");

    var query = {"title": "2001"};

    db.collection('personal_library').find(query).toArray(function(err, docs) {

        assert.equal(err, null);
        assert.notEqual(docs.length, 0);
        
        docs.forEach(function(doc) {
            console.log( doc.title + " was written by" + doc.author );
        });
        
        db.close();
        
    });

});
