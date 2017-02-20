(function() {

    routingViews.controller('controllerListagem', ['$scope', 'serviceViagens', function($scope, serviceViagens) {

        //disponibiliza no escopo as viagens do storage
        $scope.viagens = serviceViagens.obtemViagens();

        //exclui registros existentes
        $scope.limparRegistros = function() {
            serviceViagens.limparRegistros();
            $scope.viagens = serviceViagens.obtemViagens();
        }

    }]);

})();
