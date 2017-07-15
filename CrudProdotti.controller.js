(function(){
    var app = angular.module('myapp');
    app.controller('CrudProdottiCtrl', ['$scope', 'CrudProdottiSvc', function($scope, CrudProdottiSvc){

    $scope.addProdottoNuovo = function(){
       /* var prodottoNuovo={
                        "nome": $scope.nome,
                        "tipoprodotto": $scope.tipoProdotto,
                        "prezzo": $scope.prezzo,
                        "ingredienti": $scope.ingredienti,
                        "foto": $scope.myFile.name,
                        "disponibile": $scope.disponibile
                    };
*/
       // var file = $scope.myFile;
        CrudProdottiSvc.addProdottoNuovo($scope.nome,$scope.tipoProdotto,$scope.prezzo,
                                        $scope.ingredienti, $scope.disponibile,
                                        $scope.myFile.name,$scope.myFile, "sheryuser", "123");
    };
    
    }]);
})();