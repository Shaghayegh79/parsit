(function () {
    var app = angular.module('myapp');
    app.controller('OrdinazioneCtrl',['OrdinazioneSvc','GetIdClienteSvc','ProdottiSvc','IngextraSvc','loginSvc',
      function(OrdinazioneSvc,GetIdClienteSvc,ProdottiSvc,IngextraSvc,loginSvc) {
        this.ordine ={};
        this.auth=false;
        this.idCliente=0;
        this.doLogin=doLogin;
       // var username="goliuser";
        //var password="234";
        var self = this;
        function doLogin(){
            loginSvc.login(self.username,self.password)
                        .then(function(data){
                            self.auth=data;    
                            GetIdClienteSvc.getIdCliente(self.username,self.password)
                                 .then(function(data){self.idCliente= data.cliente_id;});

                        });
           
                       }
       // loginSvc.setUserPass(self.username,self.password);
        //try { 
    //        self.auth0 = loginSvc.login(username,password).get().$promise.then(function(data) {
  //                                                   self.auth = data;
//            });

       // } catch(err) { this.errorMessage="invali username o password"; }
        
        var ingextraSelected={};
        var credentials = {};
        //this.authorizato=false;
        ProdottiSvc.getProdotti()
            .then(function (data) {
                self.listaProdotti = data;
            });
        IngextraSvc.getIngextraList()
                .then(function (data) {
                self.listaIngextra = data;
            });
       

        
             //self.authorizato= loginSvc.login();
            //self.authorizato = lognSvc.get();
           // self=this;
            //if (typeof self.authorizato === 'undefined') {self.authorizato = false;}        
            //UserSvs.query();//self.credentials.username, self.credentials.password);
     //       alert(self.authorizato);  
           // LoginSvc.login(self.credentials.username, self.credentials.password);
             //   .then(function (data) {
   //                       self.authorizato = data;
 //                   });
            //if (self.creaCarelloHelper!=null) self.concludi();
        
        this.addToTotal= function(ingextraPrezzo,indexIngextra,indexCarello){
            if(this.carello[indexCarello].ingextra[indexIngextra]==true) this.prezzoTotale= this.prezzoTotale + ingextraPrezzo;
            else this.prezzoTotale= this.prezzoTotale - ingextraPrezzo;
        };

        this.addToCarello = function (index) {
            var nome = this.listaProdotti[index].nome;
            var prezzo = this.listaProdotti[index].prezzo;
            var idProdotto= this.listaProdotti[index].idprodotto;
            if (typeof this.carello === 'undefined') {this.carello = [];}
            this.carello.push({"idProdotto":idProdotto, "nome": nome, "prezzo": prezzo,"ingextra":{} });
            if (typeof this.prezzoTotale === 'undefined') { this.prezzoTotale = 0.00;}
            this.prezzoTotale = this.prezzoTotale + prezzo;

        };
        this.setFlag=function(indexCarello){
           if (typeof this.showFlag === 'undefined') {this.showFlag = [];}        
           this.showFlag[indexCarello]= !this.showFlag[indexCarello];
        };
       this.creaVociCarello=function(item){
                        self.vociCarello = [];
                        self.vociCarello.push({"idProdotto":item.idProdotto, "ingExtraScelti":item.ingextra });
                    }
       this.preparaWrapperCarello=function(){
            self.carello.forEach(self.creaVociCarello);
            self.ordine ={"nota":self.nota, "idcliente": self.idCliente};
            self.WrapperCarello={"ordine":self.ordine, "vociCarello": self.vociCarello};
        }
        this.concludi=function(){
            self.flagConcludi=true;
            if  (!self.auth)   
               alert("per favore effettua login per coccludere ordine!!");
            else
            {
                self.preparaWrapperCarello();
                OrdinazioneSvc.ordinazione(self.idCliente,self.WrapperCarello,self.username,self.password);
                this.flagConcludi=false;
            }
        }
    }]);
})();