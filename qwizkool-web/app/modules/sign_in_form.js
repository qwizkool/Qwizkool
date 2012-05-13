define([
  "namespace",

  // Libs
  "use!backbone"

  // Modules

  // Plugins
],

function(namespace, Backbone) {

  // Create a new module
  var SignInForm = namespace.module();

  // SignInForm extendings
  SignInForm.Model = Backbone.Model.extend({ /* ... */ });
  SignInForm.Collection = Backbone.Collection.extend({ /* ... */ });
  SignInForm.Router = Backbone.Router.extend({ /* ... */ });

  // This will fetch the tutorial template and render it.
  SignInForm.View = Backbone.View.extend({
    template: "app/templates/sign_in_form.html",

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
  return SignInForm;

});
