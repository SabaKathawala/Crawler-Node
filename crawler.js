
class Crawler {
  constructor(url, subPart, maxPages) {
    this.url = url;
    this.subPart = subPart;
    this.maxPages = maxPages;
    this.visited = new Set(url);
    //this.visited.add(url);
    this.pagesToVisit = [url];
  }

  crawlForHtml() {
    console.log('super class crawler');
  }
}

module.exports = {Crawler : Crawler};
