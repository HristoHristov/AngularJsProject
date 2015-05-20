app.controller('WSNHomePageController', function($scope, $window, requester){
    if(sessionStorage.length == 0){
        $scope.margin = "200px";
        $scope.style = {'width': 'margin'};
        $window.location.assign('#/Login');
    }
    else {
        $scope.image = "img/images.jpg";
        $scope.username = sessionStorage.userName;
        $scope.margin = "200px";
        $scope.isLogin = true;
        $scope.comment= ''


        var headers = {
            "Authorization" : sessionStorage.Authorization
        };
        var username = sessionStorage.userName;
        requester.getRequest('users/'+ username + '/wall?StartPostId&PageSize=5', headers).then(
            function(response){
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