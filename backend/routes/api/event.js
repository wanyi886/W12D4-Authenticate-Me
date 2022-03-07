const express = require('express');
const asyncHandler = require('express-async-handler');
const { Category } = require('../../db/models');

const router = express.Router();

// get event types
router.get('/categories', asyncHandler(async function(req, res) {
  console.log("Beginning!!!!!!!")
  console.log("Category", Category)
  const categories = await Category.findAll({});
  console.log("HERE is Categories", categories)
  return res.json(categories);
}))

module.exports = router;
