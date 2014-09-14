
var EventEmitter = require('events').EventEmitter;

function Suite(fn) {
    var suites = { };
    var self = this;
    
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
            
            var options = {
                event: 'step',
                emitter: self
            };
                
            runSteps(tests, options, function (err, data) {
                if (err) {
                    cb(err, null);
                    return;
                }
                
                var options = {
                    event: 'suite',
                    emitter: self
                };
                
                runSteps(suites, options, cb);
            });
        });
    }
    
    this.describe = function (name, fn) {
        var suite = new Suite(fn);
        suite.on('suite', function (msg) { self.emit('suite', msg); });
        suite.on('step', function (msg) { self.emit('step', msg); });
        suites[name] = suite;
    }
}

Suite.prototype.__proto__ = EventEmitter.prototype;

function runSteps(steps, options, cb) {
    if (!cb) {
        cb = options;
        options = { };
    }
    
    options = options || { };
    
    var names = Object.keys(steps);
    var l = names.length;
    var k = 0;
    
    doStep();
    
    function doStep() {
        if (k >= l) {
            cb(null, null);
            return;
        }
        
        var name = names[k++];
        
        if (options.event && options.emitter)
            options.emitter.emit(options.event, name);
        
        var step = steps[name];
        
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

