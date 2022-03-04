const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User } = require('../db/models')

const { secret, expiresIn } = jwtConfig

// Sends a JWT Cookie
const setTokenCookie = (res, user) => {
  // create the token
  const token = jwt.sign(
    { data: user.toSafeObject() },
    secret,
    { expiresIn: parseInt(expiresIn) } // 604,800 seconds = 1 week
  );

  const isProduction = process.env.NODE_ENV === "production";

  res.cookie('token', token, {
    maxAge: expiresIn * 1000, // maxAge in milliseconds
    httpOnly: true,
    secure: isProduction, // if it's in production, we need to secure
    sameSite: isProduction && "Lax"
    // sameSite attribute allows you to declare if your cookie should be restricted to a first-party or same-site context
    // if set it to strict, cookie will only be sent in a first-party context
    // if set it Lax, cookie are not sent on normal cross-site subrequests
    // but are sent when a user is navigating to the origin site (i.e., when following a link).
  })

  return token;
}

const restoreUser = (req, res, next) => {
  // token parsed from cookies
  const { token } = req.cookies;

  return jwt.verify(token, secret, null, async (err, jwtPayload) => {
    if (err) {
      return next();
    }

    try {
      const { id } = jwtPayload.data;
      req.user = await User.scope('currentUser').findByPk(id);
    } catch (e) {
      // we clear token to prevent someone else is logged in
      res.clearCookie('token');
      return next(); // why we don't have to use return next(e)??
      // next is just a function, and when it's invoked in a piece of middleware without an error, it just moves on to the next piece of middleware in line.
      // If you pass an error to it, then it will skip the next middleware and move straight to the error handlers and return an error.
      // right here, we dont want to send an error when that fails, we just want it to remove the 'token' cookie and make it to where nobody is logged in.
    }

    if (!req.user) res.clearCookie('token');

    return next();
  });
};

// If there is no current user, return an error
const requireAuth = [
  restoreUser,
  function (req, _res, next) {
    if (req.user) return next();

    const err = new Error('Unauthorized');
    err.title = 'Unauthorized';
    err.errors = ['Unauthorized'];
    err.status = 401;
    return next(err);
  }
];

module.exports = {
  setTokenCookie,
  restoreUser,
  requireAuth
}
