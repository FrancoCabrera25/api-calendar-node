const mongoose = require('mongoose');

const dbConnection = async () => {
  try {

   await  mongoose.connect(process.env.DB_CNN, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    console.log('db connect');

  } catch (error) {
    console.log('error mongo', error);
    throw new Error('error conexion base datos');
  }
};

module.exports = {
    dbConnection
}