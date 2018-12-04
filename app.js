
const UICCrawler = require('./UICCrawler');

var base = 'www.uic.edu';
var firstLink = 'http://' + base;

var crawler = new UICCrawler.UICCrawler(firstLink, 10);
crawler.crawlForHtml(crawler);


//1. crawler -> pages (uic.edu) (3000 pages)
//1a. Put all the links in the file - so that you can run it again and
// can have all the pages that you have already downloaded
