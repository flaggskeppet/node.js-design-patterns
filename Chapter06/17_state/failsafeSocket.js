"use strict";

const OfflineState = require('./offlineState');
const OnlineState = require('./onlineState');

class FailsafeSocket {
  constructor (options) {         //[1]
    this.options = options;
    this.queue = [];
    this.currentState = null;
    this.socket = null; // Instantiated in OfflineState
    this.states = {
      offline: new OfflineState(this), // DI: States get parent class in the ctors for easy access
      online: new OnlineState(this)
    };
    this.changeState('offline');
  }

  changeState (state) { // gets the state by key from states object and calls its activate method.
    console.log('Activating state: ' + state);
    this.currentState = this.states[state];
    this.currentState.activate();
  }

  send(data) {     //[3]
    this.currentState.send(data);
  }
}

module.exports = options => {
  return new FailsafeSocket(options); // Exports a factory function, returning an instance of our FailSafeSocket class
};
