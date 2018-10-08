const mongoose = require('mongoose') ;
const validator = require('validator') ;
const jwt = require('jsonwebtoken');
const _ = require('lodash');
// schema can have  funtions
// for models and schemas use TitleCase
const UserSchema = new mongoose.Schema({
  name:{
    type:String,
    minlength:1,
    required:true,
    trim:true,
  },
  email:{
    type:String,
    required:true,
    trim:true,
    minlength:1,
    unique:true,
    validate:{
      // use the validtor function
      validator:(value)=>{
        return validator.isEmail(value) ;
      },
      message:'(value) is not a valid email'
    }
  },
  password:{
    type:String,
    required:true,
    minlength:6
  },
  tokens:[{
    access:{
      type:String,
      required:true
    },
    token:{
      type:String,
      required:true
    }
  }]
});
UserSchema.methods.toJSON = function(){
  // method.toJSON can be used to send the  value of the model that we choose to send instead of all the values
  var user = this;
  //convert instance to an object
  var userObject = user.toObject() ;
  // user lodash pic funtion
  return _.pick(userObject,['name','email','_id'])
}
// methods are instance methods
UserSchema.methods.generateAuthToken = function(){
  // we cannot use ES6 arrow fuction as it does not support 'this'
  // method gets called as an instance method and we need to use 'this' to get values of the instance
  var user = this ;
  var access= 'auth';

  // jwt sign has to par 1. object to be siged and 2. salt

  // ** let token = jwt.sign({_id:user._id.toHexString(),access:access},'Secret123')
  // ES 6 access:access can be repalced with access
  var token = jwt.sign({_id:user._id.toHexString(),access},'Secret123') ;

    // token made now add it to the user instance
    // use concat instead of push as mongoose has soem verssion issues with push
    user.tokens.push({access,token});
    // save it and return it to the original fuction
    //console.log(`Generated token = ${token}`)
    return user.save().then(()=>{
      // return the token so it can be used where it is called from
      console.log('Saved User',user)
      return token ;
    })
}
// statics are Class Metods
UserSchema.statics.findByToken = function(token){
// uper case'U" denotes ModelMtehod (class method)
  var User = this  ; // this is The model not the instance
  //console.log("token",token)
  var decoded ;
  try{
    decoded = jwt.verify(token,'Secret123');
  }catch (err){
    console.log(`Err1 : =${err}`)
    return new Promise((resolve,reject)=>{
      // reject triggers the error case in the calling fuction
      reject();
    });
  }
  console.log(`Decoded =${decoded._id}`)
  return User.findOne({
    '_id':decoded._id,
    'tokens.token':token,
    'tokens.access':'auth'
  });

};
let User = mongoose.model('User',UserSchema);
module.exports={User}
