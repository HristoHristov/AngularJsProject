app.factory('editComment', function($window, requester) {
    function showEditComment(commentContent, index, id) {
        $('#' + index).show();
        $('#button' + index).show();
    }
    function hideEditComment(index) {
        $('#' + index).hide();
        $('#button' + index).hide();
    }
    function editComment(postId, commentContent, editedCommentId){
        console.log(postId);
        console.log(editedCommentId);
        console.log(commentContent)
        var data = {
            "commentContent" : commentContent
        }
        requester.putRequest('posts/' + postId + '/comments/' + editedCommentId, variables.headers(), data).then(
            function (success) {
                $window.location.reload(true);
            },
            function (err) {
                console.log(err);
            }
        )
    }
    function deleteComment(postId,commentId) {
        requester.deleteRequest('posts/' + postId + '/comments/' + commentId, variables.headers()).then(
            function (sucess) {
                $window.location.reload(true);
            },
            function (err) {
                console.log(err);
            }
        )
    }
    return {
        showEditComment: showEditComment,
        hideEditComment: hideEditComment,
        editComment: editComment,
        deleteComment: deleteComment
    }

})