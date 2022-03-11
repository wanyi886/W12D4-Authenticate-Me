const express = require('express');
const asyncHandler = require('express-async-handler');

const { Ticket, User, Event } = require('../../db/models/');


const router = express.Router();



// get tickets for a user
router.get('/users/:id', asyncHandler(async function(req, res) {
  const id = req.params.id;
  const tickets = await Ticket.findAll(
    {
      where: { userId: id },
      include: { model: Event },
      order: [["id", 'DESC']]
    }
    );

  return res.json(tickets);
}))

router.post('/event/:id', asyncHandler(async function(req, res) {
  const id = req.params.id;
  const { userId, eventId } = req.body;
  const newTicket = await Ticket.create({ userId, eventId });

  return res.redirect(`${req.baseUrl}/users/${userId}`)
}))

router.delete('/:id', asyncHandler(async function(req, res) {
  const id = req.params.id;
  const ticket = await Ticket.findByPk(id);

  if(!ticket) throw new Error('Cannot find this ticket.');

  await ticket.destroy();
  return res.json(id);
}))

module.exports = router;
