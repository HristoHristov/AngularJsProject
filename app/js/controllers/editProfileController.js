app.controller('WSNEdtProfileController', function ($http, $window, $scope, $base64, requester) {
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
    $scope.editProfile = function(){
        console.log('edit')
        var data = {
            "name": $scope.name,
            "email": $scope.email,
            "gender": $scope.gender,
            "profileImageData": $scope.profileImage
        };
        requester.putRequest('me', variables.headers, data).then(
            function(success) {
                $window.location.reload(true);
            },
            function(err) {
                console.log(err);
            }
        )
    }


    requester.getRequest('me', variables.headers).then(
        function (success) {
            $scope.isLogin = true;
            $scope.name = success.name;
            $scope.email = success.email;
            $scope.username = success.username;
            var image = new Image();
            if(success.profileImageData !== null) {
                $scope.profileImage = success.profileImageData;
                $scope.image = success.profileImageData;
                variables.hideLoaderImage();
            } else {
                $scope.image = 'img/images.jpg';
            }
            $scope.gender = success.gender;

        },
        function (err) {
            console.log(err);
        }
    )
})