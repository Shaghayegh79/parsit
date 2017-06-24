(function(){
var app = angular.module('myapp');
    app.service('IngextraSvc',function($http){
        var self= this;
        self.getIngextraList=function(){
            var promise1= $http.get("http://localhost:8080/allingextra");
            var promise2=promise1.then(function(response){
                return response.data;
            });
            return promise2;
        };
        
        
    });
    
})();