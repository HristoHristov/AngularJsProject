app.controller('requests', function($q, $window, $timeout, requester) {
    var isShowFriendRequest = false;
    var users = [];

    this.getInfoForMe = function() {
            var defer = $q.defer()
            requester.getRequest('me', variables.headers()).then(
                function (userData) {
                    sessionStorage['name'] = userData.name;
                    sessionStorage['image'] = userData.profileImageData;
                    sessionStorage['coverImage'] = userData.coverImageData;

                    defer.resolve(userData)
                },
                function (err) {
                    console.log(err);

                }
            )
            return defer.promise;
        }
    this.getMyFriend = function() {
        var defer = $q.defer();
        requester.getRequest('me/friends', variables.headers()).then(
            function (success) {
                defer.resolve(success)
            },
            function (err) {
                console.log(err)
            }
        );
        return defer.promise;
    }
    this.getUserWall = function(username, PostId) {
        var defer = $q.defer();
        requester.getRequest('users/'+ username + '/wall?StartPostId=' + PostId + '&PageSize=5', variables.headers()).then(
            function(response){
                defer.resolve(response);
            },
            function(error){
                console.log(error);
            }
        );
        return defer.promise;
    }
    this.showFriendRequests = function(){
        if(!isShowFriendRequest){
            $('#show-friend-request').show();
            isShowFriendRequest = true;
        }
        else {
            $('#show-friend-request').hide();
            isShowFriendRequest = false;
        }
    }
    this.searchUserByName = function(e) {
        var defer = $q.defer();
        $('ul li input').css({'background-image' : 'url(img/Gray_circles_rotate.gif)',
            'background-repeat': 'no-repeat',
            'background-size': '25px 19px',
            'background-repeat': 'no-repeat',
            'background-position': '187px',
            'background-color' : 'white'});
        requester.getRequest('users/search?searchTerm=' + e.currentTarget.value, variables.headers()).then(
            function (success) {
                users = success;
                defer.resolve(success)
                console.log(success)
                $('ul li input').css('background-image', 'none');

            },
            function (err) {
                console.log(err);
            }
        )
        return defer.promise;
    }
    this.deletePost = function(id) {
        variables.showPrompt('Are you sure you want to delete post?', null, 'warning', null, true, 'Delete',
            function(isConfirm){
                if (isConfirm) {
                    requester.deleteRequest('Posts/' + id, variables.headers()).then(
                        function (success) {
                            variables.showPrompt("Congratulations....", "Post Deleted", "success", 1500);
                            $timeout(function() {
                                $window.location.reload(true);
                            }, 2000)
                        },
                        function (err) {
                            console.log(err);
                        }
                    )
                }
            }
        )

    }
    this.getFriendRequests = function() {
        var defer = $q.defer();
        requester.getRequest('me/requests', variables.headers()).then(function (success) {
                defer.resolve(success)
            },function (err) {
                console.log(err);
            }
        );
        return defer.promise;
    }
    this.approveFriend = function(id) {
        console.log('approve' + id);
        requester.putRequest('me/requests/' + id + '?status=approved', variables.headers()).then(function (success) {
                $window.location.reload(true);
            },function (err) {
                console.log(err);
            }
        );
    }
    this.rejectFriend = function(id) {
        console.log('reject' + id);
        requester.putRequest('me/requests/' + id + '?status=rejected', variables.headers()).then(function (success) {
                $window.location.reload(true);
            },function (err) {
                console.log(err);
            }
        );
    }
    this.likePost = function(postId) {
        requester.postRequest('Posts/' + postId + '/likes', variables.headers()).then(
            function(data) {
                variables.showPrompt("Congratulations....", "Post Liked", "success", 1500);
                $timeout(function() {
                    $window.location.reload(true);
                }, 2000)

            },
            function(err) {
                console.log(err);
            }
        )
    }
    this.unlikePost = function(postId) {
        requester.deleteRequest('Posts/' + postId + '/likes', variables.headers()).then(
            function(data) {
                variables.showPrompt("Congratulations....", "Post Uniked", "success", 1500);
                $timeout(function() {
                    $window.location.reload(true);
                }, 2000)
            },
            function(err) {
                console.log(err);
            }
        )
    }
    this.likeComment = function(postId, commentId) {
        requester.postRequest('posts/' + postId + '/comments/' + commentId + '/likes', variables.headers()).then(
            function(data) {
                variables.showPrompt("Congratulations....", "Comment Liked", "success", 1500);
                $timeout(function() {
                    $window.location.reload(true);
                }, 2000)
            },
            function(err) {
                console.log(err);
            }
        );
    }
    this.unlikeComment = function(postId, commentId) {
        requester.deleteRequest('posts/' + postId + '/comments/' + commentId + '/likes', variables.headers()).then(
            function(data) {
                variables.showPrompt("Congratulations....", "Comment Uniked", "success", 1500);
                $timeout(function() {
                    $window.location.reload(true);
                }, 2000)
            },
            function(err) {
                console.log(err);
            }
        );
    }
    this.addComment = function(id, e) {
        console.log(e.currentTarget.value)

        if(e.keyCode == '13') {
            var data = {
                "commentContent": e.currentTarget.value
            };

            requester.postRequest('posts/' + id + '/comments', variables.headers(), data).then(
                function(success) {
                    variables.showPrompt("Congratulations....", "Comment added", "success", 1500);
                    $timeout(function() {
                        $window.location.reload(true);
                    }, 2000)
                },
                function(err) {
                    console.log(err);
                }
            )
        }
    }
    this.addPost = function(postContent) {
        var data = {
            "postContent": postContent,
            "username": sessionStorage.userName
        };
        console.log('vliza')
        requester.postRequest('Posts', variables.headers(), data).then(
            function(requester){
                variables.showPrompt("Congratulations....", "Post added", "success", 1500);
                $timeout(function() {
                    $window.location.reload(true);
                }, 2000)
            },
            function (error) {
                console.log(error);

            }
        );
    }
    this.getInfoForUser = function(username) {
        var defer = $q.defer();
        requester.getRequest('users/' + username, variables.headers()).then(
            function (success) {
                variables.hideLoaderImage();

                defer.resolve(success);
            },
            function (err) {
                console.log(err);
            }
        );
        return defer.promise;
    }
    this.getUserFriends = function(username) {
        var defer = $q.defer();
        requester.getRequest('users/' + username + '/friends', variables.headers()).then(
            function (friends) {
                console.log(friends);
                defer.resolve(friends);
            },

            function (err) {
                console.log(err);
            }
        );
        return defer.promise;
    }
    this.getNewsFeedPage = function(postId) {
        var defer = $q.defer()
        requester.getRequest('me/feed?StartPostId=' + postId +'&PageSize=5', variables.headers()).then(
            function (success) {
                defer.resolve(success);
            },
            function (err) {
                console.log(err)
            }
        );
        return defer.promise;
    }
});