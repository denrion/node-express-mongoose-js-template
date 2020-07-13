const NotImplementedError = require('../utils/errors/NotImplementedError');
const globalErrorHandler = require('../controllers/errorController');

const setupErrorMiddleware = (app) => {
  app.all('*', (req, res, next) => {
    next(
      new NotImplementedError(`Cannot find ${req.originalUrl} on this server!`)
    );
  });

  app.use(globalErrorHandler);
};

module.exports = setupErrorMiddleware;
