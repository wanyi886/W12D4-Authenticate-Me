const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth');
const { restoreUser, requireAuth } = require( '../../utils/auth');
const { User, Event } = require('../../db/models')

const sessionRouter = require('./session');
const usersRouter = require('./users');
const eventRouter = require('./event')

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/event', eventRouter);

router.post('/test', function(req, res) {
  res.json({ requestBody: req.body });
})

// test route 1
router.get('/set-token-cookie', asyncHandler(async(req, res) => {
  const user = await User.findOne({
    where: {
      username: 'Demo-lition'
    }
  })
  setTokenCookie(res, user);
  return res.json({ user })
}));

// test route 2
router.get('/restore-user', restoreUser, asyncHandler(async(req, res) => {
  return res.json(req.user)
}))

// test route 3
router.get('/require-auth', requireAuth, asyncHandler(async(req, res) => {
  return res.json(req.user);
}))

router.get('/', asyncHandler(async(req, res) => {
  const events = await Event.findAll({
    order: [['createdAt', 'DESC']]
  });
  return res.json(events);
}))

module.exports = router;
