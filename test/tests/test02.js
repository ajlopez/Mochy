
var value = 0;

describe('Suite One', function () {
    test('Test One', function (done) {
        value++;
        done();
    });
});

module.exports = {
    getValue: function () { return value; }
}