
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
        it('should run this function', function (done) {
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

exports['Describe with test and run'] = function (testobj) {
    testobj.async();
    
    var s = suite();
    var value = 0;
    
    s.describe('my suite', function () {
        test('my test', function (done) {
            value++;
            done();
        });
    });
    
    s.run(function (err, data) {
        testobj.equal(err, null);
        testobj.equal(data, null);
        testobj.equal(value, 1);
        testobj.done();
    });
}

exports['Describe with two it and run'] = function (test) {
    test.async();
    
    var s = suite();
    var values = [];;
    
    s.describe('my suite', function () {
        it('should run this function', function (done) {
            values.push(1);
            done();
        });

        it('should run this function too', function (done) {
            values.push(2);
            done();
        });
    });
    
    s.run(function (err, data) {
        test.equal(err, null);
        test.equal(data, null);
        test.equal(values.length, 2);
        test.equal(values[0], 1);
        test.equal(values[1], 2);
        test.done();
    });
}
