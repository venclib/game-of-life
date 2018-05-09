const express = require('express')
const app = express()
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/calculate-next-generation', function (req, res) {
  res.send(getNextState(req.body))
})

app.listen(3000, function() {
    console.log('App listening on port 3000')
})

function getNextState(currentState) {
    var nextState = [];
    for (rowIndex in currentState) {
        var newRow = [];
        for (columnIndex in currentState[rowIndex]) {
            var count = getAdjacentLiveCellsCount(+rowIndex, +columnIndex, currentState);

            var currentCell = currentState[rowIndex][columnIndex];
            newRow.push(getCurrentCellStatusFromLiveCount(count, currentCell));
        }
        nextState.push(newRow);
    }
    return nextState;
}

function getAdjacentLiveCellsCount(rowIndex, columnIndex, currentState) {
    var adjacentCells = [];

    var previousRowIndex = rowIndex - 1; 
    var previousRow = currentState[previousRowIndex];

    var currentRow = currentState[rowIndex];

    var nextRowIndex = rowIndex + 1;
    var nextRow = currentState[nextRowIndex];

    adjacentCells.push(...getAdjacentLiveElements(columnIndex, previousRow));
    adjacentCells.push(...getAdjacentLiveElements(columnIndex, nextRow));
    adjacentCells.push(...getAdjacentLiveElements(columnIndex, currentRow, true));

    return adjacentCells.length;
}

function getAdjacentLiveElements(columnIndex, row, isCurrentRow) {
    var cellsState =[];
   if (row) {
        var previousColumn = row[columnIndex - 1]
        previousColumn && cellsState.push(previousColumn);

        var currentColumn = row[columnIndex];
        !isCurrentRow && currentColumn && cellsState.push(currentColumn);

        var nextColumn = row[columnIndex + 1]
        nextColumn && cellsState.push(nextColumn);
    }
    return cellsState;
}

const ISOLATION_TRESHOLD = 2;
const OVERPOPULATION_TRESHOLD = 3;
const OPTIMAL_POPULATION_COUNT = 3;

function getCurrentCellStatusFromLiveCount(liveCellCount, currentCellStatus) {
    if (liveCellCount == OPTIMAL_POPULATION_COUNT && !currentCellStatus) {
        return !currentCellStatus;
    }
    if ((liveCellCount < ISOLATION_TRESHOLD || liveCellCount > OVERPOPULATION_TRESHOLD) 
            && currentCellStatus) {
        return !currentCellStatus;
    } 
    return currentCellStatus;
}
