/*
This module has both caching and batching
Caching: Returns callbacks for cached items ( eg "queries")
Batching: Finds running callbacks for an item and invokes the when a result is returned.
*/

"use strict";

const totalSales = require('./totalSales');

const queues = {};
const cache = {};

module.exports = function totalSalesBatch(item, callback) {
  const cached = cache[item];
  if (cached) {
    console.log('Cache hit');
    // In a non-blocking manner add the callback to be invoked at next tick: 
    return process.nextTick(callback.bind(null, null, cached)); //callback.bind(context, error, res)
  }
  
  if (queues[item]) { 
    console.log('Batching operation');
    return queues[item].push(callback);
  }
  
  queues[item] = [callback]; 
  totalSales(item, (err, res) => {
    if (!err) {
      cache[item] = res; // Add the result to the cache
      setTimeout(() => {
        delete cache[item];
      }, 30 * 1000); //30 seconds cache expiry
    }
    
    const queue = queues[item];
    queues[item] = null;
    queue.forEach(cb => cb(err, res));
  });
};
