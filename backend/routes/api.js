const express = require('express');
const router = express.Router();

var nextState = require('../state-calculator/next-state.js')
var lifParser = require('../lif-parser/lif-parser.js')

router.post('/calculate-next-generation', function (req, res) {
  res.send(nextState.getNextState(req.body))
})

router.get('/get-patterns', function (req, res) {
  res.send(lifParser.readFiles())
})

module.exports = router;