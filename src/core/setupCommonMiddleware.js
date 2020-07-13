const compression = require('compression');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const hpp = require('hpp');
const morgan = require('morgan');
const xss = require('xss-clean');

const setupCommonMiddleware = (app) => {
  // Set security HTTP headers
  app.use(helmet());

  // Rate limiting - for stopping BRUTE FORCE attacks from the same IP
  const limiter = rateLimit({
    max: process.env.RATE_LIMIT_MAX_NUM_CONNECTIONS,
    windowMs: process.env.RATE_LIMIT_KEEP_IN_MEMORY_LENGTH_MS,
    message: process.env.RATE_LIMIT_MESSAGE,
  });

  app.use('/api', limiter);

  // Cookie Parser, enables reading incoming cookies
  app.use(cookieParser());

  // Data sanitization against NoSQL query injection
  app.use(mongoSanitize());

  // Data sanitization agains XSS
  app.use(xss());

  // Prevent http parameter polution
  // specify parameters that are allowed to be repeated
  app.use(hpp({ whitelist: [] }));

  // Implement CORS
  app.use(cors({ origin: '*', credentials: true })); // Liimt origin only to your FE url if necessary
  app.options('*', cors({ credentials: true }));

  // Compress sent JSON data
  app.use(compression());

  // Development logging
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }
};

module.exports = setupCommonMiddleware;
