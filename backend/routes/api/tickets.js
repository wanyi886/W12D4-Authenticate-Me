const express = require('express');
const asyncHandler = require('express-async-handler');

const { Ticket } = require('../../db/models/');


const router = express.Router();



// get tickets for a user
router.get('/users/:id', asyncHandler(async function(req, res) {
  const id = req.params.id
  const tickets = await Ticket.findAll(
    {
      where: { userId: id }
    }
    );

    console.log("tickets from router", tickets)

  return res.json(tickets);
}))

module.exports = router;
