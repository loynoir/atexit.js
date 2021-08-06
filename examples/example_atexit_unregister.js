#!/usr/bin/env node
const atexit = require("atexit");

const implement = "atexit.js";

console.log(`=== ${implement} ===`);

console.log(implement, ": borrow a space ship from 👽");
atexit.register(console.log, implement, ": return a space ship ⏲");

console.log(implement, ": goto mars 🚀");
atexit.register(console.log, implement, ": went back from mars 👋");

console.log(implement, ": one night on mars 🌙");
atexit.register(console.log, implement, ": wakeup on mars 🌞");

atexit.unregister(console.log)
