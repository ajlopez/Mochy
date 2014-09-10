
var mochy = require('..');

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