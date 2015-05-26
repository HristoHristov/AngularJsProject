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

                variables.hideLoaderImage();
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

        },
        function (err) {
            console.log(err);
        }
    )
})