'use strict';

var express = require('express');
var genres = require('./routes/genres');
var app = express();

app.use(express.json());
app.use('/api/genres', genres);

var port = process.env.PORT || 3000;
app.listen(port, function () {
  return console.log('Server is listening on port ' + port);
});