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
var count = 1;
class UICCrawler extends Crawler.Crawler {
  constructor(url, maxPages) {
    super(url, maxPages);
  }

  crawlForHtml() {
    console.log('Crawling for UIC Domain');
    let urls = [this.url];
    let visited = new Set(this.url);


    while(count <= this.maxPages) {
      console.log(count);
      let crawlUrl = urls.shift();
      this.makeRequest(crawlUrl, urls, visited);
      sleep.sleep(2);
    }
    console.log(urls);
  }

  makeRequest(crawlUrl, urls, visited){

    request(crawlUrl, function (error, response, body) {
        if(error) {
          console.log(error);
        }
        if(response && response.statusCode === 200) {
          console.log('Succesful Request for: '+ crawlUrl );
            fs.appendFile('crawled_links.txt', crawlUrl+'\\n', function (err) {
                if (err) {
                  console.log(err);
                  console.log('Error opening file');
                }
            });

            var $ = cheerio.load(body);
            let content = $('html *').contents().map(function() {
              return (this.type === 'text') ? $(this).text()+' ' : '';
            }).get().join('');
            //temp hack for files
            fs.writeFile('pages/'+random.int(0, 5000), content, function (err) {
                if (err) {
                  console.log(err);
                  console.log('Error writing to file');
                }
            });

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
                  if(!visited.has(href.toString())) {
                    //console.log(href.toString());
                    urls.push(href);

                  }
                }
            });
          //all links parsed
          count++;
          console.log('All links parsed for: ' + crawlUrl);
        }
        //if ends
    });

    return urls;
  }

}
module.exports = {UICCrawler : UICCrawler};
