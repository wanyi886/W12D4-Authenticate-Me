const express = require('express');
const asyncHandler = require('express-async-handler');

const { Category, Event } = require('../../db/models');


const router = express.Router();



// get event types
router.get('/categories', asyncHandler(async function(req, res) {
  console.log("lalalalalala")
  const categories = await Category.findAll();
  console.log("categories!!!", categories)
  return res.json(categories);
}))

module.exports = router;
