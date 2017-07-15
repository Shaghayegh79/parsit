(function(){
    var app = angular.module('myapp');
    app.service('CrudProdottiSvc', ['$http', function ($http) {
        this.addProdottoNuovo = function(nome,tipoProdotto,prezzo,ingredienti,disponibile,foto,file, username, password){
            var fd = new FormData();
            fd.append('file', file);
            fd.append('nome', nome);
            fd.append('tipoprodotto', tipoProdotto);
            fd.append('prezzo', prezzo);
            fd.append('ingredienti', ingredienti);
            fd.append('foto', foto);
            fd.append('disponibile', disponibile);
            $http.post("http://localhost:8080//prodottiAdmin/1",
                        fd,
                        {transformRequest: angular.identity,
                         headers: {authorization : "Basic "+ btoa("sheryuser:123"), 'Content-Type': undefined}
                        }
                      );
                        
        }
    }]);
    
})();