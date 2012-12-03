define([
  "app",

  // Libs

  // Modules
  "modules/user"

  // Plugins
],



function(namespace, User) {

	// Create a new module
	var SignInForm = namespace.module();

	// SignInForm extendings
	SignInForm.Model = Backbone.Model.extend({/* ... */ });
	SignInForm.Collection = Backbone.Collection.extend({/* ... */ });
	SignInForm.Router = Backbone.Router.extend({/* ... */ });

	// This will fetch the tutorial template and render it.
	SignInForm.View = Backbone.View.extend({
		template : "app/templates/sign_in_form.html",

		initialize : function() {
			this.model = new User.Model();
		},

		render : function(done) {
			var view = this;
			var status_template;
			var full_template;
			//this.undelegateEvents();

			// Fetch the template, render it to the View element and call done.
			namespace.fetchTemplate(this.template, function(tmpl) {
				view.el.innerHTML = tmpl();
				if (_.isFunction(done)) {
					done(view.el);
				}
			});

		},

		renderLogInStatus : function(done) {
			var view = this;
			var status_template;
			var full_template;


			// Update the login status related view elements
			// with appropriate status.
			if (view.model.get('loginAttempted') === true) {
				namespace.fetchTemplate("app/templates/signin_status.html", function(tmpl) {
			
					view.undelegateEvents();
			
					var attributes = view.model.toJSON();
					status_template = _.template(tmpl(attributes));
					view.$("#login-status").html(status_template());

					if (view.model.get('isLoggedIn') === true) {
						view.$("#login-status").find('.status').addClass('success');
					} else {
						view.$("#login-status").find('.status').addClass('error');
					}
					
					if (_.isFunction(done)) {
						done(view.el);
					}
					
					view.delegateEvents(this.events);
	
				});

			};
			
			// Show the login status
			$("#login-status").show();					

		},

		events : {
			"click #signin_button" : "signIn"
		},

		userLoginEvent : function() {
			if (this.model.get('isLoggedIn') === true) {

				//alert(JSON.parse(localStorage.getItem('qwizkoolUser')).username);

				// Go to logged in page.
				Backbone.history.navigate("#main", true);
			} else {
		
				// Trigger event to update status
				this.trigger('login-attempted');

			}
		},

		// When the user clicks sign-in, create a new user model and save it
		signIn : function() {

			//alert("user signin");
			$("#login-status").hide();

			// Todo: Validate the input values
			this.model.set('username', $('#user_id_input').val());
			this.model.set('password', $('#user_password_input').val());

			this.model.set('name', $('#user_id_input').val());
			this.model.set('email', $('#user_id_input').val());
			this.model.set('password', $('#user_password_input').val());

			// Listen for success/fail events
			this.model.on('user-login-event', this.userLoginEvent, this);

			this.model.login();

			//alert("user signin : end");

		}
	});

	// Required, return the module for AMD compliance
	return SignInForm;

});

