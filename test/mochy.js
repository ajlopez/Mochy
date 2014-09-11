
var mochy = require('..');
var path = require('path');

exports['describe and run'] = function (test) {
    test.async();
    
    var value = 0;
    
    mochy.init();
    
    describe('My suite', function () {
        value++;
    });
    
    mochy.run(function (err, data) {
        test.equal(err, null);
        test.equal(data, null);
        test.equal(value, 1);
        test.done();
    });
}

exports['describe with it and run'] = function (test) {
    test.async();
    
    var value = 0;
    
    mochy.init();
    
    describe('My suite', function () {
        it('my test', function (done) {
            value++;
            done();
        });
    });
    
    mochy.run(function (err, data) {
        test.equal(err, null);
        test.equal(data, null);
        test.equal(value, 1);
        test.done();
    });
}

exports['describe with test and run'] = function (testobj) {
    testobj.async();
    
    var value = 0;
    
    mochy.init();
    
    describe('My suite', function () {
        test('my test', function (done) {
            value++;
            done();
        });
    });
    
    mochy.run(function (err, data) {
        testobj.equal(err, null);
        testobj.equal(data, null);
        testobj.equal(value, 1);
        testobj.done();
    });
}

exports['run file'] = function (test) {
    test.async();
 
    var filename = path.join(__dirname, "tests", "test01");
    
    mochy.runFile(filename, function (err, data) {
        test.equal(err, null);
        test.equal(data, null);
        var mod = require('./tests/test01');
        test.equal(mod.getValue(), 1);
        test.done();
    });
}

