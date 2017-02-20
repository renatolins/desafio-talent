(function() {

    routingViews.config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/viagens'); //url quando nenhum estado é informado

        $stateProvider

            //VIAGENS
            .state('viagens', {
                url: '/viagens',
                templateUrl: '../templates/viagens.html',
                controller: function($state) {
                    $state.go('viagens.cadastro');
                }

            })

            .state('viagens.cadastro', {
                url: '/cadastro',
                templateUrl: '../views/cadastro.html',
                controller: 'controllerCadastro'
            })

            .state('viagens.listagem', {
                url: '/listagem',
                templateUrl: '../views/listagem.html',
                controller: 'controllerListagem'
            })

            //SOBRE
            .state('sobre', {
                url: '/sobre',
                views: {
                    '': {
                        templateUrl: '../templates/sobre.html'
                    },
                    'infoDiv@sobre': {
                        templateUrl: '../views/info-teste.html',

                    },
                    'logoDiv@sobre': {
                        template: '<div class="logo-container jumbotron text-center"><img src="../img/logo_pessoal.png" alt="Logotipo Renato Lins"></div>'

                    }
                }

            })

    });


})();
