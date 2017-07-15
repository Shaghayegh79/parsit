(function () {
    
    var app = angular.module('myapp');
    app.controller('libreriaCtrl',['loginSvc','AutoreSvc',function(loginSvc,AutoreSvc) {
        this.doLogin = doLogin;
        this.sortBy = sortBy;
        this.setFlag=setFlag;

        this.auth=false;
        this.propertyName = 'autore';
        this.reverse = true;
        var self = this;

       function sortBy(propertyName) {
            self.reverse = (self.propertyName === propertyName) ? !self.reverse : false;
            self.propertyName = propertyName;
        };

        function setFlag(indexAutore,id){
           self.idAutore=id;
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