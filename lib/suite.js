
function Suite(fn) {
    this.run = function () {
        fn();
    }
}

module.exports = function (fn) { return new Suite(fn); }

