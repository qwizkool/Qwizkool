define([
 "namespace",

  // Libs
  "use!backbone",

  // Modules
  "order!modules/frontpage",
  "order!modules/header",
  "order!modules/sign_in_form",
  "order!modules/qwizkool_main",
  "order!modules/showcase_tutorial",
  "order!modules/showcase_topics",
  "order!modules/social_connection",
  "order!modules/footer",
], 

function(namespace, Backbone, FrontPage, Header, SignInForm, QwizkoolMain, 
	ShowcaseTutorial, ShowcaseTopics, SocialConnection, Footer) {

	// Create a new module
	var IndexPage = new namespace.module();

	// Top level view for the qwizkool
	IndexPage.View = Backbone.View.extend({


		initialize : function() {
			this.frontPage = new FrontPage.View();
			this.header = new Header.View();
			this.signIn = new SignInForm.View();
			this.qwizkoolMain = new QwizkoolMain.View();
			this.tutorial = new ShowcaseTutorial.View();
			this.social = new SocialConnection.View();
			this.topics = new ShowcaseTopics.View();
			this.footer = new Footer.View();

			this.signIn.on("login-attempted", this.logInHandler, this);

		},

		render : function(done) {
 
 			// Attach the tutorial to the DOM
			this.frontPage.render(function(el) {
				$("#main").html(el);
			});

			this.header.render(function(el) {
				$("#header").html(el);
			});
			
			this.signIn.render(function(el) {
				$("#sign_in_form_loc").html(el);
			});

			this.qwizkoolMain.render(function(el) {
				$("#qwizkool_main").html(el);
			});

			this.tutorial.render(function(el) {
				$("#showcase_tutorial").html(el);
			});

			this.social.render(function(el) {
				$("#social_connection").html(el);
			});

			this.topics.render(function(el) {
				$("#showcase_topics").html(el);
			});

			this.footer.render(function(el) {
				$("#footer").html(el);
			});

		},
		
		logInHandler: function() {
			this.signIn.renderLogInStatus(function(el) {
				$("#sign_in_form_loc").html(el);
			});
		}

	});
	
	return IndexPage;
}); 