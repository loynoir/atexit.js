#!/usr/bin/env python3
import atexit

implement = 'atexit.py'

print(f'=== {implement} ===')

print(implement, ': borrow a space ship from 👽')
atexit.register(print, implement, ': return a space ship ⏲')

print(implement, ': goto mars 🚀')
atexit.register(print, implement, ': went back from mars 👋')

print(implement, ': one night on mars 🌙')
atexit.register(print, implement, ': wakeup on mars 🌞')
