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
        $scope.image = "img/images.jpg";
        $scope.username = sessionStorage.userName;
        $scope.margin = "115px";
        $scope.isLogin = true;
        $scope.comment= ''

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
        $scope.addComment = function(){
            var data = {
                "postContent": $scope.comment,
                "username": sessionStorage.userName
            };

            requester.postRequest('Posts', headers, data).then(
                function(requester){
                    console.log(requester)
                },
                function (error) {
                    console.log(error);

                }
            );
            console.log(headers);
        }

        console.log('show login page')
    }
});