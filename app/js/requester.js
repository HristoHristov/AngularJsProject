app.factory('requester', function($q, $http){
    var baseUrl = 'http://softuni-social-network.azurewebsites.net/api/';
    function makeRequest(method, url, headers, data){
        var defer = $q.defer();
        $http({
            method: method,
            url: baseUrl + url,
            headers: headers,
            data: data
        }).success(function(data){
            defer.resolve(data);
        }).error(function(error){
            defer.reject(error);
        });
        return defer.promise;
    }
    function getRequest(url, headers){
        return makeRequest('get', url, headers);
    };
    function postRequest(url, headers, data){
        return makeRequest('post', url, headers, data);
    };
    function putRequest(url, headers, data){
        return makeRequest('put', url, headers, data);
    };
    function deleteRequest(url, headers, data){
        return makeRequest('delete', url, headers, data);
    };

    return {
        getRequest: getRequest,
        postRequest: postRequest,
        putRequest: putRequest,
        deleteRequest: deleteRequest
    };
});