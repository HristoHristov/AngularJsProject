app.controller('WSNChangeUserPassword', function ($scope, $controller, $rootScope, requester) {
    $rootScope.$on('$includeContentLoaded', function() {
        $('#input-submit').attr('disabled','disabled');
    });
    var request = $controller('requests');
    request.getInfoForMe().then(
        function (sucess) {
            if(sessionStorage['image'] !== 'null' && sessionStorage['image'] !== null) {
                $scope.image = sessionStorage['image'];
            }
            $scope.username = sessionStorage.userName;
            sessionStorage.image == 'null' ? $scope.loginUserImage = 'img/images.jpg' : $scope.loginUserImage = sessionStorage.image;
            $scope.name = sessionStorage.name;
            if(sessionStorage.coverImage != 'null' ) {
                console.log(sessionStorage.coverImage)
                var style = '<style>header::before{background-image: url("' + sessionStorage.coverImage + '");}</style>'

                $('header').append(style)
            }
        }
    )
    $scope.isLogin = true;
    $scope.headerData = variables.headerData();
    $scope.change = 'change';
    $scope.margin = '6%';
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