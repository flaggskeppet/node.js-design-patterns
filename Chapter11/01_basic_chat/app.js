"use strict";

const WebSocketServer = require('ws').Server;

//static file server. Serves static files using middleware ecstatic
const server = require('http').createServer(  
  require('ecstatic')({root: `${__dirname}/www`})
);

const wss = new WebSocketServer({server: server});  // Create instance of WebSocketServer and attach to our file server
wss.on('connection', ws => {
  console.log('Client connected');
  ws.on('message', msg => {  // Broadcast an incoming event to all listening clients
    console.log(`Message: ${msg}`);
    broadcast(msg);
  });
});

function broadcast(msg) {  // Iterate over all clients and invoke send on them
  wss.clients.forEach(client => {
    client.send(msg);
  });
}

server.listen(process.argv[2] || 8080);
