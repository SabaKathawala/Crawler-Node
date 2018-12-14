const RedisHelper = require ('./RedisHelper');
let redisHelper = new RedisHelper.RedisHelper();
redisHelper.connect();
let visited = new Set();


redisHelper.quit();
