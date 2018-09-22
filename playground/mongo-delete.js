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
      db.collection('Users').deleteMany({
        // _id: new ObjectID('5b6de324c9f73636c4ce8ccd')
        name:"Anil Mathew"
      }).then((result)=>{
        console.log(result);
        client.close()
      })
  });
