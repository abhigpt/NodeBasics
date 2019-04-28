angular.module('userControllers',['userServices'])

.controller('regCtrl',function($http,$location,$timeout,User){
  let app = this;
  app.errorMsg = false;
  app.loading = true;
  this.regUser = function(regData){
    console.log("testing new button",this.regData);
    User.create(app.regData).then(function(data){
      console.log("the data is ",data.data.message);
      if(data.data.success){
        app.loading = false;
        app.successMsg = data.data.message;
        $timeout(function(){
          $location.path('/');
        },1500);
      }
      else{
        app.loading = false;
        app.errorMsg   = data.data.message;
      }
    });
  }
});
