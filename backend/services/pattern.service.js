var Pattern = require('../models/pattern.model')
const resources = '../../resources';
const fs = require('fs');

function getPatternNames(resp) {
    var files = [];
    findAllPatternsFromDB().then(function(result) {
        result.forEach(function(item) {
            files.push({name: item.name, id: item._id});
        });
        readFileNames(resp, files)
   });
}

function readFileNames(resp, patternNames) {
   fs.readdir(resources, function(err, filenames) {
      if (err) {
        console.log(err);
        resp.status(500).send(err);
      } 
      filenames.forEach(function(item) {
        patternNames.push({name: item});
      });
      resp.send(patternNames);
    });
}

function findAllPatternsFromDB() {
    return Pattern.find()
}

function findPatternById(resp, id) {
     Pattern.find({_id: id}).then(function(result) {
        result && result.length && resp.send(result[0]);
     }, function(err) {
         resp.status(500).send(err);
     });
}

function createPattern(savedState, resp){
    var data = savedState.data;
    var liveCells = [];
    for (rowIndex in data) {
        for (columnIndex in data[rowIndex]) {
            if (data[rowIndex][columnIndex]) {
                liveCells.push({column: columnIndex, row: rowIndex})
            }
        }
    }
    
    var newPattern = new Pattern({
        name: savedState.name,
        boardSize: data.length,
        board: liveCells
    })

    try{
        newPattern.save().then(function(savedPattern) {
            resp.send(savedPattern);
        }, function(err){
             resp.status(500).send(err);
        });
        
    }catch(e) {    
        resp.status(500).send(e);
    }
}

module.exports = {
    getPatternNames,
    findPatternById,
    createPattern
 }