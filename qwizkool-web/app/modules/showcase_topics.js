define([
  "namespace",

  // Libs
  "use!backbone"

  // Modules

  // Plugins
],

function(namespace, Backbone) {

  // Create a new module
  var ShowcaseTopics = namespace.module();

  // ShowcaseTopics extendings
  ShowcaseTopics.Model = Backbone.Model.extend({ /* ... */ });
  ShowcaseTopics.Collection = Backbone.Collection.extend({ /* ... */ });
  ShowcaseTopics.Router = Backbone.Router.extend({ /* ... */ });

  // This will fetch the tutorial template and render it.
  ShowcaseTopics.View = Backbone.View.extend({
    template: "app/templates/showcase_topics.html",

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
  return ShowcaseTopics;

});
