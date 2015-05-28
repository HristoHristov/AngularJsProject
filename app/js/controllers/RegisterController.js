app.controller('WSNRegisterController', function($scope, $rootScope, $window, requester){
    $scope.title = "Register"
    $scope.username = '';
    $scope.name = '';
    $scope.password = '';
    $scope.repeatPass = '';
    $scope.inputEmail = '';
    $scope.gender = '';
    $rootScope.$on('$includeContentLoaded', function() {
        $('#input-submit').attr('disabled','disabled');
    });
    $scope.headerData = variables.headerData;
    variables.hideLoaderImage()
    $scope.checkingUsername = function(){
        variables.checkingInputData($scope.username, variables.usernameRegex, 'username', '#username', 5);
    }
    $scope.checkingPassword = function () {
        variables.checkingInputData($scope.password, variables.passwordRegex, 'password', '#password', 5);
    }
    $scope.checkingEmail = function () {
        variables.checkingInputData($scope.inputEmail, variables.emailRegex, 'email', '#email', 5);
    }
    $scope.checkingName = function () {
        variables.checkingInputData($scope.name, variables.nameRegex, 'name', '#name', 5);
    }
    $scope.checkingRepeatPassword = function () {
        variables.checkingInputData($scope.repeatPass, $scope.password, 'repeat-password', '#rep-password', 5);
    }
    $scope.userRegister = function(){
        var data = {
            "username": $scope.username,
            "password": $scope.password,
            "confirmPassword": $scope.repeatPass,
            "name": $scope.name,
            "email": $scope.inputEmail,
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