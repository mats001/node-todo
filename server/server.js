require('./config/config')
const express = require('express');
const bodyParsser = require('body-parser');
const _ = require('lodash');   // for picking select values from the body
const {ObjectID} = require('mongodb');
const {mongoose} = require('./db/mongoose');  // this is the  mongoose.js created locally
const {Todo} = require('./models/todos');
const {User} = require('./models/users');
const {authenticate} = require('./middleware/authenticate')
// setup express as the app
const app = express();
let port = process.env.PORT ;
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
  console.log(`Starting on port ${port}`)
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
     res.status(404)
    return res.send()
  });

});
app.delete('/todos/:id',(req,res)=>{
  let id = req.params.id;
  if (!ObjectID.isValid(id)){
    res.status(404) ;
    return res.send("Not a valid Id");
  }
  console.log(`id is ${id}`) ;
  Todo.findById(id).then((doc)=>{
    if(!doc){
      console.log(`Not found doc`) ;
      return res.status(404).send();   // chain
    }
    console.log(`found doc ${doc}`) ;
    Todo.findByIdAndDelete(id).then((doc) =>{
      console.log(`remove doc ${doc}`) ;
      if(!doc || doc== ""){
        console.log(`remove doc1`) ;
         return res.status(404).send();
      }
      console.log(`remove doc 2`,doc) ;
      return res.send(doc)
    }).catch((e)=>{
      return res.status(404).send();
    });
  });
});
app.patch('/todos/:id',(req,res)=>{
  let id = req.params.id ;
  if (!ObjectID.isValid(id)){
    return res.status(400).send("Not a valid Id");
  }
  // use low dash to only pick select key values from the body and set in a body array
  let body = _.pick(req.body,['text','complete']) ;
  // if completed is Boolean and true then sent completedAt as timestamp
  if (_.isBoolean(body.complete) && body.complete){
    body.completedAt = new Date().getTime()
  }else{
    body.completedAt=null,
    body.complete = false
  }
  // now findOneAndUpdate
  // use mongoosd set funtion to set values.
  // the body variable has all the needed variable set above
  // new : true to send the new record as return value
  Todo.findByIdAndUpdate(id,{$set:body, new:true}).then((doc)=>{
    // call back
    if (!doc){
      return res.status(404).send()
    }
    return res.send({doc})
  }).catch((err)=>{
    return res.status(404).send()
  })
});
app.post('/users',(req,res)=>{
    let body = _.pick(req.body,['name','email','password']) ;
    let user = new User({
      name:body.name,
      email:body.email,
      password:body.password
    });
    //console.log({body});
    user.save().then(()=>{
      //res.send(doc);
      // get user token
      return user.generateAuthToken();
      // once you return it goes to the next then with the return from the previous call
    }).then((token)=>{
      // settin header ('x-auth') will send token in header
      res.header('x-auth',token).send(user) ;
    }).catch((err)=>{
      res.status(400).send(err) ;
    })
})
app.get('/users',(req,res)=>{
  User.find().then((users)=>{
    if (!users){
      return res.status(404).send()
    }
    res.send(users)
  }).catch((err)=>{
    return res.status(404).send()
  })
});

//authenticate will run before req and req will be  sent from authenticate
app.get('/users/me',authenticate,(req,res)=>{
  res.send(req.user)
});
module.exports={app}
