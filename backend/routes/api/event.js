const express = require('express');
const asyncHandler = require('express-async-handler');
const { Category, Event } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const router = express.Router();

// get event types
router.get('/categories', asyncHandler(async function(req, res) {
  const categories = await Category.findAll({});
  return res.json(categories);
}))


const validateCreatingEvent = [
  check('title')
    .exists({ checkFalsy: true })
    .withMessage('Please provide an event title.'),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage('Please provide an event description.'),
  check('categoryId')
    .exists({ checkFalsy: true })
    .withMessage('Please provide an event category.'),
  check('imgUrl')
    .exists({ checkFalsy: true })
    .withMessage('Password provide an image URL.'),
  check('price')
    .exists({ checkFalsy: true })
    .withMessage('Password provide a price.'),
  check('date')
    .exists({ checkFalsy: true })
    .withMessage('Password provide a date.'),
  check('startTime')
    .exists({ checkFalsy: true })
    .withMessage('Password provide a start time.'),
  check('endTime')
    .exists({ checkFalsy: true })
    .withMessage('Password provide an end time.'),
  check('address')
    .exists({ checkFalsy: true })
    .withMessage('Password provide an address.'),
  check('city')
    .exists({ checkFalsy: true })
    .withMessage('Password provide the city name.'),
  check('state')
    .exists({ checkFalsy: true })
    .withMessage('Password provide the state name.'),
  check('zipCode')
    .exists({ checkFalsy: true })
    .withMessage('Password provide a zip code.'),
  handleValidationErrors
];
// create an event
router.post('/', validateCreatingEvent, asyncHandler(async(req, res) => {
  const newEvent = await Event.create(req.body);

  return res.redirect(`${req.baseUrl}/${newEvent.id}`);
}))

// get one event
router.get('/:id', asyncHandler(async (req, res) => {
  const event = await Event.findByPk(req.params.id);
  return res.json(event);
}));

module.exports = router;
