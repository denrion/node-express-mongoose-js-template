const authRouter = require('../routes/authRoutes');
const userRouter = require('../routes/userRoutes');

const setupRoutes = (app) => {
  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/users', userRouter);
};

module.exports = setupRoutes;
