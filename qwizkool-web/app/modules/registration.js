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
    
    // When the user clicks sign-up, create a new user model and save it
    signUp: function() {
      
      //alert("new user signup");

      // Todo: Validate the input values
      var new_user = new User.Model();
      
      new_user.set('name', $('#user_name').val());
      new_user.set('mail', $('#user_email').val());
      new_user.set('pass', $('#pass_word1').val());
      
      // Listen for success/fail events
      //new_user.on('sync', syncDone);
      //new_user.on('error', syncError);

      var jqxhr = new_user.save({
                      wait: true,
                      
                      error: function(model, response){
                        alert("Failed to register.");
                        },
                      
                      success: function(model, response){
                        //alert(model.get('id') + " " + model.get('uid'));
                        //alert("Hello " + model.get('name') + " ! " + "Welcome to QwizKool ! " + "You are user #" + model.get('uid') +".");
                        }
                    });
      
                                            
            alert("Send registration info ?");
            
            if (new_user.get('uid') == null)
            {
              alert("Failed to register.");
            }
            else
            {
              alert("Hello " + new_user.get('name') + " ! " + "Welcome to QwizKool ! " + "You are user #" + new_user.get('uid') +".");
            }
            
            // If the user registration is successful, move to logged in
            // page.
            Backbone.history.navigate("main", true);
      
    }
        
    
  });

  // Required, return the module for AMD compliance
  return Registration;

});
