require([
  "namespace",

  // Libs
  "jquery",
  "use!tabs",
  "use!backbone",

  // Modules
  "modules/frontpage",
  "modules/header",
  "modules/sign_in_form",
  "modules/qwizkool_main",
  "modules/showcase_tutorial",
  "modules/showcase_topics",
  "modules/social_connection",
  "modules/registration",
  "modules/footer",
  "modules/about_us",  
  "modules/view_utils",
  "modules/user",
   "modules/user_main",
],

function(namespace, $, Tabs, Backbone, FrontPage, Header, SignInForm, QwizkoolMain, ShowcaseTutorial, ShowcaseTopics, SocialConnection, Registration, Footer, AboutUs, ViewUtils, User,UserMain) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    routes: {
      "main": 'user_main',
      "about_us": 'about_us',
      "register": 'register',
      "": 'index',
      ":hash": "index",
      },

    index: function(hash) {
      
      //alert("index invoked");
      
      var route = this;
      var front_page = new FrontPage.View();

      // Attach the tutorial to the DOM
      front_page.render(function(el) {
        $("#main").html(el);

        // Fix for hashes in pushState and hash fragment
        if (hash && !route._alreadyTriggered) {
          // Reset to home, pushState support automatically converts hashes
          Backbone.history.navigate("", false);

          // Trigger the default browser behavior
          location.hash = hash;

          // Set an internal flag to stop recursive looping
          route._alreadyTriggered = true;
        }
     
      });      
	  
	  
	  var header = new Header.View();
      header.render(function(el) {
        $("#header").html(el);
      });

	  var sign_in = new SignInForm.View();
      sign_in.render(function(el) {
        $("#sign_in_form_loc").html(el);
      });
		
		
	  var q_main = new QwizkoolMain.View();
      q_main.render(function(el) {
        $("#qwizkool_main").html(el);
      });


	  var tutorial = new ShowcaseTutorial.View();
      tutorial.render(function(el) {
        $("#showcase_tutorial").html(el);
      });


	  var topics = new ShowcaseTopics.View();
      topics.render(function(el) {
        $("#showcase_topics").html(el);
      });


	  var social = new SocialConnection.View();
      social.render(function(el) {
        $("#social_connection").html(el);
      });

	  var footer = new Footer.View();
      footer.render(function(el) {
        $("#footer").html(el);
      });


    },
    
    
    register: function(hash) {
    //alert("register invoked");
     
      var user_register = new Registration.View();
      ViewUtils.simple_view(user_register);
      

    },
      
    about_us: function(hash) {
     //alert("register invoked");
     
      var about_us = new AboutUs.View();
      ViewUtils.simple_view(about_us);
    },
    
    user_main: function(hash) {
    //alert("user_main invoked");
     
      var user_main = new UserMain.View();
      ViewUtils.simple_view(user_main);
    }
   
  });

  // Shorthand the application namespace
  var app = namespace.app;

  // Treat the jQuery ready function as the entry point to the application.
  // Inside this function, kick-off all initialization, everything up to this
  // point should be definitions.
  $(function() {
    // Define your master router on the application namespace and trigger all
    // navigation from this instance.
    app.router = new Router();

    // Trigger the initial route and enable HTML5 History API support
    Backbone.history.start({ pushState: true });
  
  });


  // All navigation that is relative should be passed through the navigate
  // method, to be processed by the router.  If the link has a data-bypass
  // attribute, bypass the delegation completely.
  $(document).on("click", "a:not([data-bypass])", function(evt) {
    // Get the anchor href and protcol
    var href = $(this).attr("href");
    var protocol = this.protocol + "//";

    // Ensure the protocol is not part of URL, meaning its relative.
    if (href && href.slice(0, protocol.length) !== protocol &&
        href.indexOf("javascript:") !== 0) {
      // Stop the default event to ensure the link will not cause a page
      // refresh.
      evt.preventDefault();

      // `Backbone.history.navigate` is sufficient for all Routers and will
      // trigger the correct events.  The Router's internal `navigate` method
      // calls this anyways.
      Backbone.history.navigate(href, true);
    }
  });
  
    
 
});
