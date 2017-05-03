
var mongo = require("mongodb");
var MongoClient = mongo.MongoClient,
    Server = require('mongodb').Server,
    BSON = mongo.BSONPure;
    var ObjectId = require('mongodb').ObjectId;


exports.getDbClient = function() {
    return MongoClient;
};

exports.dbName = function() {
    return "traider";
};

exports.makeObjectID = function(id) {
    return new ObjectId(id);
};