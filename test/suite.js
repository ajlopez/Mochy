
var suite = require('../lib/suite');

exports['Create and run suite with function'] = function (test) {
    var s = suite(function() {
        test.done();
    });
    
    s.run();
}

