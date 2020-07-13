const colors = require('colors');
const mongoose = require('mongoose');

const connectMongoDB = async () => {
  const { connection } = await mongoose.connect(
    process.env.MONGO_DB_ATLAS_URI,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  );

  // eslint-disable-next-line no-console
  console.log(colors.cyan.bold('MongoDB Connected: %s'), connection.host);
};

module.exports = connectMongoDB;
