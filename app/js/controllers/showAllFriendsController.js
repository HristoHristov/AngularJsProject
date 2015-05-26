app.controller('WSNGetAllFriendsList', function($scope, $routeParams) {
    console.log('vliza');
    console.log($routeParams.username);
    if(sessionStorage.image === null) {
        $scope.image = "img/images.jpg";
    }
    else {
        $scope.image = sessionStorage.image;
    }
    $scope.isLogin = true;
    $scope.headerData = variables.headerData;
})