#!/usr/bin/env node
import atexit from "atexit";

const implement = "atexit.mjs";

console.log(`=== ${implement} ===`);

console.log(implement, ": borrow a space ship from 👽");
atexit.register(console.log, implement, ": return a space ship ⏲");

console.log(implement, ": goto mars 🚀");
atexit.register(console.log, implement, ": went back from mars 👋");

console.log(implement, ": one night on mars 🌙");
atexit.register(console.log, implement, ": wakeup on mars 🌞");
