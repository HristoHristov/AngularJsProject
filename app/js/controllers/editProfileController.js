app.controller('WSNEdtProfileController', function ($http, $window, $timeout, $rootScope, $controller, $scope, $base64, requester) {
    variables.showLoaderImage();
    $scope.headerData = variables.headerData();
    var isCorrectProfileImageType = true;
    var isCorrectCoverImageType = true;
    $scope.profileImage = null;
    function checkingFileType(fileType) {
        var isCorrectFileType = true;
        var imageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp'];
        if(imageTypes.indexOf(fileType) === -1) {
            isCorrectFileType = false;
        }
        return isCorrectFileType;
    }
    $scope.uploadPicture = function (files) {
        if(checkingFileType(files[0].type)) {
            $scope.getFile = files[0];
            var fileReader = new FileReader();
            fileReader.onload = function(fileLoadedEvent)
            {

                $scope.profileImage = fileLoadedEvent.target.result;
                var image = new Image();
                image.src = $scope.profileImage;
                $('#img img').attr('src', fileLoadedEvent.target.result);
            }
            fileReader.readAsDataURL($scope.getFile);
        }
        else {
            isCorrectProfileImageType = false;
        }
    }
    $scope.uploadCoverImage = function(files) {
        if(checkingFileType(files[0].type)) {
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
        }
        else {
            isCorrectCoverImageType = false;
        }

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
        }
    )
    $scope.editProfile = function(){
        if(isCorrectCoverImageType === false || isCorrectProfileImageType === false) {
            variables.showPrompt("Incorrect Image type", "error");
            $timeout(function() {
                $window.location.reload(true);
            }, 2000)
        }
        else {
            var data = {
                "name": $scope.name,
                "email": $scope.email,
                "gender": $scope.gender,
                "profileImageData": $scope.profileImage,
                "coverImageData": $scope.coverImageData
            };

            requester.putRequest('me', variables.headers(), data).then(
                function(success) {
                    variables.showPrompt("Congratulations....", "Edit Profile successful", "success", 1500);
                    $timeout(function() {
                        $window.location.assign('#/');
                        $window.location.reload(true);
                    }, 2000)
                },
                function(err) {
                    variables.showPrompt("Incorrect Data", "error");
                    $timeout(function() {
                        $window.location.reload(true);
                    }, 2000)
                }
            )
        }
    }
    $scope.margin = variables.checkingResultion();

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
            variables.hideLoaderImage();
            if(sessionStorage.coverImage != 'null' ) {
                var style = '<style>header::before{background-image: url("' + sessionStorage.coverImage + '");}</style>';
                $('header').append(style)
            }
        }
    )
})