
function Suite(fn) {
    var suites = { };
    
    this.run = function (cb) {
        if (fn) {
            var tests = { };
            
            global.it = function (name, fn) {
                tests[name] = fn;
            };
            
            fn();
            
            var names = Object.keys(tests);
            var l = names.length;
            var k = 0;
            
            doTestStep();
            
            function doTestStep() {
                if (k >= l) {
                    setImmediate(runSuites);
                    return;
                }
                
                var test = tests[names[k++]];
                
                test(function (err) {
                    if (err) {
                        cb(err, null);
                        return;
                    }
                    
                    setImmediate(doTestStep);
                });
            }
        }
        else
            runSuites();
            
        function runSuites() {
            var names = Object.keys(suites);
            var l = names.length;
            var k = 0;
            
            doSuiteStep();
            
            function doSuiteStep() {
                if (k >= l) {
                    if (cb)
                        cb(null, null);
                    return;
                }
                
                var suite = suites[names[k++]];
                
                suite.run(function (err) {
                    if (err)
                        cb(err, null);
                    else
                        setImmediate(doSuiteStep);
                });
            }
        }
    }
    
    this.describe = function (name, fn) {
        suites[name] = new Suite(fn);
    }
}

module.exports = function (fn) { return new Suite(fn); }

