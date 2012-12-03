/**
 * Created with JetBrains WebStorm.
 * User: bambalakkat
 * Date: 11/25/12
 * Time: 12:47 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 * Module dependencies.
 */
var User = require('../models/User');
var Qwizbook = require('../models/Qwizbook');

module.exports = {

    createBook:function (req, res) {

        var sessionUser = req.user;
        var qwizbookData = req.body;

        console.log(sessionUser);
        console.log(qwizbookData);

        Qwizbook.createQwizbook(sessionUser, qwizbookData, function (err, book) {
            // If error send the error response
            if (err) res.send(400, err);

            // No error send the unique ID for the newly created
            // book.
            res.send({id:book.id});
        })
    },

    getbook:function (req, res) {

        console.log(req.user);
    },

    getbooks:function (req, res) {
        console.log(req.user);
    },

    updateBook:function (req, res) {
        console.log(req.user);
    },

    deleteBook:function (req, res) {
        console.log(req.user);
    },

    deleteBooks:function (req, res) {
        console.log(req.user);
    }
};