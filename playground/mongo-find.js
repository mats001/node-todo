const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoAppData',(err,client)=>{
    if (err){
      return console.log('Could not connect to Mongo Server');
    }
    const db=client.db('TodoAppData');
    console.log('Succesfully Connected to Mongo Server');
    db.collection('Todos').find({
      //_id: new ObjectID('5b6dc0b46cbbfb7228bbcd64')
      text:'Talk the  talk'
    }).toArray()
      .then((docs)=>{
        console.log('Todos');
        console.log(JSON.stringify(docs,undefined,2));
      },(err)=>{
        console.log('Unable to connect to data',err)
    })
     // client.close();
});
