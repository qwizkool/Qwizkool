/**
 * Created with JetBrains WebStorm.
 * User: bambalakkat
 * Date: 11/25/12
 * Time: 10:56 AM
 * To change this template use File | Settings | File Templates.
 */
var db = require('../lib/qwizbook_db');


/*Schema definition*/

var QwizbookSchema = new db.Schema({
    // A combination of title and owner email to create uniqueness
    // This is with assumption that email is unique @ qwizkool.
      uniqueKey: {type:String, unique:true}
    , title:{type:String}
    , description:{type:String}
    , ownerEmail:{type:String}
    , date:{ type:Date, default:Date.now }
    // Private/Public/Shared
    , groupPermission:{type:String}
    // Shared with these email owners.
    , sharedWith:[{ email:String }]
});


var Qwizbook = db.conn.model('Qwizbook', QwizbookSchema);

// Exports
module.exports.createQwizbook = createQwizbook;
module.exports.retrieveQwizbook = retrieveQwizbook;
module.exports.retrieveQwizbooks = retrieveQwizbooks;
module.exports.updateQwizbook = updateQwizbook;
module.exports.deleteQwizbook = deleteQwizbook;

function createQwizbook(owner, data, callback) {

    // Check if the provided owner is same as the
    // session owner. A book can be created by only
    // the session owner

    if (owner.email != data.ownerEmail) {
        callback({Error:"Qwizbook Could not be created "});
        return
    }


    var instance = new Qwizbook();

    instance.uniqueKey = data.title + ":" + owner.email;
    instance.title = data.title;
    instance.description = data.description;
    instance.ownerEmail = owner.email;
    instance.groupPermission = data.groupPermission;

    instance.save(function (err) {
        if (err) {
            // Check for duplicate key error
            if (err.code == 11000) {
                callback({Error: "Qwizbook already exist for the same user"},null)
                return;
            }

            // All other conditions Pass as is TODO: need to cleanup.
            callback({Error:"Qwizbook Could not be created "}, null);
        }
        else {
            callback(null, instance);
        }
    });
};

function retrieveQwizbook(owner, id, callback) {

};

function retrieveQwizbooks(owner, callback) {

};

function updateQwizbook(owner, callback) {

};

function deleteQwizbook(owner, callback) {

};

