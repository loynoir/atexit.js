#!/usr/bin/env node
const exitHook = require("exit-hook");

const implement = "exit-hook";

console.log(`=== ${implement} ===`);

console.log(implement, ": borrow a space ship from 👽");
exitHook(() => console.log(implement, ": return a space ship ⏲"));

console.log(implement, ": goto mars 🚀");
exitHook(() => console.log(implement, ": went back from mars 👋"));

console.log(implement, ": one night on mars 🌙");
exitHook(() => console.log(implement, ": wakeup on mars 🌞"));
