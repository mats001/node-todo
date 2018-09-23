const expect1 = require('expect');
const supertest1 = require('supertest');

const {app} = require('./../server') ;
const {Todo} = require('./../models/todos');

// delete all data from the database before each test
let myTodos=[
  {text:"My story 2"},
  {text:"My story 3"}
];
beforeEach((done)=>{
 Todo.remove({}).then(()=>{
   return Todo.insertMany((myTodos)).then(()=>{
     done();
   })
 })

});
describe('POST/todos',()=>{
  it('Should create a new todo',(done)=>{
    // sample test string setup for the test
    var sendText = {text: "This is a sample todo"} ;

    // call the application to be tested
    supertest1(app)
      .post('/todos')   // in the app cll the post function as applicable in this case :
      .send(sendText)       // send the sample todo for test
      .expect((res)=>{
        //console.log(res)
      })
      .expect(200)     // expected status
      .expect((res)=>{
        expect1(res.body.text).toBe(sendText.text)    // the data returned should be same as the data sent
      })    // expect res end
      .end((err,res)=>{
        // the end of the request
        if (err){
          return done(err)
        }
        // search for the data from the data base of the record matches assuming only one record
        Todo.find(sendText).then((todos)=>{
          expect1(todos.length).toBe(1);   // all records delted on top so only one record
          expect1(todos[0].text).toBe(sendText.text);  // record value should match
          done()
        }).catch((err)=>{
          done(err);
        })   // todo find end
      });   // end end
  }); // it shhold create a new todo end
}); // describe end

describe('GET/todos',()=>{
  it('Should Get all todos',(done)=>{
    supertest1(app)
      .get('/todos')
      .expect(200)
      .expect((res)=>{
        expect1(res.body.todos.length).toBe(2);
      })
      .end(done)
  })
})
