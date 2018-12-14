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
  getList(key, list, callback) {
    this.client.lrange(key, 0, -1, function(err, reply) {
        if(err) console.log(err);
        reply.forEach(function(val) {
          list.add(val);
        });
        callback(list);
    });
  }

  getListFromSet(key, list, callback) {
    this.client.smembers(key, function(err, reply) {
        if(err) console.log(err);
        reply.forEach(function(val) {
          list.push(val);
        });
        callback(list);
    });
  }

  getSet(key, set, callback) {

    this.client.smembers(key, function(err, reply) {
        if(err) console.log(err);
        reply.forEach(function(val) {
          set.add(val);
        });
        callback(set);
    });
  }
  sismember(key, value){
    this.client.sismember(key, value, function(err, reply) {
      return reply;
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
