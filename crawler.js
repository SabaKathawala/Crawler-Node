
class Crawler {
  constructor(url, maxPages) {
    this.url = url;
    this.maxPages = maxPages;
    this.visited = new Set(url);
    this.pagesToVisit = [url];
  }

  crawlForHtml() {
    console.log('super class crawler');
  }
}

module.exports = {Crawler : Crawler};
