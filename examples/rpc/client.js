var when = require('when')
  , wamp = require('../../lib/wamp.io');

/**
 * Attach wamp
 */
 
// activate debug for 
wamp.debug(true, true);

var i = 0;
var run = function() {
  console.log("-------------------", i++);
  var app = wamp.connect('ws://localhost:9000',
      // WAMP session was established
      function (session) 
      {
        console.log('new wamp session');
      
        session.call("test:isEven", 2)      
          .promise.then(
              // RPC success callback
              function (reply)
              {
                console.log("result: " + reply);
                process.nextTick(function() {
                  session.close();
                  run();
                });
              },

              // RPC error callback
              function (error, desc) 
              {        
                console.log("error: " + desc);
                process.nextTick(function() {
                  session.close();
                  run();
                });
                
              
              }
          );      
      },

      // WAMP session is gone
      function (session) 
      {
        console.log('wamp session is gone');
      }
    );
};

run();
