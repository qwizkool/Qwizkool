define([
  "namespace",

  // Libs
  "use!backbone"

  // Modules

  // Plugins
],

function(namespace, Backbone) {

  // Create a new module
  var SocialConnection = namespace.module();

  // SocialConnection extendings
  SocialConnection.Model = Backbone.Model.extend({ /* ... */ });
  SocialConnection.Collection = Backbone.Collection.extend({ /* ... */ });
  SocialConnection.Router = Backbone.Router.extend({ /* ... */ });

  // This will fetch the tutorial template and render it.
  SocialConnection.View = Backbone.View.extend({
    template: "app/templates/social_connection.html",

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
    }
  });

  // Required, return the module for AMD compliance
  return SocialConnection;

});
