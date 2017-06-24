(function () {
    var app = angular.module('myapp');
    app.controller('ListaPaesiCtrl',['ListaPaesiSvc',function(ListaPaesiSvc){
         this.listaPaesi={};
         var self = this;
         ListaPaesiSvc.getListaPaesi()
            .then(function (data) {
                self.listaPaesi = data;
            });

    }]);
})();