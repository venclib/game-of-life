const express = require('express')
const app = express()

const http = require('http');
const router = express.Router();

const api = require('./routes/api');

var bodyParser = require('body-parser');
var path = require('path');

var nextState = require('./state-calculator/next-state.js')
var lifParser = require('./lif-parser/lif-parser.js')

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend/app')));
app.use('/api', api);

app.listen(3000, function() {
    console.log('App listening on port 3000')
})

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../frontend/app/index.html'));
});


const server = http.createServer(app);