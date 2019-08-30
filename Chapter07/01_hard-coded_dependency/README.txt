This sample demonstrate how to build a simple authentication server
using hard-coded dependencies.

NOTE: This version of leveldown requires an old version of node-gyp 
that does not work on node 10.x. nvm to solve this 'nvm use 8.0' fixes it.
Then do a 'npm rebuild' (performs a 'node-gyp rebuild').

To try the sample first install its dependencies:
  npm install
  
Next, populate the database with some sample users:
  node populate_db
The command above will install the following sample users:
  {username: 'alice', password: 'secret'}
  {username: 'bob', password: 'secret'}
  {username: 'trudy', password: 'secret'}
  
To start the server, run:
  node app

Now, to obtain a new authentication token run:
  curl -X POST -d '{"username": "alice", "password":"secret"}' http://localhost:3000/login -H "Content-Type: application/json"

To check the validity of a token:
  curl -X GET -H "Accept: application/json" http://localhost:3000/checkToken?token=<TOKEN HERE>   
