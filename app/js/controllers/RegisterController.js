app.controller('WSNRegisterController', function($scope, requester){
    $scope.title = "Register"
    $scope.username = '';
    $scope.name = '';
    $scope.password = '';
    $scope.repeatPass = '';
    $scope.email = '';
    $scope.gender = '';

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
            function(data){
                console.log(data);
            },
            function (error) {
                console.log(error);
            }
        );
    }
});