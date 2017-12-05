//collection-model.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CollectionSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    visibility: { type: Boolean, required: true }, //true for public, false for private
    userId: { type: String, required: true }, //Id of user who created the collection
    rating: { type: Number, default: 0},
    imgArr: { type: [String] }
});

const Collection = module.exports = mongoose.model('Collection', CollectionSchema);

module.exports.getCollectionById = function(id, callback) {
    Collection.findById(id, callback);
}

module.exports.getCollectionByName = function(name, callback) {
    const query = {name: name}
    Collection.findOne(query, callback);
}

module.exports.getCollectionByUserId = function(user_id, callback) {
    const query = {userId: user_id}
    Collection.findOne(query, callback);
}

module.exports.addCollection = function(newCollection, callback){
    newCollection.save(callback);
}


/*module.exports.addImageToCollection = function(collection, callback){
    this.getCollectionByName(collection.name, callback);
    collection.save(callback);
}*/