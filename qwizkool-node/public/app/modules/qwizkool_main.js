define([
  "app"

  // Libs

  // Modules

  // Plugins
],

function(namespace) {

  // Create a new module
  var QwizkoolMain = namespace.module();

  // QwizkoolMain extendings
  QwizkoolMain.Model = Backbone.Model.extend({ /* ... */ });
  QwizkoolMain.Collection = Backbone.Collection.extend({ /* ... */ });
  QwizkoolMain.Router = Backbone.Router.extend({ /* ... */ });

  // This will fetch the tutorial template and render it.
  QwizkoolMain.View = Backbone.View.extend({
    template: "app/templates/qwizkool_main.html",

    render: function(done) {
      var view = this;

      // Fetch the template, render it to the View element and call done.
      namespace.fetchTemplate(this.template, function(tmpl) {
        view.el.innerHTML = tmpl();

        // If a done function is passed, call it with the element
        if (_.isFunction(done)) {
          done(view.el);
        }
      });
    },
    
    events: {
       "click #register_button": "register"
    },
    
    // When the user clicks on sign-up butto, navigate to registration
    // page.
    register: function() {
      //alert("register invoked");
    
      // Navigate to registration page.
      Backbone.history.navigate("register", true);
   }
  });

  // Required, return the module for AMD compliance
  return QwizkoolMain;

});
