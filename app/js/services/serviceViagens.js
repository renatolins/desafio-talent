(function() {

    routingViews.service('serviceViagens', function() {

      //GET
        this.obtemViagens = function() {

            var viagens = [];
            var totalItems = localStorage.getItem("numeroViagem");
            for (var i = 0; i <= totalItems; i++) {
                viagens[i] = localStorage.getObj(i);
            }
            return viagens;
        }

        //SET
        this.adicionaViagem = function(viagem) {

            //cria ou incrementa no índice da viagem
            if (!localStorage.getItem("numeroViagem")) {
                localStorage.setItem("numeroViagem", 0);
                localStorage.setObj(0, null); //zera o obeto 0 caso exista

            } else {
                localStorage.numeroViagem = parseInt(localStorage.getItem("numeroViagem")) + 1;
            }
            localStorage.setObj(localStorage.numeroViagem, viagem);
        }

        //ZERA
        this.limparRegistros = function(objectToBeNull) {
            localStorage.removeItem("numeroViagem");
            localStorage.setObj(0, null); //zera o obeto 0 caso exista
            objectToBeNull = null;


        }

    });

})();
