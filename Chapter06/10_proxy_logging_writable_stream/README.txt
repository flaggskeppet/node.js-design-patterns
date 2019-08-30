This example illustrates how to create a proxy using prototypes.
In this case we apply the proxy to a writable stream and we use it to enhance the write method and log the operation
in the console.

To run the example simply execute:

  node loggingWritable

Why is the prototype approach better in this case?
Because we can set up an inheritance in run time, when the proxy object is instantiated

const proto = Object.getPrototypeOf(writableOrig);
LoggingWritable.prototype = Object.create(proto);

vs 