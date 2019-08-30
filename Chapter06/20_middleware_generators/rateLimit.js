"use strict";

const lastCall = new Map(); // A map is an excellent in-memory db for key/value pairs

module.exports = function *(next) {

  // inbound (or downstream)
  const now = new Date();
  if (lastCall.has(this.ip) && now.getTime() - lastCall.get(this.ip).getTime() < 1000) {
    return this.status = 429; // Too Many Requests
  }

  yield next; // Executes the main function

  // outbound (or upstream)
  lastCall.set(this.ip, now);
  this.set('X-RateLimit-Reset', now.getTime() + 1000);
};
