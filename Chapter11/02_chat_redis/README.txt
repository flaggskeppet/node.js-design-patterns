This sample demonstrates how to integrate a chat application using Redis as message broker

The two applications would sit behind a load balancer in a real scenario.
But this example shows how two different application servers share the same data using redis.

As pre-requisite to this sample, you first need to install Redis.
  http://redis.io/download

To try the sample install the dependencies:
  npm install

Then run (in two separate terminals):
  node app 8081
  node app 8082
  
To access the application open a browser at the address:
  http://localhost:8081

And then at the same time open another browser at the following address:
  http://localhost:8082
