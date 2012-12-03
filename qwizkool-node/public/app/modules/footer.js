define([
  "app"

  // Libs

  // Modules

  // Plugins
],

function(namespace) {

  // Create a new module
  var Footer = namespace.module();

  // Footer extendings
  Footer.Model = Backbone.Model.extend({ /* ... */ });
  Footer.Collection = Backbone.Collection.extend({ /* ... */ });
  Footer.Router = Backbone.Router.extend({ /* ... */ });

  // This will fetch the tutorial template and render it.
  Footer.View = Backbone.View.extend({
    template: "app/templates/footer.html",

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
  return Footer;

});
