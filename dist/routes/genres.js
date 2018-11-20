'use strict';

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

var genres = [{ id: 1, name: 'Horror' }, { id: 2, name: 'Comedy' }, { id: 3, name: 'Thriller' }, { id: 4, name: 'Drama' }];

router.get('/', function (req, res) {
  res.send(genres);
});

router.get('/:id', function (req, res) {
  var genre = genres.find(function (c) {
    return c.id === parseInt(req.params.id);
  });
  if (!genre) return res.status(404).send('Parameter with id ' + req.params.id + ' can not found');
  res.send(genre);
});

router.post('/', function (req, res) {
  var _validateRequest = validateRequest(req.body),
      error = _validateRequest.error;

  if (error) return res.status(400).send(error);
  var genre = { id: genres.length + 1, name: req.body.name };
  genres.push(genre);
  res.send(genre);
});

router.put('/:id', function (req, res) {
  var genre = genres.find(function (c) {
    return c.id === parseInt(req.params.id);
  });
  if (!genre) return res.status(404).send('Parameter with id ' + req.params.id + ' can not found');

  var _validateRequest2 = validateRequest(req.body),
      error = _validateRequest2.error;

  if (error) return res.status(400).send(error);
  genre.name = req.body.name;
  res.send(genre);
});

router.delete('/:id', function (req, res) {
  var genre = genres.find(function (c) {
    return c.id === parseInt(req.params.id);
  });
  if (!genre) return res.status(404).send('Parameter with id ' + req.params.id + ' can not found');
  var index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.send(genre);
});

function validateRequest(genre) {
  var schema = {
    name: _joi2.default.string().min(3).required()
  };
  return _joi2.default.validate(genre, schema);
}

module.exports = router;