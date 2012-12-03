/**
 * Module dependencies.
 */

var express = require('express')
    , routes = require('./routes')
    , user = require('./routes/user')
    , qwizbook = require('./routes/qwizbook')
    , http = require('http')
    , path = require('path')
    , fs = require('fs')
    , User = require('./models/User.js')
    , passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy
    ;

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.cookieSession({ secret:"qwizkool magic" }));
    // Initialize Passport!  Also use passport.session() middleware, to support
    // persistent login sessions (recommended).
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.static(path.join(__dirname, 'public/test/jasmine')));
});

app.configure('development', function () {
    app.use(express.errorHandler());
});

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});


passport.use(new LocalStrategy({
        usernameField:'name',
        passwordField:'password'
    },
    function (username, password, done) {
        User.authenticate(username, password, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false);
            }
            return done(null, user);
        });
    }
));

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    // Unauthorized Access . Send response with Error
    res.send(401);
}

//app.get('/', routes.index);

// Unsupported REST call 405 Method Not Allowed
function unsupported(req, res) {


    res.send(405);
};



/*
* User Access related routes
*/
app.post('/login', passport.authenticate('local'), user.login);
app.post('/logout', user.logout);

/*
+-----------+-------------------+--------------------+----------------------+----------------+
| RESOURCE  |   POST(create)    |     GET(read)      |     PUT(update)      | DELETE(delete) |
+-----------+-------------------+--------------------+----------------------+----------------+
| /users    | create a new user | ERROR              | ERROR                | ERROR          |
+-----------+-------------------+--------------------+----------------------+----------------+
|/users/:id | ERROR             | get  user with :id | update user with :id | ERROR          |
+-----------+-------------------+--------------------+----------------------+----------------+
*/

app.post('/users', user.register);
app.post('/users/:id',unsupported);
app.get('/users',unsupported);
app.get('/users/:id', ensureAuthenticated, user.getUser);
app.put('/users',unsupported);
app.put('/users/:id', ensureAuthenticated, user.updateUser);
app.delete('/users', unsupported);
app.delete('/users/:id', unsupported);

//app.get('/users', user.list);

/*
 * Qwizbook related routes
 */
/*
+----------------+-----------------------+------------------------+--------------------------+--------------------------+
|    RESOURCE    |     POST(create)      |       GET(read)        |       PUT(update)        |      DELETE(delete)      |
+----------------+-----------------------+------------------------+--------------------------+--------------------------+
| /qwizbooks     | create a new qwizbook | get qwizbooks          | bulk update qwizbooks    | delete all qwizbooks     |
+----------------+-----------------------+------------------------+--------------------------+--------------------------+
| /qwizbooks/:id | ERROR                 | get qwizbook with :id  | update qwizbook with :id | delete qwizbook with :id |
+----------------+-----------------------+------------------------+--------------------------+--------------------------+
*/


// Create a Qwizbook
app.post('/qwizbooks', ensureAuthenticated, qwizbook.createBook);

// Retrieve all qwizbooks
app.get('/qwizbooks', ensureAuthenticated, qwizbook.getbooks);

// Retrieve this Qwizbook
app.get('/qwizbooks/:id', ensureAuthenticated, qwizbook.getbook);


// Update this Qwizbook
app.put('/qwizbooks/:id', ensureAuthenticated, qwizbook.updateBook);


// Delete all Qwizbooks
app.delete('/qwizbooks', ensureAuthenticated, qwizbook.deleteBooks);

// Delete this Qwizbook
app.delete('/qwizbooks/:id', ensureAuthenticated, qwizbook.deleteBook);


// Start the REST server
http.createServer(app).listen(app.get('port'), function () {
    console.log("Qwizkool REST server listening on port " + app.get('port'));
});

