"use strict";

const jot = require('json-over-tcp');         //[1]

module.exports = class OfflineState {

  constructor (failsafeSocket) {
    this.failsafeSocket = failsafeSocket;
  }

  send(data) {     //[2]
    this.failsafeSocket.queue.push(data);
  }

  activate() {     //Tries to reconnect to the server.
    const retry = () => {
      setTimeout(() => this.activate(), 500);
    };

    // This is where the socket object is instantiated
    this.failsafeSocket.socket = jot.connect(
      this.failsafeSocket.options,
      () => {
        // If successful remove the retry event handler from error event.
        this.failsafeSocket.socket.removeListener('error', retry);
        this.failsafeSocket.changeState('online');
      }
    );
    // If error occurrs while connecting, try again in 500 ms
    this.failsafeSocket.socket.once('error', retry);
  }
};
