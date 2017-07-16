(function () {
    
    var app = angular.module('myapp');
    app.controller('libreriaCtrl',['loginSvc','AutoreSvc',function(loginSvc,AutoreSvc) {
        this.doLogin = doLogin;
        this.sortBy = sortBy;
        this.sortLibriBy = sortLibriBy;
        this.setFlag=setFlag;

        this.auth=false;
        this.propertyName = 'autore';
        this.propertyLibro = 'titolo';
        this.reverse = true;
        this.reverseLibro = true;

        var self = this;

       function sortBy(propertyName) {
            self.reverse = (self.propertyName === propertyName) ? !self.reverse : false;
            self.propertyName = propertyName;
        };
       function sortLibriBy(propertyLibro) {
            self.reverseLibro = (self.propertyLibro === propertyLibro) ? !self.reverseLibro : false;
            self.propertyLibro = propertyLibro;
        };

        function setFlag(indexAutore){
           if (typeof this.showFlag === 'undefined') {
               this.showFlag= [];
               this.showFlag[indexAutore] = true} 
           else{
                var flagAttuale= this.showFlag[indexAutore];
                this.showFlag=[];
                this.showFlag[indexAutore]= !flagAttuale;
           }     
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