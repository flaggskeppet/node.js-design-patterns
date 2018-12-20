"use strict";

/*
Note how the UMD module is defined as an anonyous self-executing function.
It accepts a root object and a factory (a function)
*/
(function(root, factory) {           // module definition
  if(typeof define === 'function' && define.amd) {   // Check if amd is available
    define(['mustache'], factory);
  } else if(typeof module === 'object' &&       // Check if this is a CommonJS environment (node)
    typeof module.exports === 'object') {
    var mustache = require('mustache');
    module.exports = factory(mustache);
  } else {                 //We have nothing fancy. Just use Mustache wich is in the global scope
    root.UmdModule = factory(root.Mustache);
  }
}(this, function(mustache) {           // Invoke the wrapper function provide the root (window in the browser)
  var template = '<h1>Hello <i>{{name}}</i></h1>';
  mustache.parse(template);

  return { // The api method of the module
    sayHello:function(toWhom) {
      return mustache.render(template, {name: toWhom});
    }
  };
}));
