/**
 * Created with JetBrains WebStorm.
 * User: bambalakkat
 * Date: 11/23/12
 * Time: 11:11 AM
 * To change this template use File | Settings | File Templates.
 */
var db = require('../lib/user_db');


/*Schema definition*/

var UserSchema = new db.Schema({
    username:{type:String,  unique:true}
    , email:{type:String, unique:true}
    , password:String
});


UserSchema.methods.getUserForResponse = function () {

    return { username : this.username, email : this.email, id : this._id  }
};


var QwizkoolUser = db.conn.model('User', UserSchema);

// Exports
module.exports.addUser = addUser;
module.exports.authenticate = authenticate;
module.exports.findById = findById;


// Add user to database
function addUser(username, password, email, callback) {

    var instance = new QwizkoolUser();

    instance.username = username;
    instance.password = password;
    instance.email = email;

    instance.save(function (err) {
        if (err) {

            // Check for duplicate key error
            if (err.code == 11000) {
                callback({Error: "User already exist with the same email ID/user name"})
                return;
            }


            // All other conditions Pass as is TODO: need to cleanup.
            callback({Error: "User Could not be created "});
        }
        else {
            callback(null, instance);
        }
    });
}


function authenticate (username, password, callback) {
    QwizkoolUser.findOne({ username: username }, function(err, user) {
        if (err) { return callback(err); }
        if (!user) { return callback(null, false); }
        if (user.password == password) {
            return callback(null, user);
        } else {
            return callback(null, false);
        }
    });
};

function findById (id, callback) {
    QwizkoolUser.findById(id , function(err, user) {
        if (err) { return callback(err); }
        if (!user) { return callback(null, false); }

        return callback(null, user);

    });
};
