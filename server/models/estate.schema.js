var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create the Schema
var estateSchema = new Schema({
   //set up schema
});

// export our model
module.exports = mongoose.model('Estate', estateSchema);