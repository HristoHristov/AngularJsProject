app.controller('WSNFriendWallController', function($scope, $http, $routeParams, requester) {
    variables.showLoaderImage();
    console.log($routeParams.username);

    requester.getRequest('users/' + $routeParams.username +'/wall?StartPostId&PageSize=5', variables.headers).then(
        function (success) {
            console.log(success);
            $scope.posts = success;
            $scope.showAddComment = success[0].wallOwner.isFriend;
            success[0].wallOwner.profileImageData === null ? $scope.image = "img/images.jpg" : $scope.image = success[0].wallOwner.profileImageData;
            $scope.name = success[0].wallOwner.name;
            $scope.username = success[0].wallOwner.username;
            variables.hideLoaderImage();
        },

        function (err) {
            console.log(err);
        }
    );
    $scope.searchUser = function(e) {
        if(e.currentTarget.value.length === 0) {
            $scope.users = [];
        }
        else {
            requester.getRequest('users/search?searchTerm=' + e.currentTarget.value, variables.headers).then(
                function (success) {
                    $scope.users = success;
                },
                function (err) {
                    console.log(err);
                }
            )
        }
    }
    $scope.isLogin = true;
    $scope.showAddPost = false;
    $scope.headerData = variables.headerData;
    $scope.margin = "10%";

})