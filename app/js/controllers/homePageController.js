function loaded(){
    console.log('ready');
    console.log($('header'));
}
app.controller('WSNHomePageController', function($scope, $rootScope, $window, requester){
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

        $scope.users = [];
        variables.showLoaderImage();
        if(sessionStorage.image === null) {
            $scope.image = "img/images.jpg";
        }
        else {
            $scope.image = sessionStorage.image;
        }
        if(sessionStorage.coverImage !== null) {
            $rootScope.$on('$includeContentLoaded', function() {
                var style = '<style>header::before{background-image: url("' + sessionStorage.coverImage +'");}</style>'

                $('header').append(style)
            });


            var css = 'header:before { backgound-image: none}';

        }


        $scope.name = sessionStorage.name;
        $scope.user=""
        $scope.isLogin = true;
        $scope.margin = "10%";
        $scope.post= '';
        $scope.showAddUserButton = false;
        $scope.isFirstPage = true;
        $scope.thisPageIndex = 1;
        $scope.showAddPost = true;

        var editedCommentId = 0;
        var PostId = '';
        var lastPostId = [];
        lastPostId.push(PostId);

        var isShowFriendRequest = false;


        $scope.headerData = variables.headerData;
        var username = sessionStorage.userName;

        requester.getRequest('me/friends', variables.headers()).then(
            function (success) {
                $scope.friends = success;
            },
            function (err) {
                console.log(err)
            }
        )
        requester.getRequest('users/'+ username + '/wall?StartPostId=' + PostId + '&PageSize=5', variables.headers()).then(
            function(response){
                console.log(response);
                $scope.posts = response;
                variables.hideLoaderImage();
                lastPostId.push(response[response.length - 1].id)
                console.log(lastPostId);
                requester.getRequest('me/requests', variables.headers()).then(
                    function (success) {
                        $scope.friendsRequestCount = success.length;
                        $scope.friendsRequests = success;
                        console.log(success)

                    },
                    function (err) {
                        console.log(err);
                    }
                )
            },
            function(error){
                console.log(error);
            }
        )
        $scope.showEditPost = function(index){
            console.log(index);
            $('#' + index).css('display', 'block');
            $('.button' + index).css('display', 'block');
        }
        $scope.hideEditPost = function(index){
            console.log(index);
            $('#' + index).css('display', 'none');
            $('.button' + index).css('display', 'none');
        }
        $scope.editPost = function(postContent, index) {
            console.log(index);
            console.log(postContent);
            var data = {
                'postContent': postContent
            }
            requester.putRequest('Posts/' + index, variables.headers(), data).then(
                function (success) {
                    $window.location.reload(true);
                },
                function (err) {
                    console.log(err);
                }
            )

        }
        $scope.showEditComment = function(commentContent, index, id) {
            $('#' + index).show();
            $('#button' + index).show();
            editedCommentId = id;
            $scope.commentContent = commentContent;
        }
        $scope.hideEditComment = function(index) {
            $('#' + index).hide();
            $('#button' + index).hide();
        }
        $scope.editComment = function(postId, commentContent) {
            console.log(postId);
            console.log(editedCommentId);
            console.log(commentContent)
            var data = {
                "commentContent" : commentContent
            }
            requester.putRequest('posts/' + postId + '/comments/' + editedCommentId, variables.headers(), data).then(
                function (success) {
                    $window.location.reload(true);
                },
                function (err) {
                    console.log(err);
                }
            )
        }
        $scope.deleteComment = function(postId,commentId) {
            requester.deleteRequest('posts/' + postId + '/comments/' + commentId, variables.headers()).then(
                function (sucess) {
                    $window.location.reload(true);
                },
                function (err) {
                    console.log(err);
                }
            )
        }
        $scope.deletePost = function(id) {
            requester.deleteRequest('Posts/' + id, variables.headers()).then(
                function (sucess) {
                    $window.location.reload(true);
                },
                function (err) {
                    console.log(err);
                }
            )
        }
        $scope.approveFriend = function(id) {
            console.log('approve' + id);
            requester.putRequest('me/requests/' + id + '?status=approved', variables.headers()).then(function (success) {
                $window.location.reload(true);
            },function (err) {
                    console.log(err);
                }
            );
        }
        $scope.rejectFriend = function(id) {
            console.log('reject' + id);
            requester.putRequest('me/requests/' + id + '?status=rejected', variables.headers()).then(function (success) {
                    $window.location.reload(true);
                },function (err) {
                    console.log(err);
                }
            );
        }
        $scope.showFriendRequest = function() {
            if(!isShowFriendRequest){
                $('#show-friend-request').show();
                isShowFriendRequest = true;
            }
            else {
                $('#show-friend-request').hide();
                isShowFriendRequest = false;
            }
        }
        $scope.searchUser = function(e) {
            if(e.currentTarget.value.length === 0) {
                $scope.users = [];
            }
            else {
                $('ul li input').css({'background-image' : 'url(img/Gray_circles_rotate.gif)',
                    'background-repeat': 'no-repeat',
                    'background-size': '25px 19px',
                    'background-repeat': 'no-repeat',
                    'background-position': '187px',
                    'background-color' : 'white'});
                requester.getRequest('users/search?searchTerm=' + e.currentTarget.value, variables.headers()).then(
                    function (success) {
                        $scope.users = success;
                        console.log(success)
                        $('ul li input').css('background-image', 'none');

                    },
                    function (err) {
                        console.log(err);
                    }
                )
            }
        }
        $scope.likePost = function(postId) {
            requester.postRequest('Posts/' + postId + '/likes', variables.headers()).then(
                function(data) {
                    $window.location.reload(true);
                },
                function(err) {
                    console.log(err);
                }
            )
        }
        $scope.unlikePost = function(postId) {
            requester.deleteRequest('Posts/' + postId + '/likes', variables.headers()).then(
                function(data) {
                    $window.location.reload(true);
                },
                function(err) {
                    console.log(err);
                }
            )
        }
        $scope.likeComment = function(postId, commentId) {
            requester.postRequest('posts/' + postId + '/comments/' + commentId + '/likes', variables.headers()).then(
                function(data) {
                    $window.location.reload(true);
                },
                function(err) {
                    console.log(err);
                }
            );
        }
        $scope.unlikeComment = function(postId, commentId) {
            requester.deleteRequest('posts/' + postId + '/comments/' + commentId + '/likes', variables.headers()).then(
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

                requester.postRequest('posts/' + id + '/comments', variables.headers(), data).then(
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

            requester.postRequest('Posts', variables.headers(), data).then(
                function(requester){
                    $window.location.reload(true);
                },
                function (error) {
                    console.log(error);

                }
            );
        }
        $scope.nextPage = function() {
            PostId = lastPostId[$scope.thisPageIndex];
            requester.getRequest('users/'+ username + '/wall?StartPostId=' + PostId + '&PageSize=5', variables.headers()).then(
                function (response) {
                    lastPostId.push(response[response.length - 1].id);
                    $scope.thisPageIndex++;
                    $scope.posts = response;
                    console.log(response);
                    console.log(lastPostId);
                }
            )
        }
        $scope.previousPage = function() {
            if($scope.thisPageIndex > 1) {
                lastPostId.splice($scope.thisPageIndex, 1);
                $scope.thisPageIndex--;
                PostId = lastPostId[$scope.thisPageIndex -1];
                requester.getRequest('users/'+ username + '/wall?StartPostId=' + PostId + '&PageSize=5', variables.headers()).then(
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
                requester.getRequest('users/'+ username + '/wall?StartPostId=' + PostId + '&PageSize=5', variables.headers()).then(
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
app.run(function($timeout, $window) {
    if(sessionStorage.entered === 'false') {
        $timeout(function () {
            sessionStorage.clear();
            $window.location.reload(true);

        }, 31535999);
        sessionStorage.entered = true;
    }
});
