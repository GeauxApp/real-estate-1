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
        console.log('real.estate.js get called ');

        if (err) {
            console.log('find error: ', err);
            res.sendStatus(500);
        } else {
            result.rentals = data;
        }
    });

    Listing.find({}, function (err, data) {
        console.log('real.estate.js get called ');

        if (err) {
            console.log('find error: ', err);
            res.sendStatus(500);
        } else {
            result.listings = data;
            res.send(data);
        }
    });
});

module.exports = router;