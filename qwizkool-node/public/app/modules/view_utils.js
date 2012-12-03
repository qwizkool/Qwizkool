define([
  "app",

  // Libs

 // Modules
  "modules/frontpage",
  "modules/header",
  "modules/footer"
  
  // Plugins
],

function(namespace, FrontPage, Header, Footer) {

  // Create a new module
  var ViewUtils = namespace.module();

  // Example extendings
  ViewUtils.simple_view = function(body_view){
      
      var front_page = new FrontPage.View();

      // Attach the tutorial to the DOM
      front_page.render(function(el) {
        $("#main").html(el);	
      });      
	  	  
      var header = new Header.View();
      header.render(function(el) {
        $("#header").html(el);
      });

      body_view.render(function(el) {
        $("#page_body").html(el);
      });

	  var footer = new Footer.View();
      footer.render(function(el) {
        $("#footer").html(el);
      });    
    };
 
  // Required, return the module for AMD compliance
  return ViewUtils;

});
