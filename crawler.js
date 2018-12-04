
class Crawler {
  constructor(url, maxPages) {
    this.url = url;
    this.maxPages = maxPages;
  }

  crawlForHtml() {
    console.log('super class crawler');
  }
}

module.exports = {Crawler : Crawler};
