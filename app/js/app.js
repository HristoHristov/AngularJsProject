var app = angular.module("wsn", ['ngRoute', 'base64']);
var variables = {};
variables.headers = function(){
    return {
        "Authorization" : sessionStorage.Authorization
    }
};
variables.headerData = [
    {id: 'home', href: '#/', linkValue: 'Home'},
    {id: 'friend-request', href: '#/Friend-Request', linkValue: 'Friends Request'},
    {id: 'settings', href: '#/Settings', linkValue: 'Settings'},
    {id: 'logout', href: '#/Logout', linkValue: 'Logout'},
    {id: 'change-password', href: '#/Change-Password', linkValue: 'Edit Password'}
];
variables.hideLoaderImage = function() {
    return $('#loader').fadeOut(2000);
};
variables.showLoaderImage = function() {
    return $('#loader').show();
}

variables.passwordRegex = /[\S+\s+]{8,100}$/;
variables.usernameRegex = /[A-z_\-0-9]{3,35}$/;
variables.emailRegex = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
variables.nameRegex = /[A-z ]{4,40}/;

var inputDataValue = {};
variables.showPrompt = function(title, text, type, timer, showCancelButton, confirmButtonText, func) {
    swal({
        title: title,
        text: text,
        type: type,
        timer: timer,
        showCancelButton: false,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: confirmButtonText,
        closeOnConfirm: false
    },
        func
    );
}
variables.checkingInputData = function checkingInputData(data, regex,  objectKey, elementId, inputDataValueCount) {
    var m = data.match(regex);

    if (m === null || m[0] !== data || m === '') {
        $(elementId).css('border', '2px solid red');
        delete inputDataValue[objectKey];
        $('#input-submit').attr('disabled','disabled');

    }
    else {
        $(elementId).css('border', '2px solid #AC1');
        inputDataValue[objectKey] = data;
        console.log(Object.keys(inputDataValue).length)
        if(Object.keys(inputDataValue).length === inputDataValueCount) {
            $('#input-submit').removeAttr('disabled');
        }
    }
}