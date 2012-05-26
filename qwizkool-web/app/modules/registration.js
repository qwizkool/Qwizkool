  define([
    "namespace",
  
    // Libs
    "use!backbone",
  
    // Modules
    "modules/user"
  
    // Plugins
  ],
  
  function(namespace, Backbone, User) {
  
    // Create a new module
    var Registration = namespace.module();
  
    // Registration extendings
    Registration.Model = Backbone.Model.extend({ /* ... */ });
    Registration.Collection = Backbone.Collection.extend({ /* ... */ });
    Registration.Router = Backbone.Router.extend({ /* ... */ });
  
    // This will fetch the tutorial template and render it.
    Registration.View = Backbone.View.extend({
      template: "app/templates/registration.html",
      
      initialize: function(){
        this.model = new User.Model(); 
        },
  
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
  //        "change input":"change",
          "click #signup_button":"signUp"
      },
      
      userRegisterEvent: function(model, statusTxt) {
        
        if (model.isRegistered == true) {
          alert("Hello " + model.get('name') + " ! " + "Welcome to QwizKool ! " + "You are user #" + model.get('uid') +".");
          Backbone.history.navigate("#main", true);
        }
        else {
          alert("Failed to register "+ model.get('name') + " ! " + statusTxt);
        }
      },      
      
      // When the user clicks sign-up, create a new user model and save it
      signUp: function() {
        
        //alert("new user signup");
  
        // Todo: Validate the input values        
        this.model.set('name', $('#user_name').val());
        this.model.set('mail', $('#user_email').val());
        this.model.set('pass', $('#pass_word1').val());
        
        // Listen for success/fail events
        this.model.on('user-registration-event', this.userRegisterEvent);
        
        this.model.register();
        
      }
      
          
      
    });
  
    // Required, return the module for AMD compliance
    return Registration;
  
  });
