var mainApplicationModuleName = 'mean';

var mainApplicationModule = angular.module(mainApplicationModuleName, ['ngRoute', 'example']);
// var mainApplicationModule = angular.module(mainApplicationModuleName, ['example']);

// Hashbangs support
mainApplicationModule.config(['$locationProvider', function ($locationProvider) {
    $locationProvider.hashPrefix('!');
}]);

angular.element(document).ready(function () {
    angular.bootstrap(document, [mainApplicationModuleName]);
});
