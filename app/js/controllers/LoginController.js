app.controller('WSNLoginController', function($scope, $window, $timeout, requester){
    $scope.title = "Login";
    $scope.username = '';
    $scope.password = '';
    console.log('login');
    $scope.headerData = variables.headerData;
    variables.hideLoaderImage();
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

                requester.getRequest('me', variables.headers).then(
                    function(userData) {
                        console.log(userData)

                        sessionStorage['name'] = userData.name;
                        sessionStorage['image'] = userData.profileImageData;
                        $window.location.assign('#/');
                        $window.location.reload(true);
                    },
                    function (err) {
                        console.log(err);

                    }
                )
            },
            function(error){
                console.log(error);
            }
        )
    }

});
