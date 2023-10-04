const mongoose = require('mongoose');

const url = process.env.MONGODB
const MongoDBConnection = async() => {
    mongoose.connect(url, {

    }).then(rez => console.log('ради монго'))
      .catch((error) => console.log(error))
}

module.exports = MongoDBConnection;