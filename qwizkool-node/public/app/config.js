// Set the require.js configuration for your application.
require.config({

  // Initialize the application with the main application file and the JamJS
  // generated configuration file.
  deps: ["../vendor/jam/require.config", "main"],

  paths: {
    // Put paths here.
      tabs: "../assets/js/libs/tabs",
      scion: "../assets/js/libs/SCION/lib/browser/SCXML",
      core_scxml: "../assets/js/libs/SCION/lib/core/scxml/SCXML",
      jsonml_dom: "../assets/js/libs/SCION/lib/external/jsonml/jsonml-dom",
      annotate_scxml_json: "../assets/js/libs/SCION/lib/core/util/annotate-scxml-json",
      json2model: "../assets/js/libs/SCION/lib/core/scxml/json2model",
      array_set: "../assets/js/libs/SCION/lib/core/scxml/set/ArraySet",
      state_kinds_enum: "../assets/js/libs/SCION/lib/core/scxml/state-kinds-enum",
      setup_default_opts: "../assets/js/libs/SCION/lib/core/scxml/setup-default-opts",
      scxml_dynamic_name_match_transition_selector: "../assets/js/libs/SCION/lib/core/scxml/scxml-dynamic-name-match-transition-selector",
      scxml_model: "../assets/js/libs/SCION/lib/core/scxml/model"
  },

  shim: {
    // Put shims here.
      tabs: {
          deps: ["jquery"]
      }
  }

});
