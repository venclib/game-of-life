var mongoose = require('mongoose')

var AliveCells = new mongoose.Schema({ column: Number, row: Number });
var PatternSchema = new mongoose.Schema({
    name: String,
    boardSize: Number,
    board: [AliveCells],
})

const Pattern = mongoose.model('pattern', PatternSchema)

module.exports = Pattern;