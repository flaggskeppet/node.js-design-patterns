"use strict";

const stream = require('stream');
const Chance = require('chance');

const chance = new Chance();

class RandomStream extends stream.Readable {
  constructor(options) {
    super(options);
  }

  // All readable streams needs to implement this private method
  _read(size) {
    const chunk = chance.string();          //Use chance to generate a random string
    console.log(`Pushing chunk of size: ${chunk.length}`);
    this.push(chunk, 'utf8');             //using the push method pushes to the stream
    if(chance.bool({likelihood: 5})) {    //puhs null to stream. Client will close stream when this happens.
      this.push(null);
    }
  }
}

module.exports = RandomStream;