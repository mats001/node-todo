const {User} = require('./../models/users');

var authenticate = (req,res,next)=>{
  var token = req.header('x-auth');
  //console.log('from token',token)
  User.findByToken(token).then((user)=>{
    if (!user){
        // reject triggers the error case in the calling fuction
        return new Promise((resolve,reject)=>{
        reject();
      })
    }
    console.log("user=",user)
    // founde user
    req.token=token;
    req.user=user;
    next();
  }).catch((err)=>{
      // 401 auth required
      return res.status(401).send(err);
  });

}
module.exports={authenticate} ;
