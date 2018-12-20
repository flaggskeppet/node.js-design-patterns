"use strict";

const uuid = require('node-uuid');

module.exports = channel => {
  const idToCallbackMap = {};  // The association between the id and the handler 
  
  channel.on('message', message => {  // Start listening for messages from channel (child process)
    // Find the handler for this id. Invoke it and provide the data
    const handler = idToCallbackMap[message.inReplyTo]; 
    if(handler) {
      handler(message.data);
    }
  });
  
  return function sendRequest(req, callback) {  // Send the request together with a corr id to channel
    const correlationId = uuid.v4();
    idToCallbackMap[correlationId] = callback;
    channel.send({
      type: 'request',
      data: req,
      id: correlationId
    });
  };
};
