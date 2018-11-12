"use strict";

const EventEmitter = require('events').EventEmitter;

class SubsetSumDefer extends EventEmitter {
  constructor(sum, set) {
    super();
    this.sum = sum;
    this.set = set;
    this.totalSubsets = 0;
  }

  /*
  This method is the core of the pattern. Use setIntermediate to execute the function
  after any pending I/O requests.
  Much like the asynchroun parallell execution in chapter 3
  */
  _combineInterleaved(set, subset) {
    this.runningCombine++; // We have a new started invocation
    setImmediate(() => { // Add the function to the queue (much like adding it to setTimeOut, 0
      this._combine(set, subset);
      if(--this.runningCombine === 0) {
        this.emit('end'); // We have no running tasks left 
      }
    });
  }

  _combine(set, subset) {
    for(let i = 0; i < set.length; i++) {
      let newSubset = subset.concat(set[i]);
      this._combineInterleaved(set.slice(i + 1), newSubset);
      this._processSubset(newSubset);
    }
  }

  _processSubset(subset) {
    console.log('Subset', ++this.totalSubsets, subset);
    const res = subset.reduce((prev, item) => prev + item, 0);
    if(res == this.sum) {
      this.emit('match', subset);
    }
  }

  start() {
    this.runningCombine = 0;
    this._combineInterleaved(this.set, []);
  }
}

module.exports = SubsetSumDefer;
