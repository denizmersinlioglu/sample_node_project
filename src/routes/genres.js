import Joi from 'joi';
import express from 'express';
const router = express.Router();

let genres = [
  { id: 1, name: 'Horror' },
  { id: 2, name: 'Comedy' },
  { id: 3, name: 'Thriller' },
  { id: 4, name: 'Drama' }
];

router.get('/', (req, res) => {
  res.send(genres);
});

router.get('/:id', (req, res) => {
  const genre = genres.find(c => c.id === parseInt(req.params.id));
  if (!genre)
    return res
      .status(404)
      .send(`Parameter with id ${req.params.id} can not found`);
  res.send(genre);
});

router.post('/', (req, res) => {
  let { error } = validateRequest(req.body);
  if (error) return res.status(400).send(error);
  const genre = { id: genres.length + 1, name: req.body.name };
  genres.push(genre);
  res.send(genre);
});

router.put('/:id', (req, res) => {
  const genre = genres.find(c => c.id === parseInt(req.params.id));
  if (!genre)
    return res
      .status(404)
      .send(`Parameter with id ${req.params.id} can not found`);
  let { error } = validateRequest(req.body);
  if (error) return res.status(400).send(error);
  genre.name = req.body.name;
  res.send(genre);
});

router.delete('/:id', (req, res) => {
  const genre = genres.find(c => c.id === parseInt(req.params.id));
  if (!genre)
    return res
      .status(404)
      .send(`Parameter with id ${req.params.id} can not found`);
  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.send(genre);
});

function validateRequest(genre) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(genre, schema);
}

module.exports = router;
