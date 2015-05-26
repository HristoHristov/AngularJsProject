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
    {id: 'logout', href: '#/Logout', linkValue: 'Logout'}
];
variables.hideLoaderImage = function() {
    return $('#loader').fadeOut(2000);
};
variables.showLoaderImage = function() {
    return $('#loader').show();
}