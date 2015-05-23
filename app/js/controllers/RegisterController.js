app.controller('WSNRegisterController', function($scope, $window, requester){
    $scope.title = "Register"
    $scope.username = '';
    $scope.name = '';
    $scope.password = '';
    $scope.repeatPass = '';
    $scope.email = '';
    $scope.gender = '';
    $scope.headerData = variables.headerData;

    $scope.userRegister = function(){
        var data = {
            "username": $scope.username,
            "password": $scope.password,
            "confirmPassword": $scope.repeatPass,
            "name": $scope.name,
            "email": $scope.email,
            "gender": $scope.gender
        }
        requester.postRequest('users/register', {}, data).then(
            function(response){
                sessionStorage['Authorization'] = response.token_type + ' ' + response.access_token;
                sessionStorage['userName'] = response.userName;
                $window.location.assign('#/');
                $window.location.reload(true);
            },
            function (error) {
                console.log(error);
            }
        );
    }
});