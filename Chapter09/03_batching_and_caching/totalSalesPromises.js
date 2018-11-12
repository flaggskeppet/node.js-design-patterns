/*
Both batching and caching but with promises!
*/
"use strict";

const pify = require('pify');  
const totalSales = pify(require('./totalSales')); // Note that we are promisifying the totalSales function!

const cache = {};
module.exports = function totalSalesPromises(item) {
  if (cache[item]) {  // Check if a cached promise already exists for this item
    return cache[item]; // If so, just return it
  }

    // We don´t have a promise for this item, invoke the totalSales api and
    // store the promise in the cache
  cache[item] = totalSales(item)
    .then(res => { // These two lines are the batching part. Multiple then listeners can be attached to the same promise
      setTimeout(() => {delete cache[item]}, 30 * 1000); //30 seconds expiry
      return res; // Return the result to any other listener attached to the promise
    })
    .catch(err => {  // Reset the cache on error and rethrow so any other listener recieves this error
      delete cache[item];
      throw err;
    });
  return cache[item];  // Return the cached promise
};
