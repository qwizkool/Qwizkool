define([
  "namespace",

  // Libs
  "use!backbone"

  // Modules

  // Plugins
],

function(namespace, Backbone) {

  // Create a new module
  var FrontPage = namespace.module();

  // FrontPage extendings
  FrontPage.Model = Backbone.Model.extend({ /* ... */ });
  FrontPage.Collection = Backbone.Collection.extend({ /* ... */ });
  FrontPage.Router = Backbone.Router.extend({ /* ... */ });

  // This will fetch the tutorial template and render it.
  FrontPage.View = Backbone.View.extend({
    template: "app/templates/frontpage.html",

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
  return FrontPage;

});
