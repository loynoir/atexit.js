"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unregister = exports.register = void 0;
exports.default = { register, unregister };
const callLaters = [];
let isCalled = false;
let isRegistered = false;
function $exit(exit, signal) {
    if (isCalled) {
        return;
    }
    isCalled = true;
    let lastErr;
    for (const el of callLaters) {
        if (el) {
            const [callback, args] = el;
            try {
                callback(...args);
            }
            catch (e) {
                lastErr = e;
            }
        }
    }
    // ref: https://docs.python.org/3/library/atexit.html#atexit.register
    // If an exception is raised during execution of the exit handlers, a traceback is printed
    if (lastErr) {
        console.error(lastErr);
    }
    if (exit === true) {
        process.exit(128 + signal); // eslint-disable-line unicorn/no-process-exit
    }
}
function register(callback, ...args) {
    callLaters.unshift([callback, args]);
    if (!isRegistered) {
        isRegistered = true;
        process.once("exit", $exit);
        process.once("SIGINT", $exit.bind(null, true, 2));
        process.once("SIGTERM", $exit.bind(null, true, 15));
        // PM2 Cluster shutdown message. Caught to support async handlers with pm2, needed because
        // explicitly calling process.exit() doesn't trigger the beforeExit event, and the exit
        // event cannot support async handlers, since the event loop is never called after it.
        process.on("message", (message) => {
            if (message === "shutdown") {
                $exit(true, -128);
            }
        });
    }
}
exports.register = register;
function unregister(callback) {
    // ref: https://docs.python.org/3/library/atexit.html#atexit.unregister
    // unregister() silently does nothing if func was not previously registered
    callLaters.forEach((el, idx) => {
        if (el && el[0] === callback) {
            callLaters[idx] = undefined;
        }
    });
}
exports.unregister = unregister;
