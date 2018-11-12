/*
The processpool represents a pool of running processes.

Because starting a new process is expensive so we keep em running and ready.
*/

"use strict";

const fork = require('child_process').fork;

class ProcessPool {
  constructor(file, poolMax) {
    this.file = file;
    this.poolMax = poolMax;
    this.pool = []; // Running processes ready to be used 
    this.active = []; // Processes currently being used
    this.waiting = []; // A queue of callbacks for those requests that could not be fulfilled immediately
  }

  acquire(callback) {
    let worker;
    // If we have a process in pool ready to be used, move it to the active list and
    // return it by invoking callback (in the next tick)
    if(this.pool.length > 0) {  
      worker = this.pool.pop();
      this.active.push(worker);
      return process.nextTick(callback.bind(null, null, worker));
    }

    // No processes available. Add it to the waiting list
    if(this.active.length >= this.poolMax) { 
      return this.waiting.push(callback);
    }

    // We have not reached maximum number of processes, create a new one.
    // Add to active list and return it to the caller using the callback
    worker = fork(this.file);  
    this.active.push(worker);
    process.nextTick(callback.bind(null, null, worker));
  }

  release(worker) {
    if(this.waiting.length > 0) {  // [1]
      const waitingCallback = this.waiting.shift();
      waitingCallback(null, worker);
    }
    this.active = this.active.filter(w => worker !==  w);  // [2]
    this.pool.push(worker);
  }
}

module.exports = ProcessPool;
