const express = require('express');
const router = express.Router();

var nextState = require('../services/next-state.service')
var lifParser = require('../services/lif-parser.service')
var patternService = require('../services/pattern.service')

router.post('/calculate-next-generation', function (req, res) {
  res.send(nextState.getNextState(req.body))
})

router.get('/list-patterns-name', function (req, res) {
  patternService.getPatternNames(res);
})

router.get('/get-pattern', function (req, res) {
    var patternName = req.query.patternName;
    if (req.query.id){
        patternService.findPatternById(res, req.query.id);
    } else {
        lifParser.getFile(res, patternName);
    }
})

router.post('/save-pattern', function (req, res) {
  patternService.createPattern(req.body, res);
})

module.exports = router;