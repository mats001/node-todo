const env = process.env.NODE_ENV || "development"

if (env === "development"){
    process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/TodoAppData' ;
    process.env.PORT = 3000;
}else if (env === "test"){
  process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/TodoAppDataTest' ;
  process.env.PORT = 3000;
}else {
  // since we are not using heroku evn vairable
  process.env.MONGODB_URI = 'mongodb://admin:admin123@ds119523.mlab.com:19523/todo-api' ;
}
