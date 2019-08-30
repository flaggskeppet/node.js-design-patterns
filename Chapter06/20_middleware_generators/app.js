"use strict";

const app = require('koa')();

app.use(require('./rateLimit')); // Use the ratelimit middleware

app.use(function *(){ // The core of the app is defined in a generator function
  this.body = {"now": new Date()};
});

app.listen(3100);