var Pattern = require('../models/pattern.model')

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
        })
        
    }catch(e) {    
        throw Error("Error while Creating pattern")
    }
}

module.exports = {
    createPattern
 }