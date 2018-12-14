var redis = require('redis');
var client = redis.createClient(); // this creates a new client
client.on('connect', function() {
    console.log('Redis client connected');
});
client.on('error', function (err) {
    console.log('Something went wrong ' + err);
});
//client.rpush(['my test key', 'my test value'], redis.print);
client.rpush(['frameworks', 'angularjs', 'backbone'], function(err, reply) {
    console.log(reply); //prints 2
});
