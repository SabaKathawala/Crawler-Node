var redis = require('redis');


class RedisHelper {
  constructor() {
    this.client = redis.createClient();
  }

  connect() {
    this.client.on('connect', function() {
        console.log('Redis client connected');
    });
  }

  addKey(key, value) {
    this.client.set(key, value, function(err, reply) {
        if(err) console.log(err);
    });
  }

  getKey(key) {
    this.client.get(key, function(err, reply) {
        if(err) console.log(err);
    });
  }
  addToList(key, value) {
    this.client.rpush([key, value], function(err, reply) {
        if(err) console.log(err);
    });
  }

  addToSet(key, value) {
    this.client.sadd([key, value], function(err, reply) {
        if(err) console.log(err);
    });
  }
  getList(key) {
    this.client.lrange(key, 0, -1, function(err, reply) {
        if(err) console.log(err);
        console.log(reply);
    });
  }
  getSet(key) {
    this.client.smembers(key, function(err, reply) {
        if(err) console.log(err);
        console.log(reply);
    });
  }

  quit() {
    this.client.quit();
  }

  del(key) {
    this.client.del(key);
  }
}

module.exports = {RedisHelper: RedisHelper};
