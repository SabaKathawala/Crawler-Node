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
const random = require('random');
const host = 'www.uic.edu';
const sleep = require('sleep');

const MAX_PAGES_TO_VISIT = 10;
var numPageVisited = 1;

class UICCrawler extends Crawler.Crawler {
  constructor(url, maxPages) {
    super(url, maxPages);
    console.log('Crawling for UIC Domain');
  }

  crawlForHtml(crawler) {
    var self = this;

    if(numPageVisited >= crawler.maxPages) {
      //console.log("Reached max limit of number of pages to visit.");
      return;
    }
    let nextPage = crawler.pagesToVisit.shift();
    sleep.sleep(2);
    if (crawler.visited.has(nextPage)) {
      // We've already visited this page, so repeat the crawl
      crawler.crawlForHtml(crawler);
    } else {
      // New page we haven't visited
      crawler.makeRequest(nextPage, crawler, crawler.crawlForHtml);
    }
  }

  makeRequest(crawlUrl, crawler, callback){
    var self = this;
    crawler.visited.add(crawlUrl);
    numPageVisited++;
    console.log('Visiting page: ' + crawlUrl);

    request(crawlUrl, function (error, response, body) {
        if(error) {
          console.log(crawlUrl);
          console.log('Error Request: '+ error);
          return;
        }
        if(response && response.statusCode === 200) {
          console.log('Succesful Request for: '+ crawlUrl );

            fs.appendFile('crawled_links.txt', crawlUrl+'\\n', function (err) {
                if (err) {
                  console.log('Error opening file');
                }
            });
            crawler.saveFile(body);

            let $ = cheerio.load(body);
            //get metadata about link
            let pageObject = {};
            pageObject.title = $('title').text();
            pageObject.outLinks = [];
            pageObject.url = crawlUrl;
            $('a').each(function(i, elem) {
              //take a break;

                /*
                 insert some further checks if a link is:
                 * valid
                 * relative or absolute
                 * check out the url module of node: https://nodejs.org/dist/latest-v5.x/docs/api/url.html
                */
                // check if relative:
                let href = elem.attribs.href;

                //if relative
                if(href.startsWith('#')) {
                  return true;
                }
                if(href.startsWith('/')) {
                  href = new URL(elem.attribs.href, crawlUrl);
                } else {
                  href = new URL(elem.attribs.href);
                }

                if(href.hostname === host) {
                  //remove search and hash
                  href.search = '';
                  href.hash = '';
                  //console.log(href);
                  pageObject.outLinks.push({anchorText: $(elem).text(), url: elem.attribs.href});
                  let link = href.toString();
                  link = link.replace(/\/$/, "");
                  if(!crawler.visited.has(link)) {
                    //console.log(href.toString());

                    crawler.pagesToVisit.push(link);
                    callback(crawler);
                  }
                }
            });
          //all links parsed
          console.log('All links parsed for: ' + crawlUrl);
        }
        //if ends
    });
  }

  saveFile(body) {
    let $ = cheerio.load(body);
    let content = $('html *').contents().map(function() {
      return (this.type === 'text') ? $(this).text()+' ' : '';
    }).get().join('');
    //temp hack for files
    fs.writeFile('pages/'+random.int(0, 5000), content, function (err) {
        if (err) {
          console.log('Error writing to file');
        }
    });
  }

}
module.exports = {UICCrawler : UICCrawler};
