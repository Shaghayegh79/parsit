(function(){
var app = angular.module('myapp');
    app.service('AutoreSvc',function($http){
        var self= this;
        self.getListaAutori=function(username,password){
            var promise1= $http.get("http://localhost:8080/autori",
                              {headers : { authorization : "Basic "+ btoa(username+":"+password)}});
            var promise2=promise1.then(function(response){
                return response.data;
            });
            return promise2;
        };
        
        /*self.getLibriDellAutore=function(username,password,id){
            var promise1= $http.get("http://localhost:8080/autori/id/libri",
                              {headers : { authorization : "Basic "+ btoa(username+":"+password)}});
            var promise2=promise1.then(function(response){
                return response.data;
            });
            return promise2;
        };*/
        
    });
    
})();