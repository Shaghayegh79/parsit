/*(function(){
    var app = angular.module('myapp');
    app.service('loginSvc',function($resource){
        self=this;
        return{
            login:function(username,password){
                        return $resource("http://localhost:8080/user",{},
                            {get: {method:'GET',
                            headers : { authorization : "Basic "+ btoa(username+":"+password)}}});
            }
        }
      });        
})();//funzionaanche questo//*/

(function(){
    var app = angular.module('myapp');
    app.service('loginSvc',function($http){
        this.login=function(username,password){  
            var promise1= $http.get("http://localhost:8080/user",
                              {headers : { authorization : "Basic "+ btoa(username+":"+password)}})
            var promise2= promise1.then(function(response) {
                return response.data;
            });
            return promise2;
        };
    });

})();
