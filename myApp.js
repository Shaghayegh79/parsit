var app = angular.module('myapp',[])
.config(function($httpProvider) {
$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
});
/*
var fact= app.service('UserSvc', function($resource) {
    return $resource("http://localhost:8080/prodotti/:prodotto",{prodotto:'@prodotto'});/*, {
                headers : { authorization : "Basic "
                + btoa(username+ ":" + password)
            }});
});*/