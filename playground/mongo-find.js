const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoAppData',(err,client)=>{
    if (err){
      return console.log('Could not connect to Mongo Server');
    }
    const db=client.db('TodoAppData');
    console.log('Succesfully Connected to Mongo Server');
    db.collection('Todos').find({complete:true}).toArray()
      .then((docs)=>{
        console.log('Todos');
        console.log(JSON.stringify(docs,undefined,2));
      },(err)=>{
        console.log('Unable to connect to data',err)
    }).then(()=>{
      console.log("Calling close")
      client.close();
    });
});
