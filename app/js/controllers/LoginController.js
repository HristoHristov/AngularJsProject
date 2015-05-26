app.controller('WSNLoginController', function($scope, $window, $timeout, requester){
    $scope.title = "Login";
    $scope.username = '';
    $scope.password = '';
    $scope.isDisabled = true;
    var inputDataValue = {};
    function checkingInputData(data, regex, elementId, objectKey) {
        var m = data.match(regex);

        if (m === null || m[0] !== data || m === '') {
            $(elementId).css('border', '2px solid red');
            delete inputDataValue[objectKey];
            $scope.isDisabled = true;

        }
        else {
            $(elementId).css('border', '2px solid #AC1');
            inputDataValue[objectKey] = data;
            console.log(Object.keys(inputDataValue).length)
            if(Object.keys(inputDataValue).length === 2) {
                $scope.isDisabled = false;
            }
        }
    }
    var passwordRegex = /[\S+\s+]{8,100}$/;
    var usernameRegex = /[A-z_\-0-9]{3,35}$/;
    var emailRegex = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;

    console.log('login');
    $scope.headerData = variables.headerData;
    $scope.checkingUsername = function() {
        console.log($scope.username);
        checkingInputData($scope.username, usernameRegex, '#username', 'username')
    }
    $scope.checkingPassword = function() {
        console.log($scope.username);
        checkingInputData($scope.password, passwordRegex, '#password', 'password')
    }
    variables.hideLoaderImage();
    $scope.userLogin = function(){
        var data = {
            "username": $scope.username,
            "password": $scope.password
        }
        requester.postRequest('users/Login', {}, data).then(
            function(response){
                console.log(response)
                sessionStorage['Authorization'] = response.token_type + ' ' + response.access_token;
                sessionStorage['expires_in'] = response.expires_in;
                sessionStorage['userName'] = response.userName;
                sessionStorage['entered'] = false;

                requester.getRequest('me', variables.headers()).then(
                    function(userData) {
                        console.log(userData)
                        sessionStorage['name'] = userData.name;
                        sessionStorage['image'] = userData.profileImageData;
                        sessionStorage['coverImage'] = userData.coverImageData;
                        $window.location.assign('#/');
                        $window.location.reload(true);
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
    }

});
