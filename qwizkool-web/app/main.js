require([
  "namespace",

  // Libs
  "jquery",
  "scion",
  "use!tabs",
  "use!backbone",

  // Modules
  "order!modules/about_us",  
  "order!modules/view_utils",
  "order!modules/user",
  "order!modules/user_main",
  "order!modules/index_page",
  "modules/registration_page",
  "modules/frontpage",
  "modules/header",
  "modules/user_auth",
  "modules/footer",
  "modules/qwizbook"

],

function(namespace, $, scion, Tabs, Backbone, AboutUs, ViewUtils, User, UserMain, IndexPage, Registration, FrontPage, Header, SignOut, Footer, QwizBook) {

	// Defining the application router, you can attach sub routers here.
	var Router = Backbone.Router.extend({
		routes : {
		   "qwizbook/:id": "openQwizbook",
		   "qwizpage/:id": "openQwizpage",
			"main" : 'user_main',
			"about_us" : 'about_us',
			"register" : 'register',
			"" : 'index'
		},

		initialize : function() {
			//this.index();
			// test line
		},

		index : function(hash) {


    
      var currentUser = new User.Model();
      if (currentUser.isUserAuthenticated() === true) {
        Backbone.history.navigate("main", true);
        return;
      }
      
			var indexPage = new IndexPage.View();
			indexPage.render();
			
			// Fix for hashes in pushState and hash fragment
			if (hash && !route._alreadyTriggered) {
				// Reset to home, pushState support automatically converts hashes
				Backbone.history.navigate("", false);

				// Trigger the default browser behavior
				location.hash = hash;

				// Set an internal flag to stop recursive looping
				route._alreadyTriggered = true;
			}

		},

		register : function(hash) {
			//alert("register invoked");
			var userRegistration = new Registration.View();
			userRegistration.render();
		},

		about_us : function(hash) {
			//alert("register invoked");

			var about_us = new AboutUs.View();
			ViewUtils.simple_view(about_us);
		},

		user_main : function(hash) {
			
			//alert("user_main invoked");
			
			var currentUser = new User.Model();
			if (currentUser.isUserAuthenticated() === false) {
			  Backbone.history.navigate("", true);
			  return;
			}

		  var front_page = new FrontPage.View();

		  // Attach the tutorial to the DOM
		  front_page.render(function(el) {
			 $("#main").html(el);

			 var header = new Header.View();
			 header.render(function(el) {
				$("#header").html(el);
				var signOut = new SignOut.View();
				signOut.render(function(el) {
						$("#sign_in_form_loc").html(el);
					});

			 });
  
			 var user_main = new UserMain.View();
			 user_main.render(function(el) {
				$("#page_body").html(el);
			 
				// Show qwizbooks
				var qwizbooks = new QwizBook.Collection();
				var jqxhr = qwizbooks.fetch(  {
				
				  error: function(collection, response) {				  
					 alert("Failed to get QwizBooks!");
				  },
				  
				  success: function(collection, response) {
					 					 
					 //alert(collection.length);
																
						//alert(JSON.stringify(qwizbook));
						//alert(qwizbook.get('title'));
  
						//$("#qwizbook-list").append("<li>" + qwizbook.get('title') + "<li>");
						var qwizbookListView = new QwizBook.ListView({model: collection});
						qwizbookListView.render(function(el) {
						  $("#qwizbook-list").append(el);
						});  
				  }
				});
				
				
			 });
		  
			 
			 var footer = new Footer.View();
			 footer.render(function(el) {
				$("#footer").html(el);
			 });  			 
			 
		  });  


		},
		
		openQwizbook : function(nid) {
			//alert("qwizbook invoked");
			 var qwizbook = new QwizBook.Model();
			 qwizbook.set({id : nid});
				
			 var jqxhr = qwizbook.fetch( {
				
				  error: function(model, response) {				  
					 alert("Failed to get QwizBook!");
				  },
				  
				  success: function(model, response) {
					$("#page_body").html("<h3>" + model.get('title') + "</h3>");
					
					var scxml_body = model.get('body');
					
				   $("#page_body").append("Got qwizbook statechart" + "<br/>");
					
				   $("#page_body").append("SCXML data :" + "<br/>");
				   $("#page_body").append("<hr/>" + JSON.stringify(model.get('body')) + "<hr/>");
					
			
					var scxml_xml = $.parseXML(scxml_body.und[0].value);
					
					var scmodel = scion.documentToModel(scxml_xml);
					


                    //instantiate the interpreter
                    var interpreter = new scion.SCXML(scmodel);
						  
						  

						  interpreter.registerListener({
							 onEntry : function(stateId) {
								$("#page_body").append("Entering state :" + stateId + "<br/>");
								},
							 onExit : function(stateId) {
								$("#page_body").append("Exiting state :" + stateId + "<br/>");
								},
							 onTransition : function(sourceStateId, targetStateIds) {
								$("#page_body").append("Transitioning from state :" + sourceStateId + "<br/>");
								}
							 });						  
						  
                    //start the interpreter
                    interpreter.start();
						  
				   $("#page_body").append("Started SCXML interpreter" + "<br/>");
						  

                    //send the init event
                    interpreter.gen({name:"init",data:{foo:1}});
						  
				   $("#page_body").append("Sent init event to SCXML state-chart" + "<br/>");
						  
                   //send the init event
                    interpreter.gen({name:"next_page",data:{foo:1}});
						  
				   $("#page_body").append("Sent next_page event to SCXML state-chart" + "<br/>");
	
                   //send the init event
                    interpreter.gen({name:"success",data:{foo:1}});
						  
				   $("#page_body").append("Sent success event to SCXML state-chart" + "<br/>");
	
                  //send the init event
                    interpreter.gen({name:"next_page",data:{foo:1}});
						  
				   $("#page_body").append("Sent next_page event to SCXML state-chart" + "<br/><hr/>");
   
 
                    function handleEvent(e){
                        e.preventDefault();
                        interpreter.gen({name : e.type,data: e});
                    }

                    //connect all relevant event listeners
                    //$(rect).mousedown(handleEvent);
                    //$(document.documentElement).bind("mouseup mousemove",handleEvent);
						  

	 
				  }
				});			 
		},
		
		openQwizpage : function(nid) {
			//alert("qwizbook invoked");
			 var qwizpage = new QwizPage.Model();
			 qwizpage.set({id : nid});
				
			 var jqxhr = qwizpage.fetch( {
				
				  error: function(model, response) {				  
					 alert("Failed to get QwizPage!");
				  },
				  
				  success: function(model, response) {
					$("#page_body").html("<h3>" + model.get('title') + "</h3>");
				   $("#page_body").append("<h4>" + "SCXML data :" + "</h4>");
				   $("#page_body").append("<hr/>" + JSON.stringify(model.get('body')) + "<hr/>"); 					 
				  }
				});			 
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
		Backbone.history.start({
			pushState : false
		});

	});

	// All navigation that is relative should be passed through the navigate
	// method, to be processed by the router.  If the link has a data-bypass
	// attribute, bypass the delegation completely.
	$(document).on("click", "a:not([data-bypass])", function(evt) {
		// Get the anchor href and protcol
		var href = $(this).attr("href");
		var protocol = this.protocol + "//";

		// Ensure the protocol is not part of URL, meaning its relative.
		if (href && href.slice(0, protocol.length) !== protocol && href.indexOf("javascript:") !== 0) {
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


