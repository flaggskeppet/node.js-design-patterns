"use strict";

const WebSocketServer = require('ws').Server;
// Get the redis package and create two connections in sub vs pub mode
const redis = require("redis");
const redisSub = redis.createClient(); 
const redisPub = redis.createClient();

//static file server
const server = require('http').createServer(
  require('ecstatic')({root: `${__dirname}/www`})
);

const wss = new WebSocketServer({server: server});
wss.on('connection', ws => {
  console.log('Client connected');
  //When a message is received from a connected client, publish in the chat_message channel
  ws.on('message', msg => { 
    console.log(`Message: ${msg}`);
    redisPub.publish('chat_messages', msg);
  });
});

// Subscribe to the channel to recieve all messages puslished and broadcast it to the clients connected to 
// the current websocker server.
redisSub.subscribe('chat_messages');
redisSub.on('message', (channel, msg) => {
  wss.clients.forEach((client) => {
    client.send(msg);
  });
});

server.listen(process.argv[2] || 8080);
