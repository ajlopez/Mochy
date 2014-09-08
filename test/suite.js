
var suite = require('../lib/suite');

exports['Create and run suite with function'] = function (test) {
    test.async();
    
    var s = suite(function() {
        test.done();
    });
    
    s.run();
}

exports['Describe and run'] = function (test) {
    test.async();
    
    var s = suite();
    
    s.describe('my suite', function () {
        test.done();
    });
    
    s.run();
}

exports['Describe with it and run'] = function (test) {
    test.async();
    
    var s = suite();
    var value = 0;
    
    s.describe('my suite', function () {
        it('my test', function (done) {
            value++;
            done();
        });
    });
    
    s.run(function (err, data) {
        test.equal(err, null);
        test.equal(data, null);
        test.equal(value, 1);
        test.done();
    });
}

