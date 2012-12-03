

require.config({
    baseUrl:"../../app/",

    deps:["../vendor/jam/require.config"],

    paths:{
        jasmine:'../test/lib/jasmine',
        'jasmine-html':'../test/lib/jasmine-html',
        spec:'../test/jasmine/spec/'
    },
    shim:{

        jasmine:{
            exports:'jasmine',
            deps:['jquery', 'lodash']
        },

        'jasmine-html':{
            deps:['jasmine'],
            exports:'jasmine'
        }
    }
});


window.store = "TestStore"; // override local storage store name - for testing

require(['jasmine-html'], function (jasmine) {

    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;

    var htmlReporter = new jasmine.HtmlReporter();

    jasmineEnv.addReporter(htmlReporter);

    jasmineEnv.specFilter = function (spec) {
        return htmlReporter.specFilter(spec);
    };

    var specs = [];

    //specs.push('spec/example');
    specs.push('spec/models/UserSpec');
    /*
     specs.push('spec/views/ClearCompletedSpec');
     specs.push('spec/views/CountViewSpec');
     specs.push('spec/views/FooterViewSpec');
     specs.push('spec/views/MarkAllSpec');
     specs.push('spec/views/NewTaskSpec');
     specs.push('spec/views/TaskListSpec');
     specs.push('spec/views/task/TaskViewSpec');
     specs.push('spec/views/task/ViewTaskViewSpec');
     specs.push('spec/views/task/EditTaskViewSpec');*/

    // Start the tests
    (function ($) {
        require(specs, function () {
            jasmineEnv.execute();
        });
    })(jQuery);

});

