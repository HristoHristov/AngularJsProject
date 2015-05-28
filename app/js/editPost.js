app.factory('editPost', function($window, requester){
    function showEditedPost(index) {
        console.log(index);
        $('#' + index).css('display', 'block');
        $('.button' + index).css('display', 'block');
    }
    function hideEditPost(index) {
        console.log(index);
        $('#' + index).css('display', 'none');
        $('.button' + index).css('display', 'none');
    }
    function editPost(postContent, index) {
        console.log(index);
        console.log(postContent);
        var data = {
            'postContent': postContent
        }
        requester.putRequest('Posts/' + index, variables.headers(), data).then(
            function (success) {
                $window.location.reload(true);
            },
            function (err) {
                console.log(err);
            }
        )
    }
    function deletePost(id) {
        requester.deleteRequest('Posts/' + id, variables.headers()).then(
            function (sucess) {
                $window.location.reload(true);
            },
            function (err) {
                console.log(err);
            }
        )
    }
    return {
        showEditPost: showEditedPost,
        hideEditPost: hideEditPost,
        editPost: editPost,
        deletePost: deletePost
    }
})