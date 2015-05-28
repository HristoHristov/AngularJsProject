app.controller('WSNEdtProfileController', function ($http, $window, $rootScope, $controller, $scope, $base64, requester) {
    variables.showLoaderImage();
    $scope.headerData = variables.headerData;
    $scope.profileImage = null;
    $scope.uploadPicture = function (files) {

        $scope.getFile = files[0];
        var fileReader = new FileReader();
        console.log(files[0])
        fileReader.onload = function(fileLoadedEvent)
            {

                $scope.profileImage = fileLoadedEvent.target.result;
                var image = new Image();
                image.src = $scope.profileImage;
                $('#img img').attr('src', fileLoadedEvent.target.result)
                console.log(image);
            }
        fileReader.readAsDataURL($scope.getFile);

    }

    $scope.uploadCoverImage = function(files) {
        console.log(files)
        var file = files[0];
        var fileReader = new FileReader();
        fileReader.onload = function(fileLoadedEvent)
        {

            $scope.coverImageData = fileLoadedEvent.target.result;
            var image = new Image();
            image.src = $scope.coverImageData;
            $('#cover-image img').attr('src', fileLoadedEvent.target.result)
        }
        fileReader.readAsDataURL(file);
        console.log($scope.coverImageData)
    }
    $scope.checkingEmail = function () {
        variables.checkingInputData($scope.email, variables.emailRegex, 'email', '#email', 5);
    }
    $scope.checkingName = function () {
        variables.checkingInputData($scope.name, variables.nameRegex, 'name', '#name', 5);
    }
    $rootScope.location = window.location.href;
    var request = $controller('requests');
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
    request.getFriendRequests().then(
        function (success) {
            $scope.friendsRequests = success;
            $scope.friendsRequestCount = success.length;
            $rootScope.location = window.location.href;
            console.log(success)
        }
    )
    $scope.editProfile = function(){
        var data = {
            "name": $scope.name,
            "email": $scope.email,
            "gender": $scope.gender,
            "profileImageData": $scope.profileImage,
            "coverImageData": $scope.coverImageData
        };

        console.log('edit')
        console.log(data)
        requester.putRequest('me', variables.headers(), data).then(
            function(success) {
                $window.location.reload(true);
            },
            function(err) {
                console.log(err);
            }
        )
    }
    $scope.margin = '6.65%'

    requester.getRequest('me', variables.headers()).then(
        function (success) {
            $scope.isLogin = true;
            $scope.name = success.name;
            $scope.email = success.email;
            $scope.username = success.username;
            var image = new Image();
            if(success.profileImageData !== null) {
                $scope.profileImage = success.profileImageData;
                $scope.image = success.profileImageData;


            } else {
                $scope.image = 'img/images.jpg';
            }
            if(success.coverImageData === null) {
                $scope.coverImage = "img/bigstock-world-map-15989276.jpg";
                $scope.coverImageData = null;
            } else{
                $scope.coverImage = success.coverImageData;
                $scope.coverImageData = success.coverImageData;
            }
            $scope.gender = success.gender;
            console.log(success)
            variables.hideLoaderImage();
        },
        function (err) {
            console.log(err);
        }
    )
})