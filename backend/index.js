const express = require('express')
const app = express()

const http = require('http');
const router = express.Router();

const api = require('./routes/api');

var bodyParser = require('body-parser');
var path = require('path');

var mongoose = require('mongoose')

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend/app')));
app.use('/api', api);

app.listen(3000, function() {
    console.log('App listening on port 3000')
})

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../frontend/app/index.html'));
});



mongoose.connect('mongodb://127.0.0.1:27017/gameoflife')
.then(()=> { console.log(`Succesfully Connected to the Mongodb Database  at URL : mongodb://127.0.0.1:27017/gameoflife`)})
.catch(()=> { console.log(`Error Connecting to the Mongodb Database at URL : mongodb://127.0.0.1:27017/gameoflife`)})
