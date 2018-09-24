const express = require('express');
const bodyParsser = require('body-parser');
const {ObjectID} = require('mongodb');
const {mongoose} = require('./db/mongoose');  // this is the  mongoose.js created locally
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
app.get('/todos/:id',(req,res)=>{
  let id = req.params.id;
  if (!ObjectID.isValid(id)){
    // res.status(400);
    // res.send()
    // return
    return res.status(400).send()
  }
  //
  Todo.findById(id).then((doc)=>{
    let myDoc =[{result:"sending doc"},doc]
    return res.send(myDoc)
  }).catch((err)=>{
    return res.status(404)
    //res.send()
  });

});
module.exports={app}
