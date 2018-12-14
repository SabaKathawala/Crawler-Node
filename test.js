
var arr = [];
arr["saba"] = "kathawala";
arr["nishali"] = "dmello";
console.log(arr["saba"] === undefined);

const fs = require('./FileHelper');
var fh = new fs.FileHelper();

var RedisHelper = require('./RedisHelper');

var rs = new RedisHelper.RedisHelper();
// rs.connect();
// rs.addToSet('saba', 'uic');
// rs.addToSet('saba', 'cs');
// rs.getSet('saba');
// rs.del('https://www.cs.uic.edu-outlinks');
// rs.getSet('https://www.cs.uic.edu-outlinks');
// rs.getSet('allLinks');
// rs.quit();
var reply;
console.log(rs.sismember('crawledLinks','https://uic.edu'));
console.log(reply);
rs.quit();
const request = require('request');
const cheerio = require('cheerio');
// request('https://www.cs.uic.edu/k-tag-category/new', function (error, response, body) {
//     if(error) {
//       console.log(error);
//     }
//     console.log(response.statusCode);
//     console.log(response.headers['content-type']);
//
//
//   });
