const express = require('express');
const bodyParsser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {todos} = require('./models/todos');
const {users} = require('./models/users');
// setup express as the app
const app = express();

// set bodyParsser to parse the req to JSON
app.use(bodyParsser.json());
app.post('/todos',(req,res)=>{
  // req comes parsed as json by above bodyParsser use
  console.log(req.body);
  let todo1 = new todos({
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
app.listen(3000,()=>{
  console.log('lstening on 3000')
});
