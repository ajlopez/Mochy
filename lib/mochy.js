
var suite = require('./suite');

var st;

function init() {
    st = suite();
    global.describe = function (name, fn) { st.describe(name, fn); };
}

function run(cb) {
    st.run(cb);
}

function runFile(filename, cb) {
    init();
    require(filename);
    st.run(cb);
}

module.exports = {
    init: init,
    run: run,
    runFile: runFile
}