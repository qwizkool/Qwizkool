define(["namespace",

// Libs
"use!backbone",

// Modules
"modules/user"

// Plugins
], 
function(namespace, Backbone, User) {

  // Create a new module
  var UserAuth = namespace.module();

  // UserAuth extendings
  UserAuth.Model = Backbone.Model.extend({/* ... */ });
  UserAuth.Collection = Backbone.Collection.extend({/* ... */ });
  UserAuth.Router = Backbone.Router.extend({/* ... */ });

  // This will fetch the tutorial template and render it.
  UserAuth.View = Backbone.View.extend({
    template : "",

    initialize : function() {
      this.model = new User.Model();
      this.templateSignIn = "app/templates/sign_in_form.html";
      this.templateSignOut = "app/templates/sign_out.html";
    },

    render : function(done) {
      var view = this;
      var template;

      if (this.model.get('isLoggedIn') === false) {
        // We need to show sign in template.
        template = this.templateSignIn;
      } else {
        // We need to show sign out template
        template = this.templateSignOut;
      }

      // Fetch the template, render it to the View element and call done.
      namespace.fetchTemplate(template, function(tmpl) {

        view.el.innerHTML = tmpl();
        if (_.isFunction(done)) {
          done(view.el);
        }

      });

    },

    renderLogInStatus : function(done) {
      var view = this;
      var status_template;
      var full_template;

      // Update the login status related view elements
      // with appropriate status.
      if (view.model.get('loginAttempted') === true) {
        namespace.fetchTemplate("app/templates/signin_status.html", function(tmpl) {

          view.undelegateEvents();

          var attributes = view.model.toJSON();
          status_template = _.template(tmpl(attributes));
          view.$("#login-status").html(status_template());

          if (view.model.get('isLoggedIn') === true) {
            view.$("#login-status").find('.status').addClass('success');
          } else {
            view.$("#login-status").find('.status').addClass('error');
          }

          if (_.isFunction(done)) {
            done(view.el);
          }

          view.delegateEvents(this.events);

        });

      };

      // Show the login status
      $("#login-status").show();

    },

    events : {
      "click #signin_button" : "signIn",
      "click #signout_button" : "signOut"
    },

    reattachEvents : function() {
      this.undelegateEvents();
      this.delegateEvents(this.events);

    },

    userLoginEvent : function() {
      if (this.model.get('isLoggedIn') === true) {

        //alert(JSON.parse(localStorage.getItem('qwizkoolUser')).username);

        // Go to logged in page.
        Backbone.history.navigate("#main", true);
      } else {

        // Trigger event to update status
        this.trigger('login-attempted');

      }
    },

    userLogoutEvent : function() {
      if (this.model.get('isLoggedIn') === false) {
        // Go to logged in page.
        Backbone.history.navigate("", true);
        this.trigger('logout-attempted');
      } else {
        // Trigger event to update status
        this.trigger('logout-attempted');
      }
    },

    // When the user clicks sign-in, create a new user model and save it
    signOut : function() {

      // Listen for success/fail events
      this.model.on('user-logout-event', this.userLogoutEvent, this);

      this.model.logout();

      //alert("user signout : end");

    },

    // When the user clicks sign-in, create a new user model and save it
    signIn : function() {

      //alert("user signin");
      $("#login-status").hide();

      // Todo: Validate the input values
      this.model.set('username', $('#user_id_input').val());
      this.model.set('password', $('#user_password_input').val());

      this.model.set('name', $('#user_id_input').val());
      this.model.set('mail', $('#user_id_input').val());
      this.model.set('pass', $('#user_password_input').val());

      // Listen for success/fail events
      this.model.on('user-login-event', this.userLoginEvent, this);

      this.model.login();

      //alert("user signin : end");

    }
  });

  // Required, return the module for AMD compliance
  return UserAuth;

});

