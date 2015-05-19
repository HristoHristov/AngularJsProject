app.controller('WSNLoginController', function($scope, requester){
    $scope.title = "Login";
    $scope.username = '';
    $scope.password = '';

    $scope.userLogin = function(){
        var data = {
            "username": $scope.username,
            "password": $scope.password
        }
        requester.postRequest('users/Login', {}, data).then(
            function(response){
                console.log(response);
            },
            function(error){
                console.log(error);
            }
        )
    }
});