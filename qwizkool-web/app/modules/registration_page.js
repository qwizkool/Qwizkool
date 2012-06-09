define([
  "namespace",

  // Libs
  "use!backbone",

  // Modules
  "modules/frontpage",
  "modules/header",
  "modules/footer",
  "modules/registration"

  // Plugins
],

function(namespace, Backbone, FrontPage, Header, Footer, Registration) {

	// Create a new module
	var RegistrationPage = namespace.module();

	// This will fetch the tutorial template and render it.
	RegistrationPage.View = Backbone.View.extend({

		initialize : function() {
			this.front_page = new FrontPage.View();
			this.header = new Header.View();
			this.registration = new Registration.View();
			this.footer = new Footer.View();

			this.registration.on("registration-attempted", this.registrationHandler, this);
		},


		render : function(done) {

			var thisView = this;
			// Render the top level structure.
			thisView.front_page.render(function(el) {
				$("#main").html(el);

				// Render the Header.
				thisView.header.render(function(el) {
					$("#header").html(el);
				});

				// Render the Page content.
				thisView.registration.render(function(el) {
					$("#page_body").html(el);
				});

				// Render the Footer..
				thisView.footer.render(function(el) {
					$("#footer").html(el);
				});
			});
		},

		registrationHandler : function() {
			// alert("registrationHandler");
			// Render the registration view.
			this.registration.renderRegistrationStatus(function(el) {
				$("#page_body").html(el);
			});

		}
	});

	// Required, return the module for AMD compliance
	return RegistrationPage;

});

