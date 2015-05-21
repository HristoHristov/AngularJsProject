app.controller('WSNLoginController', function($scope, $window, $timeout, requester){
    $scope.title = "Login";
    $scope.username = '';
    $scope.password = '';
    console.log('login');
    $scope.userLogin = function(){
        var data = {
            "username": $scope.username,
            "password": $scope.password
        }
        requester.postRequest('users/Login', {}, data).then(
            function(response){
                console.log(response)
                sessionStorage['Authorization'] = response.token_type + ' ' + response.access_token;
                sessionStorage['expires_in'] = response.expires_in;
                sessionStorage['userName'] = response.userName;
                sessionStorage['entered'] = false;
                $window.location.assign('#/');
                $window.location.reload(true);
            },
            function(error){
                console.log(error);
            }
        )
    }
});
