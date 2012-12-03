define([

 "app"

// Libs

// Modules

// Plugins
], function (namespace) {

    // Create a new module
    var User = namespace.module();

    // User extendings
    User.Model = Backbone.Model.extend({

        //Root of the REST url for users
        //urlRoot: "/?q=rest_server/user",

        urlRoot:function () {

            urlRootBase = "/";

            if (this.action == "register") {
                return urlRootBase + "users/";
            } else if (this.action == "login") {
                return urlRootBase + "login/";
            } else if (this.action == "logout") {
                return urlRootBase + "logout/";
            } else {
                return urlRootBase + "users/";
            }
        },

        defaults:{
            id:null,
            name:'new_user',
            email:'new_user@qwizkool.com',
            password:'abc123',
            isRegistered:false,
            registrationAttempted:false,
            registrationStatus:null,
            isLoggedIn:false,
            loginAttempted:false,
            logoutAttempted:false,
            loginStatus:null,
            action:'none'
        },

        initialize:function () {

            userInfo = JSON.parse(localStorage.getItem("qwizkoolUser"));
            if (userInfo) {

                this.set({
                    name:userInfo.name,
                    isRegistered:userInfo.isRegistered,
                    registrationAttempted:userInfo.registrationAttempted,
                    registrationStatus:userInfo.registrationStatus,
                    isLoggedIn:userInfo.isLoggedIn,
                    loginAttempted:userInfo.loginAttempted,
                    logoutAttempted:userInfo.logoutAttempted,
                    loginStatus:userInfo.loginStatus,
                    password:userInfo.password,
                    email:userInfo.email,
                    action:userInfo.action
                });

            }

        },

        isUserAuthenticated:function () {
            var state = this.get('isLoggedIn');
            return state;
        },

        register:function () {

            //alert("Register user");
            this.action = "register";
            this.set({
                registrationAttempted:true,
                isRegistered:false,
                registrationStatus:null
            });

            var jqxhr = this.save({}, {

                error:function (model, response) {
                    model.set({
                        isRegistered:false,
                        registrationStatus:response.statusText,
                        action:'none'
                    });
                    model.trigger('user-registration-event');

                    // alert("Model:Failed to register "+ model.get('name') + " ! " + response.statusText);
                },

                success:function (model, response) {
                    //alert("Model:Hello " + model.get('name') + " ! " + "Welcome to QwizKool ! " + "You are user #" + model.get('uid') +".");

                    model.set({
                        isRegistered:true,
                        registrationStatus:"Hello " + model.get('name') + " ! " + "Welcome to QwizKool ! " + "You are user #" + model.get('id') + ".",
                        action:'none'
                    });
                    model.trigger('user-registration-event');
                }
            });

        },

        login:function () {
            //alert("Login user");
            this.action = "login";

            this.set({
                loginAttempted:true,
                loginStatus:null,
                isLoggedIn:false
            });

            var jqxhr = this.save({}, {

                error:function (model, response) {
                    model.set({
                        isLoggedIn:false,
                        loginStatus:response.statusText,
                        action:'none'
                    });
                    model.trigger('user-login-event');

                    //alert("Model:Failed to login "+ model.get('name') + " ! " + response.statusText);
                },

                success:function (model, response) {
                    // alert("Model:Hello " + model.get('name') + " ! " + "Welcome to QwizKool ! " + "You are logged in.");

                    model.set({
                        isLoggedIn:true,
                        loginStatus:"Hello " + model.get('name') + " ! " + "Welcome to QwizKool ! " + "You are user #" + model.get('id') + ".",
                        action:'none'
                    });


                    // Store logged-in user info in persistent
                    localStorage.setItem('qwizkoolUser', JSON.stringify(model));
                    model.trigger('user-login-event');
                }
            });

            //alert("Model:Completed login "+ this.get('name'));

        },

        logout:function () {

            this.action = "logout";
            this.set({
                logoutAttempted:true
            });

            var jqxhr = this.save({ }, {

                error:function (model, response) {
                    model.set({
                        isLoggedIn:false,
                        loginStatus:response.statusText,
                        action:'none'
                    });

                    model.trigger('user-logout-event');

                },

                success:function (model, response) {

                    model.set({
                        loginStatus:"Logged Out",
                        isLoggedIn:false,
                        action:'none'
                    });
                    // Destroy the logged in user Data.
                    localStorage.setItem('qwizkoolUser', null);
                    model.trigger('user-logout-event');
                }
            });

        }
    });

    User.Collection = Backbone.Collection.extend({

        model:User.Model,
        url:"/users"

    });

    User.Router = Backbone.Router.extend({/* ... */ });

    // Required, return the module for AMD compliance
    return User;

});
