const mongoose = require('mongoose')
let Todo = mongoose.model('Todos',{
  text:{
    type:String,
    required:true,
    minlength:1
  },
  complete:{
    type:Boolean,
    default:false
  },
  completedAt:{
    type:Number,
    default:null
  }
});
module.exports={Todo}
