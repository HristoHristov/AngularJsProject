app.controller('WSNLogoutController', function($http, $timeout, $window, requester){
    console.log('logout')

    requester.postRequest('users/logout', variables.headers()).then(
        function(success){
            sessionStorage.clear();
            variables.showPrompt("Logout", "success", null);
            $timeout(function() {
                $window.location.assign('#/Login');
                $window.location.reload(true);
            }, 2000)
        },
        function(error){
            sessionStorage.clear();
        }
    )
})