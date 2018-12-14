
const url = require('url');
const request = require('request');
const cheerio = require('cheerio');
const sleep = require('sleep');
const RedisHelper = require ('./RedisHelper');
var redisHelper = new RedisHelper.RedisHelper();

redisHelper.getSet('crawledLinks', new Set(), function(set) {
    //console.log(set);
    set.forEach(function(crawlUrl) {
      console.log(crawlUrl);
      request(crawlUrl, function (error, response, body) {
          if(error) {
            console.log('Error for:' + error);
            console.log('Error for:' + crawlUrl);
            return;
          }
          sleep.sleep(2);
          if(response)
          {
              let $ = cheerio.load(body);
              let title = $("head title").text();
              redisHelper.addKey(crawlUrl + "-title", title);
            }
        });
    });

});
