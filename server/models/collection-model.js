//collection-model.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CollectionSchema = new Schema({
    name: String,
    description: String,
    visibility: Boolean //true for public, false for private
});

module.exports = mongoose.model('Collection', CollectionSchema);