/* eslint-disable no-console */
const colors = require('colors');

require('./config/loadEnvironmentVariables')();
require('./config/connectMongoDB.js')();

const app = require('./core/app.js');

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () =>
  console.log(
    colors.yellow.bold(
      `Server is running in ${process.env.NODE_ENV} mode, on port ${PORT}`
    )
  )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(colors.red(err));
  // Close server & exit process
  server.close(() => process.exit(1));
});

// Gracefull shutdown app when HEROKU sends SIGTERM signal
// process.on('SIGTERM', () => {
//   console.error(colors.yellow('👋 SIGTERM RECEIVED. Shutting down gracefully'));
//   // Close server & exit process
//   server.close(() => {
//     console.log(colors.yellow('💥 Process terminated'));
//   });
// });
