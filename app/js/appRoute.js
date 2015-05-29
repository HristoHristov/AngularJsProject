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
    $routeProvider.when('/FriendsWall/:username', {
        templateUrl: './templates/friendsWallTemplate.html',
        controller: 'WSNFriendWallController'
    });
    $routeProvider.when('/show-friend-list/:username', {
        templateUrl: './templates/userFriendTemplate.html',
        controller: 'WSNGetAllFriendsList'
    });
    $routeProvider.when('/Change-Password', {
        templateUrl: './templates/changePasswordTemplaate.html',
        controller: 'WSNChangeUserPassword'
    });
    $routeProvider.when('/News-Feed', {
        templateUrl: './templates/newsFeedPageTemplate.html',
        controller: 'WSNNewsFeedPageController'
    });
});