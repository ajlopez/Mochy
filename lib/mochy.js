
var suite = require('./suite');

var st;

function init() {
    st = suite();
    global.describe = function (name, fn) { st.describe(name, fn); };
}

function run(cb) {
    st.run(cb);
}

function runFile(filename, listener, cb) {
    if (!cb) {
        cb = listener;
        listener = null;
    }
    
    init();
    
    for (var n in listener) {
        var fn = listener[n];
        
        if (typeof fn != 'function')
            continue;

        st.on(n, fn);
    }

    require(filename);
    st.run(cb);
}

module.exports = {
    init: init,
    run: run,
    runFile: runFile
}