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