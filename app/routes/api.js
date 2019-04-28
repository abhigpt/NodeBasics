var User = require('../models/user');
module.exports = function(router) {
  router.post('/users',function(req,res){
    console.log("caoll");
    var user = new User();
    console.log("the value of req body is",req.body);
    user.username = req.body.username;
    user.password = req.body.password;
    user.email = req.body.email;
    if(!req.body.username || !req.body.password || !req.body.email){
      res.json({success:false,message:'One of the fields is missing'});
    }
    else{
      user.save(function(err){
        if(err){
          res.json({success:false,message:err});
        }
        else{
          console.log("the user is created successfully");
          res.json({success:true,message:'User Created Successfully'});
        }
      });
    }
  })
  return router;
}
