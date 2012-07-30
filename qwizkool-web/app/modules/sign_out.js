define(["namespace",

// Libs
"use!backbone",

// Modules
"modules/user"

// Plugins
], function(namespace, Backbone, User) {

  // Create a new module
  var SignOut = namespace.module();

  // SignOut extendings
  SignOut.Model = Backbone.Model.extend({/* ... */ });
  SignOut.Collection = Backbone.Collection.extend({/* ... */ });
  SignOut.Router = Backbone.Router.extend({/* ... */ });

  // This will fetch the tutorial template and render it.
  SignOut.View = Backbone.View.extend({
    template : "app/templates/sign_out.html",

    initialize : function() {
      this.model = new User.Model();
    },

    render : function(done) {
      var view = this;
      var status_template;
      var full_template;

      // Fetch the template, render it to the View element and call done.
      namespace.fetchTemplate(this.template, function(tmpl) {
        view.el.innerHTML = tmpl();
        if (_.isFunction(done)) {
          done(view.el);
        }
      });

    },

    events : {
      "click #signout_button" : "signOut"
    },

    userLogoutEvent : function() {
      if (this.model.get('isLoggedIn') === false) {
        // Go to logged in page.
        Backbone.history.navigate("", true);
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

    }
  });

  // Required, return the module for AMD compliance
  return SignOut;

});

