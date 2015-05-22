app.config(function($routeProvider){
    $routeProvider.when('/Login', {
        templateUrl: './templates/LoginTemplate.html',
        controller: 'WSNLoginController'
    });
    $routeProvider.when('/Register', {
        templateUrl: './templates/RegisterTemplate.html',
        controller: 'WSNRegisterController'
    });
    $routeProvider.when('/', {
        templateUrl: './templates/homePageTemplate.html',
        controller: 'WSNHomePageController'
    });
    $routeProvider.when('/Logout', {
        template: '',
        controller: 'WSNLogoutController'
    });
    $routeProvider.when('/Settings', {
        templateUrl: './templates/editProfileTemplate.html',
        controller: 'WSNEdtProfileController'
    });
});