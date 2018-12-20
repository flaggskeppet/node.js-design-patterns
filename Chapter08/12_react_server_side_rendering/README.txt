This example shows how to render on the server a react powered application

Before running the examples you need to install the dependencies with:

  npm install

Then you need to run the server using babel-cli (necessary to parse jsx code):

  node_modules/.bin/babel-cli server.js 
  
  JOMT: Above does not work use: node_modules/.bin/babel-node server.js

Finally you can point your browser to http://localhost:3000 to see the rendered
app. Note that it is ONLY rendered on the server.
