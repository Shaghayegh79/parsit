var app = angular.module('myapp',[])
.config(function($httpProvider) {
$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
});