"use strict";

module.exports = function levelSubscribe(db) {
  db.subscribe = (pattern, listener) => {       // Attach the function directly on the subject (object augmentation)
    db.on('put', (key, val) => {         // Listen on the put event
      const match = Object.keys(pattern).every(
        k => (pattern[k] === val[k])     // Make sure everything in the pattern matches incoming object
      );
      
      if(match) {
        listener(key, val);            // Execute the listener
      }
    });
  };
  return db;
};
