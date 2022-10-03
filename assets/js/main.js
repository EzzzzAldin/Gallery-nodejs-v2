const btnComment = document.getElementById('btn-comment');
const comments = document.querySelectorAll('.comments')

btnComment.onclick = () => {
    comments.forEach(comment => {
        comment.classList.remove('hidden')
    });
};