
var suite = require('../lib/suite');

exports['Create and run suite with function'] = function (test) {
    var s = suite(function() {
        test.done();
    });
    
    s.run();
}

exports['Describe and run'] = function (test) {
    var s = suite();
    
    s.describe('my suite', function () {
        test.done();
    });
    
    s.run();
}

