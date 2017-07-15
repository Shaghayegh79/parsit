(function(){
var app = angular.module('myapp');
    app.service('ListaOrdiniSvc',function($http){
        var self= this;
        self.getOrdiniNuovi=function(username,password){
            alert(WrapperCarello);
            var promise1= $http.post("http://localhost:8080/ordini?statoordine=0",{headers : { authorization : "Basic "+ btoa(username+":"+password)}});
            var promise2=promise1.then(function(response){
                return response.data;
            });
            return promise2;
        };
        self.getOrdiniAttesaSpedizione=function(username,password){
            alert(WrapperCarello);
            var promise1= $http.post("http://localhost:8080/ordini?statoordine=1",{headers : { authorization : "Basic "+ btoa(username+":"+password)}});
            var promise2=promise1.then(function(response){
                return response.data;
            });
            return promise2;
        };
         self.getOrdiniSpediti=function(username,password){
            alert(WrapperCarello);
            var promise1= $http.post("http://localhost:8080/ordini?statoordine=2",{headers : { authorization : "Basic "+ btoa(username+":"+password)}});
            var promise2=promise1.then(function(response){
                return response.data;
            });
            return promise2;
        };
        
        
    });
    
})();