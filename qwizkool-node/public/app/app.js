define([
    "backbone.layoutmanager"
], function () {

    // Provide a global location to place configuration settings and module
    // creation.
    var app = {
        // The root path to run the application.
        root:"/"
    };

    // Localize or create a new JavaScript Template object.
    var JST = window.JST = window.JST || {};

    // Configure LayoutManager with Backbone Boilerplate defaults.
    Backbone.LayoutManager.configure({
        // Allow LayoutManager to augment Backbone.View.prototype.
        manage:false,

        prefix:"app/templates/",

        fetch:function (path) {
            // Concatenate the file extension.
            path = path + ".html";

            // If cached, use the compiled template.
            if (JST[path]) {
                return JST[path];
            }

            // Put fetch into `async-mode`.
            var done = this.async();

            // Seek out the template asynchronously.
            $.get(app.root + path, function (contents) {
                done(JST[path] = _.template(contents));
            });
        }
    });

    // Mix Backbone.Events, modules, and layout management into the app object.
    return _.extend(app, {
        // Create a custom object with a nested Views object.
        module:function (additionalProps) {
            return _.extend({ Views:{} }, additionalProps);
        },
        // Added from previous version for compatibility.
        // TODO: Use native requi.js loading or use lay out manager
        // technique.
        fetchTemplate:function (path, done) {
            var JST = window.JST = window.JST || {};
            var def = new $.Deferred();

            // Should be an instant synchronous way of getting the template, if it
            // exists in the JST object.
            if (JST[path]) {
                if (_.isFunction(done)) {
                    done(JST[path]);
                }

                return def.resolve(JST[path]);
            }

            // Fetch it asynchronously if not available from JST, ensure that
            // template requests are never cached and prevent global ajax event
            // handlers from firing.
            $.ajax({
                url:path,
                type:"get",
                dataType:"text",
                cache:false,
                global:false,

                success:function (contents) {
                    JST[path] = _.template(contents);

                    // Set the global JST cache and return the template
                    if (_.isFunction(done)) {
                        done(JST[path]);
                    }

                    // Resolve the template deferred
                    def.resolve(JST[path]);
                }
            });

            // Ensure a normalized return value (Promise)
            return def.promise();
        },
        // Helper for using layouts.
        useLayout:function (options) {
            // Create a new Layout with options.
            var layout = new Backbone.Layout(_.extend({
                el:"body"
            }, options));

            // Cache the refererence.
            return this.layout = layout;
        }
    }, Backbone.Events);

});
