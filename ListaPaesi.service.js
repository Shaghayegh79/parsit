(function(){
var app = angular.module('myapp');
    app.service('ListaPaesiSvc',function($http){
        var self= this;
        self.getListaPaesi=function(){
            var promise1= $http.get("http://services.groupkt.com/country/get/all");
            var promise2=promise1.then(function(response){
                return response.data;
            });
            return promise2;
        };
        
        
    });
    
})();