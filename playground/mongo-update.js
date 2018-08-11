const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoAppData',(err,client)=>{
      if (err){
        return console.log('Could not connect to Mongo Server');
      }
      const db=client.db('TodoAppData');
      console.log('Succesfully Connected to Mongo Server');
      // delete many
      // db.collection('Users').deleteMany({name:"Vinod Mathew"}).then((result)=>{
      //   console.log(result);
      // })
      db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5b6d5871b77493661c3b61ef')
      },{
          $set:{name:"Anil Mathew"},
          $inc:{age:2}

      },{
        returnOriginal: false
      }).then((result)=>{
        console.log(result);
      })
  });
