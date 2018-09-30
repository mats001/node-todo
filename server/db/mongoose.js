let mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const mlabDbase = 'mongodb://admin:admin123@ds119523.mlab.com:19523/todo-api'
mongoose.connect(mlabDbase||'mongodb://127.0.0.1:27017/TodoAppData');

module.exports={
  mongoose
}

console.log('hello')
