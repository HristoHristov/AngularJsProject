app.factory('editComment', function($window, $timeout, requester) {
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
        variables.showPrompt('Are you sure you want to delete comment?', null, 'warning', null, true, 'Delete',
            function(isConfirm){
                if (isConfirm) {
                    requester.deleteRequest('posts/' + postId + '/comments/' + commentId, variables.headers()).then(
                        function (sucess) {
                            variables.showPrompt("Congratulations....", "Comment Deleted", "success", 1500);
                            $timeout(function() {
                                $window.location.reload(true);
                            }, 2000)
                        },
                        function (err) {
                            console.log(err);
                        }
                    );
                }
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