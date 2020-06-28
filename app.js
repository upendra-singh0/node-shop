const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const connectToDb = require('./api/db');
const productsRoute = require('./api/routes/productsRoute');
const ordersRoute = require('./api/routes/ordersRoute');
const usersRoute = require('./api/routes/usersRoute');
const { PORT } = require('./api/config/constants');

const app = express();

//* Middleware

// Whitelist or Blacklist origins here accordingly.
// Right now allowing all requests to pass through
app.use(
  cors({
    origin: (origin, cb) => cb(null, true),
    credentials: true,
  })
);

// HTTP request logger middleware
// dev: Concise colored output by response status code
app.use(morgan('dev'));

// compress all responses
app.use(compression());

// Request body parsing middleware supporting JSON, urlencoded, raw and text requests.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// setting static/public folder
app.use('/', express.static('view'));
app.use('/uploads', express.static('uploads'));

//* Connect to Db
connectToDb();

//* Routes
app.use('/products', productsRoute);
app.use('/orders', ordersRoute);
app.use('/users', usersRoute);

//* Handle error in this route,
// This can also improved by having a common module which will handle all type of errors,
// As a result it'll bring consistency to all other services we might use (for Microservices)
app.use((err, req, res, next) => {
  const { message, status } = err;

  return res.json({
    status,
    message,
  });
});

//* If port is omitted or is 0, the operating
//* system will assign an arbitrary unused port, which is useful for cases like automated tasks (tests, etc.).
app.listen(PORT(5000), '0.0.0.0', () => {
  console.log(`Listening on PORT = ${PORT(5000)}`);
});
