const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/my_portfolio';

const connectDB = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('database is connected Successfully');
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
