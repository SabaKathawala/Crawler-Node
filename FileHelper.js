const fs = require('fs');

class FileHelper {
  constructor() {
    let fill = '0\n';
    for(let i=0; i<30; i++) {
      fill += "0\n";
    }
    this.saveFile('outlinks.txt', fill);
    this.saveFile('inlinks.txt', fill);
    this.saveFile('anchorText.txt', fill);
  }

  appendToLineInFile(filePath, lineNumber, string) {
    let self = this;
    fs.readFile(filePath, function(err, data) {
      let content = data.toString().split("\n");
    //console.log(filePath + " " + lineNumber + " " + string);
      console.log('Before: '+ content[lineNumber-1]);
      content[lineNumber-1] +=  " " + string + " ";
      //content.splice(lineNumber, 0, string + " ");
      console.log('After: '+content);
      let text = content.join("\n");

    //  console.log(text);
      self.saveFile(filePath, text);
      //console.log(text.split("\n")[lineNumber-1]);
    });
    //The splice() method changes the contents of an array by removing existing
    //elements and/or adding new elements

  }
  appendToFile(filePath, string) {
    fs.appendFile(filePath, string + "\n", function (err) {
        if (err) {
          console.log(err);
          return;
        }
        //console.log("Added link to " + filePath);

    });
  }

  saveFile(filePath, string) {
    fs.writeFile(filePath, string, function (err) {
        if (err) {
          console.log(err);
          return;
        }
        //console.log("Added content to " + filePath);

    });
  }
}

module.exports = {FileHelper: FileHelper};
