const likePic = require('../controllers/picture.controller').likePic;

module.exports = io => {
    io.on('connection', socket => {
        // Lithen Event Likes
        socket.on('joinpicRoom', picId => {
            socket.join(picId);
        })
        // Lithen Event Press Like
        socket.on('presslike', data => {
            likePic(data).then(() => {
                io.to(data.picId).emit('likeDone', data);
            }).catch(err => {
                console.log(err);
            })
        socket.on('pressdislike', data => {
            likePic(data).then(() => {
                io.to(data.picId).emit('clearlike', data);
            }).catch(err => {
                console.log(err);
            })
        })
        });
        
    })
}
