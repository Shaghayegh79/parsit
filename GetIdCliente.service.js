(function(){
    var app = angular.module('myapp');
    app.service('GetIdClienteSvc',function($http){
        this.getIdCliente= function(username,password){  
            var promise1= $http.get("http://localhost:8080/accounts/"+username,
                              {headers : { authorization : "Basic "+ btoa(username+":"+password)}});
            var promise2= promise1.then(function(response) {
                return response.data;
            });
            return promise2;
        };
    });

})();