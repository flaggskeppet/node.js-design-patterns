"use strict";

const http = require('http');
const servers = [
  {host: 'localhost', port: '8081'},
  {host: 'localhost', port: '8082'}
];

let i = 0;

// This function wraps the original http.request and adds load balancing to it
module.exports = (options, callback) => {
  i = (i + 1) % servers.length; // % 2 : The remains after deviding with 2. Will switch between 0 & 1
  options.hostname = servers[i].host;
  options.port = servers[i].port;
  
  return http.request(options, callback);
};
