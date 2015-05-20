app.controller('WSNLogoutController', function($http, $window, requester){
    console.log('logout')
    var headers = {
        "Authorization" : sessionStorage.Authorization
    };
    requester.postRequest('users/logout', headers).then(
        function(success){
            sessionStorage.clear();
            console.log(success)
            $window.location.assign('#/Login');
            $window.location.reload(true);
        },
        function(error){
            sessionStorage.clear();
            //$window.location.reload(true);
            console.log(error);
        }
    )
})