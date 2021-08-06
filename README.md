### `atexit.js`

`atexit.js`, Python standard library `atexit` shipped to Node.js.

- Let you register cleanup functions.

- Executed in last-in-first-out order when exit.
  
Which means, "If you register A, B, and C, at interpreter termination time they will be run in the order C, B, A."


### Usage
```js
// for ESM
import atexit from "atexit"
// for CJS
const atexit = require("atexit");
```

```js
console.log('open outer door')
// pass arguments
atexit.register(console.log, 'close outer door')

console.log('open inner door')
// pass no argument
atexit.register(()=>console.log('close inner door'))

// Last-in-first-out
/*
open outer door
open inner door
close inner door
close outer door
*/
```

```js
// unregister
atexit.unregiter(console.log)
```


### Differece

If you want to control in first-in-first-out order, you may use [sindresorhus/exit-hook](https://www.npmjs.com/package/exit-hook).

In `atexit.js`, "it is possible to register the same function and arguments more than once", "all exit handlers have had a chance to run", just like what python standard `atexit` does.

```sh
$ examples/example_atexit.py
borrow a space ship from 👽
goto mars 🚀
one night on mars 🌙
atexit.py : wakeup on mars 🌞
atexit.py : went back from mars 👋
atexit.py : return a space ship ⏲

$ examples/example_atexit.js
borrow a space ship from 👽
goto mars 🚀
one night on mars 🌙
atexit.js : wakeup on mars 🌞
atexit.js : went back from mars 👋
atexit.js : return a space ship ⏲

$ examples/example_exit-hook.js
borrow a space ship from 👽
goto mars 🚀
one night on mars 🌙
exit-hook : return a space ship ⏲
exit-hook : went back from mars 👋
exit-hook : wakeup on mars 🌞
```

### Related & Comparison

- `atexit.js` - Last-in-first-out.

- [sindresorhus/exit-hook](https://www.npmjs.com/package/exit-hook) - First-in-first-out.

- [Python atexit](https://docs.python.org/3/library/atexit.html) - Python standard library. Last-in-first-out.

- [Golang defer](https://tour.golang.org/flowcontrol/13) - Golang standard keyword. "Deferred calls are executed in last-in-first-out order."


### Disclaimer

Modified from [sindresorhus/exit-hook](https://www.npmjs.com/package/exit-hook)