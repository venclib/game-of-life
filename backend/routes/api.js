const express = require('express');
const router = express.Router();

var nextState = require('../services/next-state')
var lifParser = require('../services/lif-parser')
var patternService = require('../services/pattern.service')

router.post('/calculate-next-generation', function (req, res) {
  res.send(nextState.getNextState(req.body))
})

router.get('/get-patterns-name', function (req, res) {
  lifParser.readFileNames(res);
})

router.get('/get-pattern/name/:patternName', function (req, res) {
  lifParser.getFile(res, req.params.patternName);
})

router.post('/save-pattern', function (req, res) {
  patternService.createPattern(req.body, res);
})

module.exports = router;