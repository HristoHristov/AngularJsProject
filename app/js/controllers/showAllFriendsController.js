app.controller('WSNGetAllFriendsList', function($scope, $rootScope, $controller, $routeParams, requester) {
    console.log('vliza');
    $rootScope.location = window.location.href;
    var request = $controller('requests');
    console.log($routeParams.username);
    if(sessionStorage.image == 'null') {
        $scope.image = "img/images.jpg";
    }
    else {
        $scope.image = sessionStorage.image;
    }
    if(sessionStorage.userName === $routeParams.username) {
        requester.getRequest('me/friends', variables.headers()).then(
            function (success) {
                $scope.friends = success;
                console.log(success);
            },
            function (err) {
                console.log(err)
            }
        )
    }
    else {
        requester.getRequest('users/' + $routeParams.username + '/friends', variables.headers()).then(
            function (success) {
                $scope.friends = success;
                console.log(success);
            },
            function (err) {
                console.log(err)
            }
        )
    }
    request.getFriendRequests().then(
        function (success) {
            $scope.friendsRequests = success;
            $scope.friendsRequestCount = success.length;
            $rootScope.location = window.location.href;
            console.log(success)
        }
    )
    $scope.searchUserByName = '';
    $scope.margin = '6.65%';
    $scope.isLogin = true;
    $scope.headerData = variables.headerData;
    variables.hideLoaderImage();
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

})