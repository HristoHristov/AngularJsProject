app.controller('WSNFriendWallController', function($scope, $rootScope, $controller, $http, $routeParams, editPost, editComment, requester) {
    $scope.isLogin = true;
    $scope.showAddPost = false;
    $scope.headerData = variables.headerData();
    $scope.margin = '6%';
    $scope.loginUserUsername = sessionStorage.userName;
    variables.showLoaderImage();
    var request = $controller('requests');
    $scope.isLogin = true;
    $scope.thisPageIndex = 1;
    $scope.post = ''
    var PostId = '';
    var lastPostId = [];
    lastPostId.push(PostId);
    $scope.thisPageIndex = 1;
    var username = $routeParams.username;
    console.log($routeParams.username);
    $scope.addPost = function(post){
        console.log(post)
        request.addPost(post);
    }
    $scope.showEditPost = function(index) {
        editPost.showEditPost(index);
    }
    $scope.hideEditPost = function(index) {
        editPost.hideEditPost(index);
    }
    $scope.editPost = function(postContent, index) {
        editPost.editPost(postContent, index);
    }
    request.getUserWall($routeParams.username, '').then(
        function (success) {
            console.log(success);
            $scope.posts = [];
            if(success.length > 0) {
                console.log(success)
                $scope.posts = success;
                $scope.showAddComment = success[0].wallOwner.isFriend;
                lastPostId.push(success[success.length - 1].id)
            }
        }
    );
    $scope.addComment = function(id, e) {
        request.addComment(id, e);
    }
    $scope.showFriendRequest = function() {
        request.showFriendRequests();
    }
    sessionStorage.image == 'null' ? $scope.loginUserImage = 'img/images.jpg' : $scope.loginUserImage = sessionStorage.image;
    request.getInfoForUser($routeParams.username).then(
        function (success) {
            console.log(success)
                success.profileImageData === null ? $scope.image = "img/images.jpg" : $scope.image = success.profileImageData;
                $scope.coverImage = success.coverImageData;
                $scope.name = success.name;
                $scope.username = success.username;
                $scope.hasFriends = success.isFriend;
                $scope.showAddPost = $scope.hasFriends;
                $scope.showAddUserButton = success.isFriend ===false && sessionStorage.userName !== $routeParams.username;
                $scope.friends = [];
                if($scope.hasFriends == true) {
                    console.log('friend')
                    request.getUserFriends($routeParams.username).then(
                        function (friends) {
                            $scope.friends = friends;
                        }
                    );
                }
        }
    );
    $scope.nextPage = function() {
        PostId = lastPostId[$scope.thisPageIndex];
        request.getUserWall(username, PostId).then(
            function (response) {
                if(response.length > 0) {
                    lastPostId.push(response[response.length - 1].id);
                    $scope.thisPageIndex++;
                    $scope.posts = response;
                    console.log(response);
                    console.log(lastPostId);
                }
            }
        )
    }
    $scope.previousPage = function() {
        if($scope.thisPageIndex > 1) {
            lastPostId.splice($scope.thisPageIndex, 1);
            $scope.thisPageIndex--;
            PostId = lastPostId[$scope.thisPageIndex -1];
            request.getUserWall(username, PostId).then(
                function (response) {
                    $scope.posts = response;
                    console.log(response);
                    console.log(lastPostId);
                }
            )
        }

    }
    $scope.firstPage = function() {
        if($scope.thisPageIndex > 1) {
            lastPostId.splice(2, lastPostId.length - 2);
            $scope.thisPageIndex = 1;
            PostId = lastPostId[$scope.thisPageIndex -1];
            request.getUserWall(username, PostId).then(
                function (response) {
                    $scope.posts = response;
                    console.log(response);
                    console.log(lastPostId);
                }
            )
        }
    }
    $scope.likePost = function(postId) {
        request.likePost(postId)
    }
    $scope.unlikePost = function(postId) {
        request.unlikePost(postId);
    }
    $scope.likeComment = function(postId, commentId) {
        request.likeComment(postId, commentId);
    }
    $scope.unlikeComment = function(postId, commentId) {
        request.unlikeComment(postId, commentId);
    }
    $scope.showEditComment = function(commentContent, index, id) {
        editComment.showEditComment(commentContent, index, id);
        $scope.commentContent = commentContent;
        editedCommentId = id;
    }
    $scope.hideEditComment = function(index) {
        editComment.hideEditComment(index);
    }
    $scope.editComment = function(postId, commentContent) {
        editComment.editComment(postId, commentContent, editedCommentId);
    }
    $scope.deleteComment = function(postId,commentId) {
        editComment.deleteComment(postId, commentId);
    }
    $scope.deletePost = function(id) {
        request.deletePost(id);
    }
    request.getFriendRequests().then(
        function (success) {
            $scope.friendsRequests = success;
            $scope.friendsRequestCount = success.length;
            $rootScope.location = window.location.href;
            console.log(success)
        }
    )
    $scope.approveFriend = function(id) {
        request.approveFriend(id);
    }
    $scope.rejectFriend = function(id) {
        request.rejectFriend(id);
    }

    $scope.addFriend = function(username) {
        console.log(username);
        requester.postRequest('me/requests/' + username, variables.headers(), {}).then(
            function (success) {
                console.log(success);
            },
            function (err) {
                console.log(err);
            }
        )
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