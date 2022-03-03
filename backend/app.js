const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet'); // Enable better overall security
const cookieParser = require('cookie-parser');

const { environment } = require('./config');
const isProduction = environment === 'production';

const routes = require('./routes');

const app = express();

app.use(morgan('dev'));
app.use(cookieParser()); // parsing cookies
app.use(express.json()); // parsing JSON bodies of requests with Content-Type of "application/json"

if (!isProduction) {
  app.use(cors()); // enable cors only in development
}

// helmet helps set a variety of headers to better secure your app
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin"
}))

// Set the _csrf token and create req.csrfToken method
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true // can't be read by Javascript
    }
  })
)

app.use(routes);

module.exports = app;
