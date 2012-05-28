define([
  "namespace",

  // Libs
  "use!backbone"

  // Modules

  // Plugins
],

function(namespace, Backbone) {

  // Create a new module
  var User = namespace.module();

  // User extendings
  User.Model = Backbone.Model.extend({
    
    //Root of the REST url for users
    urlRoot: "/?q=rest_server/user",

    defaults:{ 
      //id: null,
      name: 'new_user',
      isRegistered: false,
      registrationAttempted: false,
      registrationStatus: "Failed",
      pass: 'abc123',
      mail: 'new_user@qwizkool.com',
      uid: null,
      uri: 'http://qwizkool.com/?q=rest_server/user/7'
    },
    
    initialize: function(){
        },
        
    register: function(){
            //alert("Register user");
            this.set({registrationAttempted: true});
            var jqxhr = this.save({}, {
                        
                        error: function(model, response){
                          model.set({isRegistered: false});
                                                   model.set({registrationStatus: "failed"});
 
                          //model.trigger('user-registration-event', model, response.statusText);  
                          model.trigger('user-registration-event');  
                          
                          alert("Model:Failed to register "+ model.get('name') + " ! " + response.statusText);
                          },
                        
                        success: function(model, response){
                          alert("Model:Hello " + model.get('name') + " ! " + "Welcome to QwizKool ! " + "You are user #" + model.get('uid') +".");
                          
                          model.set({isRegistered: true});
                                                   model.set({registrationStatus: "successful"});
                           model.trigger('user-registration-event');  
                       //  model.trigger('user-registration-event', model, response.statusText);  
                          }
                      });            
            
        } 
    
  });
  
  
  User.Collection = Backbone.Collection.extend({
    
    model: User.Model,
    url: "/?q=rest_server/user"
  
  });
  
  User.Router = Backbone.Router.extend({ /* ... */ });

/*
  // This will fetch the tutorial template and render it.
  User.View = Backbone.View.extend({
    template: "app/templates/user.html",

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
*/

  // Required, return the module for AMD compliance
  return User;

});
