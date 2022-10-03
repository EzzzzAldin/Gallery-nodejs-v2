const postComments = require('../controllers/comment.controller').postComments;

module.exports = io => {
    io.on('connection', socket => {
        // Lithen Event Likes
        socket.on('joincommentRoom', userId => {
            socket.join(userId);
        })
        // Lithen Event Press Like
        socket.on('createComment', (data, cl) => {
            postComments(data).then(() => {
                socket.emit('newComment', data);
                cl();
            }).catch(err => {
                console.log(err);
            })
        });
        
    })
}