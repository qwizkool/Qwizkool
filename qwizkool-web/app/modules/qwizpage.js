// QwizPage represents one full quiz with associated navigation, hints, comments, images, video, audio etc.
// The QwizPage primarily maintains a list of QwizPage references, and the starte transitions between them.
// A QwizPage could be an intro page, a multiple choice question, summary etc.

define([
  "namespace",

  // Libs
  "use!backbone"

  // Modules

  // Plugins
],

function(namespace, Backbone) {

  // Create a new module
  var QwizPage = namespace.module();

  // QwizPage extendings
  QwizPage.Model = Backbone.Model.extend({
    
    //Root of the REST url for QwizBooks
    urlRoot: "/?q=rest_server/node",

    defaults: {
		"vid": "1",
		"uid": "1",
		"title": "Welcome to a new way of learning ..",
		"log": "",
		"status": "1",
		"comment": "1",
		"promote": "1",
		"sticky": "0",
		"nid": "1",
		"type": "page",
		"language": "und",
		"created": "1329945019",
		"changed": "1329946647",
		"tnid": "0",
		"translate": "0",
		"revision_timestamp": "1329946647",
		"revision_uid": "1",
		"body": "qwizbook navigation and qwizpage list",
		"cid": "0",
		"last_comment_timestamp": "1329945019",
		"last_comment_name": null,
		"last_comment_uid": "1",
		"comment_count": "0",
		"name": "vinod",
		"picture": "0",
		"data": "a:1:{s:7:\"overlay\";i:1;}",
		"path": "http://qwizkool.com/?q=node/1"
    }
    
  });
  
  
  QwizPage.Collection = Backbone.Collection.extend({
    
    model: QwizPage.Model,
    url: "/?q=rest_server/node"
  
  });
  
  QwizPage.Router = Backbone.Router.extend({ /* ... */ });


  // This will fetch the tutorial template and render it.
  QwizPage.View = Backbone.View.extend({
    template: "app/templates/qwizpage.html",

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
  return QwizPage;

});
