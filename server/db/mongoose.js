let mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/TodoAppData');

module.exports={
  mongoose
}

console.log('hello')
