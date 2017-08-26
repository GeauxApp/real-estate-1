var express = require('express');
var router = express.Router();
// bring in our Mongoose model
var Estate = require('../models/estate.schema.js');

var express = require('express');
var router = express.Router();
// bring in our Mongoose model
var schemas = require('../models/estate.schema.js');
var Rental = schemas.rentalSchema;
var Listing = schemas.listingSchema;

router.get('/', function (req, res) {
    var result = {};
    Rental.find({}, function (err, data) {
        console.log('real.estate.js rental get called ');

        if (err) {
            console.log('find error: ', err);
            res.sendStatus(500);
        } else {
            result.rentals = data;
            Listing.find({}, function (err, data) {
                console.log('real.estate.js listing get called ');

                if (err) {
                    console.log('find error: ', err);
                    res.sendStatus(500);
                } else {
                    result.listings = data;
                    res.send(result);
                }
            });
        }
    });
});

router.post('/listing', function (req, res) {
        console.log('new listing to store: ', req.body);

        // use model/constructor to make a Mongoose Object
        var newListing = new Listing(req.body);

        // insert into our collection
        newListing.save(function (err, data) {
            console.log('saved listing to the collection: ', data);
            if (err) {
                console.log('save error: ', err);

                res.sendStatus(500);
            } else {
                res.sendStatus(201);
            }

        });
    });


    module.exports = router;