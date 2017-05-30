var mainApplicationModuleName = 'mean';

var mainApplicationModule = angular.module(mainApplicationModuleName, ['ngRoute', 'users', 'example']);
// var mainApplicationModule = angular.module(mainApplicationModuleName, ['example']);

// Hashbangs support
mainApplicationModule.config(['$locationProvider', function ($locationProvider) {
    $locationProvider.hashPrefix('!');
}]);

// Resolve Facebook authentication redirect bug
if(window.location.hash === '#_=_') {
    window.location.hash = '#!';
}

angular.element(document).ready(function () {
    angular.bootstrap(document, [mainApplicationModuleName]);
});
