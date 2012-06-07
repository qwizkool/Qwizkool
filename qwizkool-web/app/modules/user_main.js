define([
  "namespace",

  // Libs
  "use!backbone",

  // Modules
  "modules/qwizbook"

  // Plugins
],

function(namespace, Backbone, QwizBook) {

  // Create a new module
  var UserMainSection = namespace.module();

  // ShowcaseTopics extendings
  UserMainSection.Model = Backbone.Model.extend({ /* ... */ });
  UserMainSection.Collection = Backbone.Collection.extend({ /* ... */ });
  UserMainSection.Router = Backbone.Router.extend({ /* ... */ });

  // This will fetch the tutorial template and render it.
  UserMainSection.View = Backbone.View.extend({
    template: "app/templates/user_main.html",

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
  return UserMainSection;

});
