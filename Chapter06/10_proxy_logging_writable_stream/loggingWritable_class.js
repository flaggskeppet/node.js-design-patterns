"use strict";
const fs = require('fs');

function createLoggingWritable(writableOrig) { // Factory that creates a proxied version of writeable stream

  class LoggingWritable {
  constructor(writableOrig) {
    this.writableOrig = writableOrig;
  }

  write(chunk, encoding, callback) {
    if(!callback && typeof encoding === 'function') {
      callback = encoding;
      encoding = undefined;
    }
    console.log('Writing ', chunk);
    return this.writableOrig.write(chunk, encoding, function() {
      console.log('Finished writing ', chunk);
      callback && callback();
    });
  };

  on() { // delegate eventemitter events to subject
    return this.writableOrig.on.apply(this.writableOrig, arguments);
  };

  end() {
    return this.writableOrig.end.apply(this.writableOrig, arguments);
  };
}

  return new LoggingWritable(writableOrig);
}

const writable = fs.createWriteStream('test.txt');
const writableProxy = createLoggingWritable(writable);

writableProxy.on('close', () => console.log('Stream was closed'));
writableProxy.write('First chunk');
writableProxy.write('Second chunk');
writable.write('This is not logged');
writableProxy.end();
