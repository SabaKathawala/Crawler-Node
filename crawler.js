
class Crawler {
  constructor(url, subPart, maxPages) {
    this.url = url;
    this.subPart = subPart;
    this.maxPages = maxPages;
    this.pagesToVisit = [url];
  }

  crawlForHtml() {
    console.log('super class crawler');
  }
}

module.exports = {Crawler : Crawler};
