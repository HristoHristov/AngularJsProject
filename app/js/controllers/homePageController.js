app.controller('WSNHomePageController', function($scope, $window, requester){
    if(sessionStorage.length == 0){
        $scope.margin = "200px";
        var navHeaderData = [
            {id: 'home', href: '#/', linkValue: 'Home'},
            {id: 'login', href: '#/Login', linkValue: 'Login'},
            {id: 'register', href: '#/Register', linkValue: 'Register'}
        ];
        $scope.headerData = navHeaderData;
        $window.location.assign('#/Login');
    }
    else {
        if(sessionStorage.image === null) {
            $scope.image = "img/images.jpg";
        }
        else {
            $scope.image = sessionStorage.image;
        }

        $scope.name = sessionStorage.name;

        $scope.margin = "115px";
        $scope.isLogin = true;
        $scope.post= '';

        var navHeaderData = [
            {id: 'home', href: '#/', linkValue: 'Home'},
            {id: 'friend-request', href: '#/Friend-Request', linkValue: 'Friends Request'},
            {id: 'settings', href: '#/Settings', linkValue: 'Settings'},
            {id: 'logout', href: '#/Logout', linkValue: 'Logout'}
        ];
        $scope.headerData = navHeaderData;
        var headers = {
            "Authorization" : sessionStorage.Authorization
        };
        var username = sessionStorage.userName;
        requester.getRequest('users/'+ username + '/wall?StartPostId&PageSize=5', headers).then(
            function(response){
                $scope.friendsRequest = 1;
                console.log(response)
                $scope.posts = response;
            },
            function(error){
                console.log(error);
            }
        )

        $scope.likePost = function(postId) {
            requester.postRequest('Posts/' + postId + '/likes', headers).then(
                function(data) {
                    $window.location.reload(true);
                },
                function(err) {
                    console.log(err);
                }
            )
        }
        $scope.unlikePost = function(postId) {
            requester.deleteRequest('Posts/' + postId + '/likes', headers).then(
                function(data) {
                    $window.location.reload(true);
                },
                function(err) {
                    console.log(err);
                }
            )
        }
        $scope.likeComment = function(postId, commentId) {
            requester.postRequest('posts/' + postId + '/comments/' + commentId + '/likes', headers).then(
                function(data) {
                    $window.location.reload(true);
                },
                function(err) {
                    console.log(err);
                }
            );
        }
        $scope.unlikeComment = function(postId, commentId) {
            requester.deleteRequest('posts/' + postId + '/comments/' + commentId + '/likes', headers).then(
                function(data) {
                    $window.location.reload(true);
                },
                function(err) {
                    console.log(err);
                }
            );
        }
        $scope.addComment = function(id, e) {
            console.log(e.srcElement.value)

            if(e.keyCode == '13') {
                var data = {
                    "commentContent": e.srcElement.value
                };

                requester.postRequest('posts/' + id + '/comments', headers, data).then(
                    function(success) {
                        $window.location.reload(true);
                    },
                    function(err) {
                        console.log(err);
                    }
                )
            }
        }
        $scope.addPost = function(){
            var data = {
                "postContent": $scope.post,
                "username": sessionStorage.userName
            };

            requester.postRequest('Posts', headers, data).then(
                function(requester){
                    $window.location.reload(true);
                },
                function (error) {
                    console.log(error);

                }
            );
        }
    }
});
app.run(function($timeout, $window) {
    if(sessionStorage.entered === 'false') {
        $timeout(function () {
            sessionStorage.clear();
            $window.location.reload(true);

        }, 31535999);
        sessionStorage.entered = true;
    }
});
