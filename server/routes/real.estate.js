var express = require('express');
var router = express.Router();
// bring in our Mongoose model
var schemas = require('../models/estate.schema.js');
var Rental = schemas.rentalSchema;
var Listing = schemas.listingSchema;

router.get('/', function (req, res) {
    var result = {};
    Rental.find({}, function (err, data) {
        //console.log('real.estate.js rental get called ');

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
    //console.log('new listing to store: ', req.body);

    // use model/constructor to make a Mongoose Object
    var newListing = new Listing(req.body);

    // insert into our collection
    newListing.save(function (err, data) {
        //console.log('saved listing to the collection: ', data);
        if (err) {
            console.log('save error: ', err);

            res.sendStatus(500);
        } else {
            res.sendStatus(201);
        }

    });
});

router.post('/rental', function (req, res) {
    //console.log('new rental to store: ', req.body);

    // use model/constructor to make a Mongoose Object
    var newRental = new Rental(req.body);

    // insert into our collection
    newRental.save(function (err, data) {
        //console.log('saved rental to the collection: ', data);
        if (err) {
            console.log('save error: ', err);

            res.sendStatus(500);
        } else {
            res.sendStatus(201);
        }

    });
});


router.put('/listing/:id', function (req, res) {
    var id = req.params.id;
    //console.log('real.estate.js put listing called');
    Listing.findByIdAndUpdate(
        { _id: id },
        {
            $set: {
                cost: req.body.cost,
                sqft: req.body.sqft,
                city: req.body.city
            }
        },
        function (err, data) {
            if (err) {
                console.log('update error: ', err);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    )
});

router.put('/rental/:id', function (req, res) {
    var id = req.params.id;
    //console.log('real.estate.js put rental called');
    Rental.findByIdAndUpdate(
        { _id: id },
        {
            $set: {
                rent: req.body.rent,
                sqft: req.body.sqft,
                city: req.body.city
            }
        },
        function (err, data) {
            if (err) {
                console.log('update error: ', err);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    )
});

router.delete('/rental/:id', function (req, res) {
    Rental.findByIdAndRemove(
        { _id: req.params.id },
        function (err, data) {
            if (err) {
                console.log('delete error: ', err);

                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    );
});

router.delete('/listing/:id', function (req, res) {
    Listing.findByIdAndRemove(
        { _id: req.params.id },
        function (err, data) {
            if (err) {
                console.log('delete error: ', err);

                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    );
});

module.exports = router;