const resources = '../../resources/';
const fs = require('fs');
var data = {};

var lifBoardSize = 80;
var centerColumn = lifBoardSize / 2;
var centerRow = lifBoardSize / 2;

function getFile(resp, filename) {
    fs.readFile(resources + filename, 'utf-8', function(err, content) {
      if (err) {
        console.log(err);
        resp.status(500).send('Internal server error');
        return;
      }
      resp.send(parseLifFile(content));
    });
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
              liveCordinates.push({column: initColumn + k, row: initRow + j - 1});
            }
          }
        }
      }
    }
  }
  return {boardSize: lifBoardSize, board: liveCordinates};
}

module.exports = {
    getFile,
    parseLifFile
} 