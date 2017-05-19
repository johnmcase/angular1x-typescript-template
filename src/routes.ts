/** @ngInject */
export default function routesConfig(
  $stateProvider: angular.ui.IStateProvider,
  $urlRouterProvider: angular.ui.IUrlRouterProvider,
  $locationProvider: angular.ILocationProvider
) {

  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider
    .otherwise('/hello-world');

  $stateProvider
    .state('hello', {
      url: '/hello-world',
      component: 'helloWorld'
    });
}
