app.controller('WSNLoginController', function($scope, $rootScope, $controller, $window, $timeout, requester){
    $scope.title = "Login";
    sessionStorage.clear();
    $scope.username = '';
    $scope.password = '';
    var request = $controller('requests');
    $scope.margin = '26%'
    console.log('login');
    $scope.headerData = variables.headerData();
    $rootScope.$on('$includeContentLoaded', function() {
        $('#input-submit').attr('disabled','disabled');
    });
    $scope.checkingUsername = function() {
        variables.checkingInputData($scope.username, variables.usernameRegex, 'username', '#username', 2)
    }
    $scope.checkingPassword = function() {
        variables.checkingInputData($scope.password, variables.passwordRegex, 'password', '#password', 2)
    }
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
                variables.showPrompt("Congratulations....", "Login successful", "success", 1500);
                $timeout(function() {
                    $window.location.assign('#/');
                    $window.location.reload(true);
                }, 2000)
            },
            function(error){
                variables.showPrompt("Ooooppppppssss....", "Invalid username or password", "error", 1500);
            }
        )
    }

});
