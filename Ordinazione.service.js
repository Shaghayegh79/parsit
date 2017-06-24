(function(){
var app = angular.module('myapp');
    app.service('OrdinazioneSvc',function($http){
        var self= this;
        self.ordinazione=function(idCliente,WrapperCarello,username,password){
            alert(WrapperCarello);
            var promise1= $http.post("http://localhost:8080/clienti/"+idCliente+"/ordini",WrapperCarello,{headers : { authorization : "Basic "+ btoa(username+":"+password)}});
            var promise2=promise1.then(function(response){
                return response.data;
            });
            return promise2;
        };
        
        
    });
    
})();