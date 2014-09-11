
var value = 0;

describe('My suite', function () {
    test('my test', function (done) {
        value++;
        done();
    });
});

module.exports = {
    getValue: function () { return value; }
}