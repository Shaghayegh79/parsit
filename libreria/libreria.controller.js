(function () {
    var app = angular.module('myapp');
    app.controller('libreriaCtrl',['loginSvc','AutoreSvc',function(loginSvc,AutoreSvc) {
        this.auth=false;
        this.doLogin=doLogin;
        var self = this;
        this.setFlag=function(indexAutore,id){
           self.idAutore=id;
           //self.indexAutore=indexAutore;
          // alert(self.indexAutore);
           if (typeof this.showFlag === 'undefined') {this.showFlag = [];}        
           this.showFlag[indexAutore]= !this.showFlag[indexAutore];

        }
        function doLogin(){
            loginSvc.login(self.username,self.password)
                .then(function(data){
                    if (data) {
                        self.auth=true;
                        AutoreSvc.getListaAutori(self.username,self.password)
                        .then(function (lista) {
                        self.listaAutori = lista;
                     });
                    }
      
                }); 
        }

    }]);
})();