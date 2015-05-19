app.config(function($routeProvider){
    $routeProvider.when('/Login', {
        templateUrl: './templates/LoginTemplate.html',
        controller: 'WSNLoginController'
    });
    $routeProvider.when('/Register', {
        templateUrl: './templates/RegisterTemplate.html',
        controller: 'WSNRegisterController'
    });
});