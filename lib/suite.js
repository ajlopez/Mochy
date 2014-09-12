
function Suite(fn) {
    var suites = { };
    
    this.run = function (cb) {
        if (!cb)
            cb = function () { };
            
        var tests = { };
        var befores = { };
        
        if (fn) {            
            global.it = function (name, fn) {
                tests[name] = fn;
            };
            
            global.before = function (name, fn) {
                befores[name] = fn;
            };
            
            global.test = global.it;
            
            fn();
        }

        runSteps(befores, function (err, data) {
            if (err) {
                cb(err, null);
                return;
            }
                
            runSteps(tests, function (err, data) {
                if (err) {
                    cb(err, null);
                    return;
                }
                
                runSteps(suites, cb);
            });
        });
    }
    
    this.describe = function (name, fn) {
        suites[name] = new Suite(fn);
    }
}

function runSteps(steps, cb) {
    var names = Object.keys(steps);
    var l = names.length;
    var k = 0;
    
    doStep();
    
    function doStep() {
        if (k >= l) {
            cb(null, null);
            return;
        }
        
        var step = steps[names[k++]];
        
        if (typeof step == 'object')
            step = step.run;
            
        step(function (err) {
            if (err) {
                cb(err, null);
                return;
            }
            
            setImmediate(doStep);
        });
    }
}

module.exports = function (fn) { return new Suite(fn); }

