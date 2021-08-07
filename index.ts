export type { TCallback, TCallLater, TCallLaters };
export { register, unregister };
export default { register, unregister };

type TCallback = (...args: any[]) => void;
type TCallLater<T extends TCallback = TCallback> = [T, Parameters<T>];
type TCallLaters = (TCallLater | void)[];

const callLaters: TCallLaters = [];
let isCalled = false;
let isRegistered = false;

function $exit(exit: boolean, signal: number) {
  if (isCalled) {
    return;
  }

  isCalled = true;

  let lastErr
  for (const el of callLaters) {
    if (el) {
      const [callback, args] = el;
      try {
        callback(...args);
      } catch (e) {
        lastErr = e
      }
    }
  }

  // ref: https://docs.python.org/3/library/atexit.html#atexit.register
  // quote: "If an exception is raised during execution of the exit handlers, a traceback is printed"
  if (lastErr) {
    console.error(lastErr)

    // quote: " After all exit handlers have had a chance to run, the last exception to be raised is re-raised"
    throw lastErr
  }

  if (exit === true) {
    process.exit(128 + signal); // eslint-disable-line unicorn/no-process-exit
  }
}

function register<T extends TCallback>(callback: T, ...args: Parameters<T>) {
  // ref: https://docs.python.org/3/library/atexit.html#atexit.register
  
  // quote: "It is possible to register the same function and arguments more than once"
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

  // quote: "This function returns func"
  return callback
}

function unregister<T extends TCallback>(callback: T) {
  // ref: https://docs.python.org/3/library/atexit.html#atexit.unregister

  // quote: "unregister() silently does nothing if func was not previously registered"
  callLaters.forEach((el, idx) => {
    // quote: "Equality comparisons (==) are used internally during unregistration, so function references do not need to have matching identities"
    if (el && el[0] === callback) {
      callLaters[idx] = undefined;
    }
  });
}
