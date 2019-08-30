"use strict";

const RandomStream = require('./randomStream');
const randomStream = new RandomStream();

randomStream.on('readable', () => { // it's an eventemitter
  let chunk;
  while((chunk = randomStream.read()) !== null) { // read from the stream while there is anything
    console.log(`Chunk received: ${chunk.toString()}`);
  }
});
