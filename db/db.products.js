var mongoHandler = require("./db.client.js");
var collectionName = "products";


exports.getById = function(id, callback) {
    if (callback === null || typeof(callback) !== "function") {
        throw "Call to db method must include callback function"
    }
    var mongoclient = mongoHandler.getDbClient();
    // Open the connection to the server
    mongoclient.connect('mongodb://cgary:yougo4it@ds113871.mlab.com:13871/traider',function(err, mongoclient) {
        if(err) throw err.Message;
        var dbName = mongoHandler.dbName();
        var db = mongoclient.db(dbName);
        var mongoId;
        try {
            mongoId = mongoHandler.makeObjectID(id);
        } catch (e) {
            return callback(e);
        }
        console.log("id:" + mongoId);
        db.collection(collectionName).findOne({
            "_id": mongoId
        }, function(err, result) {
            mongoclient.close();
            if (err) {
                callback(err);
                return;
            } else {
                // Close the connection
                return callback(null, result);
            }
        });
    });
};

exports.getAll = function(callback) {
    if (callback === null || typeof(callback) !== "function") {
        throw "Call to db method must include callback function"
    }
    var mongoclient = mongoHandler.getDbClient();
    mongoclient.connect('mongodb://cgary:yougo4it@ds113871.mlab.com:13871/traider',function(err, mongoclient) {

        if (err) {
            mongoclient.close();
            throw err.Message;
        }

        var dbName = mongoHandler.dbName();
        var db = mongoclient.db(dbName);
        console.log(dbName + "." + collectionName);

        db.collection(collectionName).find({}, function(err, result) {
            if (err) {
                mongoclient.close();
                throw err.Message;
            } else {
                result.toArray(function(err, resultArray) {
                    // Close the connection
                    if(err) throw err.Message;
                    
                    mongoclient.close();
                    if(typeof(resultArray) == 'undefined'){
                        resultArray = [];
                    }
                    console.log("Got data: " + resultArray.length + " records.");
                    return callback(resultArray);

                });
            }
        });
    });
};


exports.insert = function(data, callback) {
    var mongoclient = mongoHandler.getDbClient();
    mongoclient.connect('mongodb://cgary:yougo4it@ds113871.mlab.com:13871/traider',function(err, mongoclient) {

        if (err) {
            throw err.Message;
        }

        var dbName = mongoHandler.dbName();
        var db = mongoclient.db(dbName);
        console.log(dbName + "." + collectionName);

        db.collection(collectionName).insert(data, function(err, result) {
            if (err) {
                mongoclient.close();
                throw err.Message;
            } else if (callback === null && typeof(callback) !== "function") {
                mongoclient.close();
                return callback(result);
            }
        });
    });
};