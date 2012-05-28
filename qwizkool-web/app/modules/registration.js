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
        var status_template;
        var full_template;
        
        this.undelegateEvents();

              
 	// Fetch the template, render it to the View element and call done.
	namespace.fetchTemplate(this.template, function(tmpl) {
 	  view.el.innerHTML = tmpl();          
  
	});
        
        
        // Update the registration status related view elements
        // with appropriate status.
        if (view.model.get('registrationAttempted') === true){
  
          namespace.fetchTemplate("app/templates/registration_status.html", function(tmpl) {
           var attributes = view.model.toJSON();
           status_template= _.template(tmpl(attributes));
            view.$("#registration-status").html(status_template());
            
            if (view.model.get('isRegistered') === true){
              view.$("#registration-status").find('.status').addClass('success');
            } else {
             view.$("#registration-status").find('.status').addClass('error');
            }
           
          });
          
        };
         
  
  	  // If a done function is passed, call it with the element
	if (_.isFunction(done)) {
	    done(view.el);
	}
       
       // Re attach all the view events as we are redoing view.
        view.delegateEvents(this.events);

      },
      
      events: {
          "click #signup_button":"signUp"
      },
      
      userRegisterEvent: function() {
        if (this.model.get('isRegistered') === true){
          
            // Go to logged in page.
            Backbone.history.navigate("#main", true);
          } else {
            
            // Trigger event to update status
            this.trigger('registration-attempted');
          }
      },      
      
      // When the user clicks sign-up, create a new user model and save it
      signUp: function() {
        
        //alert("new user signup");
        $("#registration-status").hide();
  
        // Todo: Validate the input values        
        this.model.set('name', $('#user_name').val());
        this.model.set('mail', $('#user_email').val());
        this.model.set('pass', $('#pass_word1').val());
        
        // Listen for success/fail events
        this.model.on('user-registration-event', this.userRegisterEvent, this);
        
        this.model.register();
        
      }
      
          
      
    });
  
    // Required, return the module for AMD compliance
    return Registration;
  
  });
