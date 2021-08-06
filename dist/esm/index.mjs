var atexit_default = { register, unregister };
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
      } catch (e) {
        lastErr = e;
      }
    }
  }
  if (lastErr) {
    console.error(lastErr);
  }
  if (exit === true) {
    process.exit(128 + signal);
  }
}
function register(callback, ...args) {
  callLaters.unshift([callback, args]);
  if (!isRegistered) {
    isRegistered = true;
    process.once("exit", $exit);
    process.once("SIGINT", $exit.bind(null, true, 2));
    process.once("SIGTERM", $exit.bind(null, true, 15));
    process.on("message", (message) => {
      if (message === "shutdown") {
        $exit(true, -128);
      }
    });
  }
}
function unregister(callback) {
  callLaters.forEach((el, idx) => {
    if (el && el[0] === callback) {
      callLaters[idx] = void 0;
    }
  });
}
export {
  atexit_default as default,
  register,
  unregister
};
