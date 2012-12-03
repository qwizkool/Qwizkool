/**
 * Module dependencies.
 */
var User = require('../models/User');


/*
 * GET users listing.
 */

exports.list = function (req, res) {
    res.send("respond with a resource");
};


module.exports = {

    register:function (req, res) {

        var user = req.body;
        console.log('User Add request for: ');
        console.log(JSON.stringify(user));

        //TODO:
        // do all the required validations.
        // or make all the validations on the client
        // side.

        console.log(user.name);
        console.log(user.email);
        console.log(user.password);

        var username = user.name;
        var password = user.password;
        var email = user.email;

        User.addUser(username, password, email, function (err, user) {
            // If error send the error response
            if (err) {
                res.send(400, err);
                console.log(err);
                return;
            }

            // No error send the unique ID for the newly created
            // user.
            console.log("User Added:");
            console.log(JSON.stringify(user));
            res.send({id : user._id});
        });

    },

    updateUser:function (req, res) {

    },


    login:function (req, res) {
        console.log(JSON.stringify(req.user));
        res.send(JSON.stringify(req.user.getUserForResponse()));
    },

    logout:function (req, res) {
        req.logout();
        res.send({STATUS:"Logout Success"})
    },

    getUser:function (req, res) {
        console.log(JSON.stringify(req.user));
        res.send(JSON.stringify(req.user.getUserForResponse()));
    }

};