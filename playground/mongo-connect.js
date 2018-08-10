const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoAppData',(err,client)=>{
    if (err){
      return console.log('Could not connect to Mongo Server');
    }
    const db=client.db('TodoAppData');
    console.log('Succesfully Connected to Mongo Server');
const insertRec =(text,compFlag)=>{
  db.collection('Todos').insertOne({
     text:text,
     complete:compFlag,
   },(err,result)=>{
     if (err){
       return console.log('Unable to create collection Tods');
     }
     console.log(JSON.stringify(result.ops,undefined,2));
   });
}
  for (let i=1;i<10;i++){
      let text=`This is my Todo number ${i}`
      if (i==1||i==5||i==8){
        compFlag=false
      }else{
        compFlag=true;
      }
      insertRec(text,compFlag)
  }

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
