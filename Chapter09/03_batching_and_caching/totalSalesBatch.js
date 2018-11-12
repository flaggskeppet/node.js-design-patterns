/*
This module is just a wrapper (Decorator) around the totalSales module that
batches all ongoing calls for the same item.

Note how it exports a function with the same signature as the wrapped one,
adding functionality and invokes the original when desired.
*/
"use strict";

const totalSales = require('./totalSales');

const queues = {};
module.exports = function totalSalesBatch(item, callback) {
  if(queues[item]) {  // A request for this item is already running...
    console.log('Batching operation');
    return queues[item].push(callback); // Don´t bother querying, just add the callback to the queue and exit
  }
  
  queues[item] = [callback];  // We are still here so the queue dit not exist. Create one for this item
  
  /*
  When the callback for totalSales is invoked
  we find all other callbacks in the queue and invokes them with the result.
  */
  totalSales(item, (err, res) => {
    const queue = queues[item];  // When the request finishes get the callback queue for this item, and invoke them all.
    queues[item] = null;
    queue.forEach(cb => cb(err, res));
  });
};
