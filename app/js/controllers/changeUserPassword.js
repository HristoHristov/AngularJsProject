app.controller('WSNChangeUserPassword', function ($scope, $controller, $rootScope, requester) {
    $rootScope.$on('$includeContentLoaded', function() {
        $('#input-submit').attr('disabled','disabled');
    });
    $scope.headerData = variables.headerData;
    $scope.change = 'change';
    $scope.margin = '6.65%';
    $rootScope.location = window.location.href;
    $scope.oldPassword = '';
    $scope.newPassword = '';
    $scope.repeatPassword = '';
    var request = $controller('requests');
    request.getFriendRequests().then(
        function (success) {
            $scope.friendsRequests = success;
            $scope.friendsRequestCount = success.length;
            $rootScope.location = window.location.href;
            console.log(success)
        }
    )
    $scope.showFriendRequest = function() {
        request.showFriendRequests();
    }
    $scope.searchUser = function(e) {
        if(e.currentTarget.value.length === 0) {
            $scope.users = [];
        }
        else {
            request.searchUserByName(e).then(
                function(sucess) {
                    $scope.users = sucess;
                }
            )
        }
    }
    $scope.checkingOldPassword = function() {
        console.log($scope.oldPassword);
        variables.checkingInputData($scope.oldPassword, variables.passwordRegex, 'password', '#password', 3)
    }
    $scope.checkingNewPassword = function() {
        console.log($scope.newPassword);
        variables.checkingInputData($scope.newPassword, variables.passwordRegex, 'newPassword', '#new-password', 3)
    }
    $scope.checkingRepeatPassword = function() {
        console.log($scope.repeatPassword);
        variables.checkingInputData($scope.repeatPassword, $scope.newPassword, 'repeatPassword', '#rep-password', 3)
    }
    $scope.changePassword = function() {
        console.log('change')
        var data = {
            "oldPassword" : $scope.oldPassword,
            "newPassword" : $scope.newPassword,
            "confirmPassword" : $scope.repeatPassword
        };
        requester.putRequest('me/changepassword', variables.headers(), data).then(
            function (sucess) {
                console.log(sucess);
            },
            function (err) {
                console.log(err)
            }
        )
    }
    variables.hideLoaderImage();
})