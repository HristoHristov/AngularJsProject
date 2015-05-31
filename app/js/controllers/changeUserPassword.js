app.controller('WSNChangeUserPassword', function ($scope, $controller, $rootScope, requester) {
    $rootScope.$on('$includeContentLoaded', function() {
        $('#input-submit').attr('disabled','disabled');
    });
    var request = $controller('requests');
    request.getInfoForMe().then(
        function (sucess) {
            $scope.image = 'img/images.jpg';
            if(sessionStorage['image'] != 'null') {
                $scope.image = sessionStorage['image'];
            }
            $scope.username = sessionStorage.userName;
            sessionStorage.image == 'null' ? $scope.loginUserImage = 'img/images.jpg' : $scope.loginUserImage = sessionStorage.image;
            $scope.name = sessionStorage.name;
            if(sessionStorage.coverImage != 'null' ) {
                var style = '<style>header::before{background-image: url("' + sessionStorage.coverImage + '");}</style>'

                $('header').append(style)
            }
        }
    )
    $scope.isLogin = true;
    $scope.headerData = variables.headerData();
    $scope.change = 'change';
    $scope.margin = variables.checkingResultion();
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
        variables.checkingInputData($scope.oldPassword, variables.passwordRegex, 'password', '#password', 3)
    }
    $scope.checkingNewPassword = function() {
        variables.checkingInputData($scope.newPassword, variables.passwordRegex, 'newPassword', '#new-password', 3)
    }
    $scope.checkingRepeatPassword = function() {
        variables.checkingInputData($scope.repeatPassword, $scope.newPassword, 'repeatPassword', '#rep-password', 3)
    }
    $scope.changePassword = function() {
        var data = {
            "oldPassword" : $scope.oldPassword,
            "newPassword" : $scope.newPassword,
            "confirmPassword" : $scope.repeatPassword
        };
        requester.putRequest('me/changepassword', variables.headers(), data).then(
            function (sucess) {
                variables.showPrompt("Congratulations....", "Change Profile password successful", "success", 1500);
                $timeout(function() {
                    $window.location.assign('#/');
                    $window.location.reload(true);
                }, 2000)
            },
            function (err) {
                variables.showPrompt("Incorrect Image type", "error");
                $timeout(function() {
                    $window.location.reload(true);
                }, 2000)
            }
        )
    }
    variables.hideLoaderImage();
})