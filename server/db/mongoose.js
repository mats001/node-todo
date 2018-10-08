let mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

module.exports={
  mongoose
}

console.log('Connected to Mongoose')
