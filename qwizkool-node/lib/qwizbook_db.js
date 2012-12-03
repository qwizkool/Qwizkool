/**
 * Created with JetBrains WebStorm.
 * User: bambalakkat
 * Date: 11/24/12
 * Time: 7:51 PM
 * To change this template use File | Settings | File Templates.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var url = 'mongodb://localhost:27017/qwizkool-books';
var conn = mongoose.createConnection(url);


module.exports.mongoose = mongoose;
module.exports.Schema = Schema;
module.exports.conn = conn;

