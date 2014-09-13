
var suite = require('../lib/suite');

exports['Describe emit event'] = function (test) {
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
