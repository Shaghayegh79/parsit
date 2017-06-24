(function(){
var app = angular.module('myapp');
    app.service('ProdottiSvc',function($http){
        var self= this;
        self.getProdotti=function(){
            var promise1= $http.get("http://localhost:8080/prodotti");
            var promise2=promise1.then(function(response){
                return response.data;
            });
            return promise2;
        };
        
        
    });
    
})();
