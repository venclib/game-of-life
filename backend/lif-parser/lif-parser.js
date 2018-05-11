const resources = '../../resources/';
const fs = require('fs');
var data = {};

var centerColumn = 40;
var centerRow = 40;

function readFiles() {
  fs.readdir(resources, function(err, filenames) {
    if (err) {
      console.log(err);
      throw err;
    }
    filenames.forEach(function(filename) {
      fs.readFile(resources + filename, 'utf-8', function(err, content) {
        if (err) {
          throw err;
        }
        data[filename] = parseLifFile(content);
      });
    });
  });
  return data;
}

function parseLifFile(content) {
  var liveCordinates = [];
  var splitedFile = content.split('#P ');
  for (var i = 1; i < splitedFile.length; i++) {
    var splittedLine = splitedFile[i].split('\n');
    for (var j = 0; j < splittedLine.length; j++) {
      var liveCell;
      if (j == 0) {
        var initCordinates = splittedLine[j].split(' ');
        var initRow = centerRow + parseInt(initCordinates[0]);
        var initColumn = centerColumn + parseInt(initCordinates[1]);
      } else {
        var line = splittedLine[j];
        if (line) {
          for (var k = 0; k < line.length; k++) {
            if (line.substring(k, k+1) == '*') {
              liveCordinates.push({column: initColumn + j - 1, row: initRow + k});
            }
          }
        }
      }
    }
  }
  return liveCordinates;
}

module.exports = {
    readFiles
} 