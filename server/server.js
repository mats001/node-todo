const express = require('express');
const bodyParsser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todos');
const {users} = require('./models/users');
// setup express as the app
const app = express();
let port = process.env.PORT || 3000 ;
// set bodyParsser to parse the req to JSON
app.use(bodyParsser.json());
app.post('/todos',(req,res)=>{
  // req comes parsed as json by above bodyParsser use
  console.log(req.body);
  let todo1 = new Todo({
    text: req.body.text,
    complete: req.body.complete,
    completedAt:req.body.completedAt
  })
  todo1.save().then((doc)=>{
    // doc is the saved document that is returned by save if successful
    res.send(doc);
  },(err)=>{
    res.status(400).send(err)
  });
});
app.listen(port,()=>{
  console.log('lstening on 3000')
});
app.get('/todos',(req,res)=>{
  Todo.find().then((todos)=>{
    // send as an object instead of string to add more proeprites
    res.send({
      todos,
      "teststatus":"all is well !"
    })
  },(err)=>{
    res.send(err)
  });
});
module.exports={app}
