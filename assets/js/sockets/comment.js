// Get All Data Pass To Function
const comment = document.getElementById('commentBody');
const btnCreateComment = document.getElementById('btn-create-comment');
const commentCon = document.getElementById('comments-container');
const username = document.getElementById('username').value;
const userimage = document.getElementById('userimage').value;
const usercommentId = document.getElementById('usercommentId').value;

socket.emit('joincommentRoom', userId);

// When User Click Create Comment
btnCreateComment.onclick = () => {
    let commentBody = comment.value;
    socket.emit('createComment', {
        commentBody,
        user: userId,
        pictures: picId,
        username,
        userimage,
        usercommentId
    }, () => {
        comment.value = ''
    })
};

// Lithen Event create New Comment
socket.on('newComment', data => {
    commentCon.innerHTML += `
    <div class="container comments">
            <div class="row ml-3 mt-3 showcom">
                    <img class="d-block rounded-circle border border-dark" src='/${data.userimage}' style="height: 50px; width: 50px;">
                    <a href="/profile/${data.usercommentId}">
                        <h3 class="m-2">${data.username}</h3>
                    </a>
                </div>
                <div class="container">
                        <h4 class="commentBody">
                        ${data.commentBody}
                        </h4>
                </div>
                </div>
    `
})

