app.controller('WSNHomePageController', function($scope, $controller, $rootScope, $window, $location, editPost, editComment, requester){
    if(sessionStorage.length === 0) {
        $window.location.assign('#/Login');
        $window.location.reload(true);
    } else {
        $scope.image = "img/images.jpg";
        var request = $controller('requests');
        $scope.headerData = variables.headerData();
        console.log($scope.headerData)
        $scope.loginUserUsername = sessionStorage.userName;

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

        $scope.showAddComment = true;
        $scope.name = sessionStorage.name;
        $scope.user=""
        $scope.isLogin = true;
        $scope.margin = '6%';
        $scope.post= '';
        $scope.showAddUserButton = false;
        $scope.isFirstPage = true;
        $scope.thisPageIndex = 1;
        $scope.showAddPost = true;



        var PostId = '';
        var lastPostId = [];
        lastPostId.push(PostId);
        var editedCommentId = 0;
        var username = sessionStorage.userName;
        request.getFriendRequests().then(
            function (success) {
                $scope.friendsRequests = success;
                $scope.friendsRequestCount = success.length;
                $rootScope.location = window.location.href;
                console.log(success)
            }
        )
        request.getMyFriend().then(
            function (success) {
                sessionStorage.myFriend = JSON.stringify(success);
                $scope.friends = success;
            }
        );

        request.getUserWall(username, '').then(
            function (response) {
                if(response.length > 0) {
                    $scope.posts = response;
                    lastPostId.push(response[response.length - 1].id)
                    console.log(lastPostId);
                }
                variables.hideLoaderImage();
            }
        )
        $scope.showEditPost = function(index){
            editPost.showEditPost(index);
        }
        $scope.hideEditPost = function(index){
            editPost.hideEditPost(index);
        }
        $scope.editPost = function(postContent, index) {
            editPost.editPost(postContent, index);
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
        $scope.approveFriend = function(id) {
            request.approveFriend(id);
        }
        $scope.rejectFriend = function(id) {
            request.rejectFriend(id);
        }
        $scope.showFriendRequest = function() {
            request.showFriendRequests();
        }
        $scope.checkingIsFriends = function(username) {
            var result = request.checkingIsFriend(username, $scope.friends);
            return result;
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
        $scope.addComment = function(id, e) {
            request.addComment(id, e);
        }
        $scope.addPost = function(post){
            request.addPost(post, username);
        }
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

    }
});
