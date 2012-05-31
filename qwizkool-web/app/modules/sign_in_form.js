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
  var SignInForm = namespace.module();

  // SignInForm extendings
  SignInForm.Model = Backbone.Model.extend({ /* ... */ });
  SignInForm.Collection = Backbone.Collection.extend({ /* ... */ });
  SignInForm.Router = Backbone.Router.extend({ /* ... */ });

  // This will fetch the tutorial template and render it.
  SignInForm.View = Backbone.View.extend({
    template: "app/templates/sign_in_form.html",
    
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
          "click #signin_button":"signIn"
    },
    
    // When the user clicks sign-in, create a new user model and save it
    signIn: function() {
      
      //alert("user signin");
      //$("#registration-status").hide();

      // Todo: Validate the input values        
      this.model.set('username', $('#user_id_input').val());
      this.model.set('password', $('#user_password_input').val());
      
      this.model.set('name', $('#user_id_input').val());
      this.model.set('mail', $('#user_id_input').val());
      this.model.set('pass', $('#user_password_input').val());      
      
      // Listen for success/fail events
      //this.model.on('user-registration-event', this.userRegisterEvent, this);
      
      this.model.login();
      
      alert("user signin : end");

      
    }    
    
  });

  // Required, return the module for AMD compliance
  return SignInForm;

});
