define(["namespace",

// Libs
"use!backbone"

// Modules

// Plugins
], function(namespace, Backbone) {

  // Create a new module
  var User = namespace.module();

  // User extendings
  User.Model = Backbone.Model.extend({

    //Root of the REST url for users
    //urlRoot: "/?q=rest_server/user",

    urlRoot : function() {

      urlRootBase = "/webservice/?q=rest_server/user/";

      if (this.action == "register") {
        return urlRootBase;
      } else if (this.action == "login") {
        return urlRootBase + "login/";
      } else if (this.action == "logout") {
        return urlRootBase + "logout/";
      } else {
        return urlRootBase;
      }
    },

    defaults : {
      //id: null,
      name : 'new_user',
      username : 'new_user',
      isRegistered : false,
      registrationAttempted : false,
      registrationStatus : "Failed",
      isLoggedIn : false,
      loginAttempted : false,
      logoutAttempted : false,
      loginStatus : "Failed",
      pass : 'abc123',
      password : 'abc123',
      mail : 'new_user@qwizkool.com',
      uid : null,
      uri : 'http://qwizkool.com/webservice/?q=rest_server/user/7',
      action : 'none',
      sessid : null,
      session_name : null
    },

    initialize : function() {

      userInfo = JSON.parse(localStorage.getItem("qwizkoolUser"));
      if (userInfo) {

        this.set({
          name : userInfo.name,
          username : userInfo.username,
          isRegistered : userInfo.isRegistered,
          registrationAttempted : userInfo.registrationAttempted,
          registrationStatus : userInfo.registrationStatus,
          isLoggedIn : userInfo.isLoggedIn,
          loginAttempted : userInfo.loginAttempted,
          logoutAttempted : userInfo.logoutAttempted,
          loginStatus : userInfo.loginStatus,
          pass : userInfo.pass,
          password : userInfo.password,
          mail : userInfo.mail,
          uid : userInfo.uid,
          uri : userInfo.uri,
          action : userInfo.action,
          sessid : userInfo.sessid,
          session_name : userInfo.session_name
        });

      }

    },

    isUserAuthenticated: function() {
      var state = this.get('isLoggedIn');
      return state;
    },

    register : function() {

      //alert("Register user");
      this.action = "register";
      this.set({
        registrationAttempted : true
      });

      var jqxhr = this.save({}, {

        error : function(model, response) {
          model.set({
            isRegistered : false
          });
          model.set({
            registrationStatus : response.statusText
          });
          model.trigger('user-registration-event');

          // alert("Model:Failed to register "+ model.get('name') + " ! " + response.statusText);
        },

        success : function(model, response) {
          //alert("Model:Hello " + model.get('name') + " ! " + "Welcome to QwizKool ! " + "You are user #" + model.get('uid') +".");

          model.set({
            isRegistered : true
          });
          model.set({
            registrationStatus : "Hello " + model.get('name') + " ! " + "Welcome to QwizKool ! " + "You are user #" + model.get('uid') + "."
          });
          model.trigger('user-registration-event');
        }
      });

    },

    login : function() {
      //alert("Login user");
      this.action = "login";

      this.set({
        loginAttempted : true
      });

      var jqxhr = this.save({}, {

        error : function(model, response) {
          model.set({
            isLoggedIn : false
          });
          model.set({
            loginStatus : response.statusText
          });
          model.trigger('user-login-event');

          //alert("Model:Failed to login "+ model.get('name') + " ! " + response.statusText);
        },

        success : function(model, response) {
          // alert("Model:Hello " + model.get('name') + " ! " + "Welcome to QwizKool ! " + "You are logged in.");

          model.set({
            isLoggedIn : true
          });

          // Store logged-in user info in persistent
          localStorage.setItem('qwizkoolUser', JSON.stringify(model));

          model.set({
            loginStatus : "Hello " + model.get('name') + " ! " + "Welcome to QwizKool ! " + "You are user #" + model.get('uid') + "."
          });
          model.trigger('user-login-event');
        }
      });

      //alert("Model:Completed login "+ this.get('name'));

    },

    logout : function() {

      this.action = "logout";
      this.set({
        logoutAttempted : true
      });

      var jqxhr = this.save({ }, {

        error : function(model, response) {
          model.set({
            isLoggedIn : false
          });
          model.set({
            loginStatus : response.statusText
          });
          model.trigger('user-logout-event');

        },

        success : function(model, response) {

          model.set({
            isLoggedIn : false
          });

          // Destroy the logged in user Data.
          localStorage.setItem('qwizkoolUser', null);

          model.set({
            loginStatus : "Logged Out",
            isLoggedIn : false
          });
          model.trigger('user-logout-event');
        }
      });

    }
  });

  User.Collection = Backbone.Collection.extend({

    model : User.Model,
    url : "/webservice/?q=rest_server/user"

  });

  User.Router = Backbone.Router.extend({/* ... */ });

  // Required, return the module for AMD compliance
  return User;

});
