
var suite = require('../lib/suite');

exports['describe emits event'] = function (test) {
    test.async();
    
    var s = suite();
    var events = [];
    
    s.describe('my suite', function () {    
    });
    
    s.on('suite', function (name) { events.push(name); });
    
    s.run(function (err, data) {
        test.equal(err, null);
        test.equal(data, null);
        test.equal(events.length, 1);
        test.equal(events[0], 'my suite');
        test.done();
    });
}

exports['it and testobj emit events'] = function (testobj) {
    testobj.async();
    
    var s = suite();
    var events = [];
    
    s.describe('my suite', function () {    
        it('my it', function (done) {
            done();
        });
        
        test('my test', function (done) {
            done();
        });
    });
    
    s.on('suite', function (name) { events.push(name); });
    s.on('step', function (name) { events.push(name); });
    
    s.run(function (err, data) {
        testobj.equal(err, null);
        testobj.equal(data, null);
        testobj.equal(events.length, 3);
        testobj.equal(events[0], 'my suite');
        testobj.equal(events[1], 'my it');
        testobj.equal(events[2], 'my test');
        testobj.done();
    });
}

exports['it and testobj emit events'] = function (testobj) {
    testobj.async();
    
    var s = suite();
    var events = [];
    
    s.describe('my suite', function () {    
        it('my it', function (done) {
            done();
        });
        
        test('my test', function (done) {
            done();
        });
    });
    
    s.on('suite', function (name) { events.push(name); });
    s.on('step', function (name) { events.push(name); });
    
    s.run(function (err, data) {
        testobj.equal(err, null);
        testobj.equal(data, null);
        testobj.equal(events.length, 3);
        testobj.equal(events[0], 'my suite');
        testobj.equal(events[1], 'my it');
        testobj.equal(events[2], 'my test');
        testobj.done();
    });
}
