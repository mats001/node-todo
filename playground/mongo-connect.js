const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoAppData',(err,client)=>{
    if (err){
      return console.log('Could not connect to Mongo Server');
    }
    const db=client.db('TodoAppData');
    console.log('Succesfully Connected to Mongo Server');
    db.collection('Todos').insertOne({
      text:'Talk the  talk',
      complete:true,
    },(err,result)=>{
      if (err){
        return console.log('Unable to create collection Tods');
      }
      console.log(JSON.stringify(result.ops,undefined,2));
    });
    // db.collection('Users').insertOne({
    //   name:'Vinod Mathew',
    //   age:51,
    //   location:'Dammam, Saudi Arabia'
    // },(err,result)=>{
    //   if (err){
    //     return console.log('Could not insert to Collection User',err)
    //   }
    //   console.log(JSON.stringify(result.ops,undefined,2));
    // });

    client.close();
});
