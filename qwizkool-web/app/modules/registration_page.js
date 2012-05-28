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

  // Registration extendings
  RegistrationPage.Model = Backbone.Model.extend({ /* ... */ });
  RegistrationPage.Collection = Backbone.Collection.extend({ /* ... */ });
  RegistrationPage.Router = Backbone.Router.extend({ /* ... */ });

  // This will fetch the tutorial template and render it.
  RegistrationPage.View = Backbone.View.extend({

      initialize: function(){
            this.front_page = new FrontPage.View();
            this.header = new Header.View();
            this.registration = new Registration.View();
            this.footer = new Footer.View();
            
            this.registration.on("registration-attempted",
                                      this.registrationHandler, this);
      },
      
      render: function(done) {
      
            // Render the top level structure.    
            this.front_page.render(function(el) {
                  $("#main").html(el);	
            });      
            
            // Render the Header.     
            this.header.render(function(el) {
                  $("#header").html(el);
            });
            
            // Render the Page content.     
            this.registration.render(function(el) {
                  $("#page_body").html(el);
            });
            
            // Render the Footer..     
            this.footer.render(function(el) {
                  $("#footer").html(el);
            });    
      
      },
      
      registrationHandler: function(){
          //  alert("Hello world");
         // Render the Page content.     
            this.registration.render(function(el) {
                  $("#page_body").html(el);
            });
   	
      }
  });

  // Required, return the module for AMD compliance
  return RegistrationPage;

});
