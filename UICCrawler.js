// core modules
const fs = require('fs');
const url = require('url');

// third party modules
const _ = require('lodash');
const async = require('async');
const cheerio = require('cheerio');
const request = require('request');
const parser = require('url-parser');
const Crawler = require ('./Crawler');
const RedisHelper = require ('./RedisHelper');
const random = require('random');
const host = 'www.uic.edu';
const sleep = require('sleep');

const MAX_PAGES_TO_VISIT = 10;
var numPageVisited = 1;
var mapLinksToLine = [];
var line = 1;
class UICCrawler extends Crawler.Crawler {
  constructor(url, subPart, maxPages) {
    super(url, subPart, maxPages);
    this.redisHelper = new RedisHelper.RedisHelper();
    console.log('Crawling UIC Domain');
  }

  crawlForHtml(crawler) {
    console.log(numPageVisited);
    if(numPageVisited > crawler.maxPages) {
      //console.log("Reached max limit of number of pages to visit.");
      crawler.redisHelper.quit();
      return;
    }
    let nextPage = crawler.pagesToVisit.shift();
    if (crawler.visited.has(nextPage)) {
      // We've already visited this page, so repeat the crawl
      crawler.crawlForHtml(crawler);
    } else {
      sleep.sleep(2);
      // New page we haven't visited
      crawler.makeRequest(nextPage, crawler, crawler.crawlForHtml);
    }
  }

  makeRequest(crawlUrl, crawler, callback){
    var self = this;
    console.log('Visiting page: ' + crawlUrl);

    request(crawlUrl, function (error, response, body) {
        if(error) {
          console.log('Error for:' + crawlUrl);
          console.log(error);
          callback(crawler);
          return;
        }
        if(response && response.statusCode !== 200) {
          //don't visit such pages again
          crawler.visited.add(crawlUrl);
          console.log('Couldn\'t crawl ' + crawlUrl + ': ' response.statusCode);
          callback(crawler);
          return;
        }
        console.log('Successful Request for: '+ crawlUrl );
        numPageVisited++;

        let $ = cheerio.load(body);
        let content = $('body *').contents().map(function() {
          return (
            (this.parent !== 'script' && this.parent !== 'style')
            && this.type === 'text') ? $(this).text().trim()+'\n' : '';
        }).get().join('');
        crawler.redisHelper.addKey(crawlUrl + "-html", content);
        $('a').each(function(i, elem) {
            /*
             insert some further checks if a link is:
             * valid
             * relative or absolute
             */
            let href = elem.attribs.href;
            if(href === undefined || href === '' || href.startsWith('#') || href === 'javascript:void(0);') {
              return true;
            }
            try {
              if(href.startsWith('/') || !href.startsWith('http')) {
                href = new URL(elem.attribs.href, crawlUrl);
              } else {
                href = new URL(elem.attribs.href);
              }
            } catch(err) {
              console.log(err);
              return true;
            }

            if(href.hostname.endsWith(crawler.subPart)) {
                //remove search and hash
                href.search = '';
                href.hash = '';
                //console.log(href);
                let link = href.toString();
                link = link.replace(/\/$/, "");

                //save to outlinks, inlinks, anchorText
                crawler.redisHelper.addToSet('allLinks', link);
                crawler.redisHelper.addToSet(crawlUrl + "-outlinks", link);
                crawler.redisHelper.addToSet(link + "-inlinks",  crawlUrl);
                crawler.redisHelper.addToSet(link +"-anchors", $(elem).text());
                if(!crawler.visited.has(link)) {
                  crawler.pagesToVisit.push(link);
                }
            }
        });
        crawler.visited.add(crawlUrl);
        //save link to file
        crawler.redisHelper.addToSet('allLinks', crawlUrl);
        crawler.redisHelper.addToSet('crawledLinks', crawlUrl);
        //all links parsed
        console.log('All links parsed for: ' + crawlUrl);
        callback(crawler);
        //if ends
    });
  }

}
module.exports = {UICCrawler : UICCrawler};
