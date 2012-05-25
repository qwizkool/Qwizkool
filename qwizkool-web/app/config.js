// Set the require.js configuration for your application.
require.config({
  // Initialize the application with the main application file
  deps: ["main"],

  paths: {
    // JavaScript folders
    libs: "../assets/js/libs",
    plugins: "../assets/js/plugins",

    // Libraries
    order: "../assets/js/libs/order",
    jquery: "../assets/js/libs/jquery",
    underscore: "../assets/js/libs/underscore",
    backbone: "../assets/js/libs/backbone",
    tabs: "../assets/js/libs/tabs",

    // Shim Plugin
    use: "../assets/js/plugins/use"
  },

  use: {
    backbone: {
      deps: ["use!underscore", "jquery"],
      attach: "Backbone"
    },
  
   tabs: {
      deps: ["jquery"],
    },
    
    underscore: {
      attach: "_"
    }
  }
});
