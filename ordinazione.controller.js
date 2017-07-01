(function () {
    var app = angular.module('myapp');
    app.controller('OrdinazioneCtrl',['OrdinazioneSvc','GetIdClienteSvc','ProdottiSvc','IngextraSvc','loginSvc',
      function(OrdinazioneSvc,GetIdClienteSvc,ProdottiSvc,IngextraSvc,loginSvc) {
        this.ordine ={};
        this.auth=false;
        this.idCliente=0;
        this.doLogin=doLogin;
        var self = this;
        function doLogin(){
            loginSvc.login(self.username,self.password)
                        .then(function(data){
                            self.auth=data;    
                            GetIdClienteSvc.getIdCliente(self.username,self.password)
                                 .then(function(data){self.idCliente= data.cliente_id;});

                        });
           
                       }

        var ingextraSelected={};
        var credentials = {};
        ProdottiSvc.getProdotti()
            .then(function (data) {
                self.listaProdotti = data;
            });
        IngextraSvc.getIngextraList()
                .then(function (data) {
                self.listaIngextra = data;
            });
       
        this.addToTotal= function(ingextraPrezzo,idIngextra,indexCarello){
            if(this.carello[indexCarello].ingextra[idIngextra]==true) this.prezzoTotale= this.prezzoTotale + ingextraPrezzo;
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
        this.removeFromCarello = function (indexCarello) {
            alert(indexCarello);
            var prezzo = this.carello[indexCarello].prezzo;
            this.prezzoTotale = this.prezzoTotale - prezzo;
            for (i=0;i<Object.keys(this.carello[indexCarello].ingextra).length;i++)
            {
                self.idIngextraScelta = Object.keys(this.carello[indexCarello].ingextra)[i];
                TrueFalseIngextraScelta = Object.values(this.carello[indexCarello].ingextra)[i];
                if (TrueFalseIngextraScelta)
                {   
                    for (var index in self.listaIngextra) {
                      //alert(Object.keys(self.listaIngextra[index])[0]);
                      //alert(self.idIngextraScelta+"-"+self.listaIngextra[index].idingextra);
                        if (self.idIngextraScelta == self.listaIngextra[index].idingextra) {
                            this.prezzoTotale = this.prezzoTotale - self.listaIngextra[index].prezzo;
                        }
                    }
                }
            }

           if (this.carello.length===1) this.carello.splice(-1,1);
           else  this.carello.splice(indexCarello,1);
           //if (typeof this.carello[indexCarello+1] !== "undefined") this.carello[indexCarello+1].
        };

        this.setFlag=function(index){
           if (typeof this.showFlag === 'undefined') {this.showFlag = [];}        
           this.showFlag[index]= !this.showFlag[index];
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