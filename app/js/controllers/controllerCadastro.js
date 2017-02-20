(function() {


    routingViews.controller('controllerCadastro', ['$scope', 'serviceViagens', '$timeout', function($scope, serviceViagens, $timeout) {

        //helpers
        $scope.dateHelper = {
            currentDate: new Date()
        };

        //Envia o form se for válido
        $scope.enviaform = function($formIsValid) {

            if ($formIsValid) {

                //adiciona uma viagem
                serviceViagens.adicionaViagem($scope.viagem);

                //limpa o form
                $scope.viagem = {};
                $scope.formCadastro.$setPristine();
                $scope.enviado = false;

                //aviso de viagem cadastrada
                $scope.mostraMensagem = true;
                $scope.mensagemCadastro = 'Viagem inserida com sucesso!';
                $scope.onTimeout = function() {
                    $scope.mostraMensagem = false;
                    var campoOrigem = document.getElementById('form-cadastro_origem');
                    if (campoOrigem) {
                        campoOrigem.focus();
                    }
                }
                $timeout($scope.onTimeout, 1500);

            }

        };


    }]);

})();
