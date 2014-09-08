
function Suite(fn) {
    var suites = { };
    
    this.run = function () {
        if (fn)
            fn();
        
        for (var n in suites)
            suites[n].run();
    }
    
    this.describe = function (name, fn) {
        suites[name] = new Suite(fn);
    }
}

module.exports = function (fn) { return new Suite(fn); }

